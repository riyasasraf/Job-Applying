import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from LinkedIn.linkedin import extract_all_job_details

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route('/receive_jobs', methods=['POST'])
def receive_jobs():
    data = request.get_json()

    # Handle case where frontend sends {"extractedJobs": "[{...}, {...}]"}
    if isinstance(data, dict) and "extractedJobs" in data:
        try:
            job_links = json.loads(data["extractedJobs"])
        except json.JSONDecodeError:
            return jsonify({"error": "Invalid JSON in extractedJobs"}), 400
    elif isinstance(data, list):
        job_links = data
    else:
        return jsonify({"error": "Expected a JSON list or extractedJobs string"}), 400

    # Validate
    if not all(isinstance(job, dict) for job in job_links):
        return jsonify({"error": "Each job must be an object"}), 400

    scraped_jobs = extract_all_job_details(job_links)

    return jsonify({
        "message": f"Extracted details for {len(scraped_jobs)} jobs",
        "jobs": scraped_jobs
    }), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
