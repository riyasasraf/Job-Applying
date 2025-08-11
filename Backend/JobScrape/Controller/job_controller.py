from flask import Blueprint, request, jsonify
from Services.job_service import JobService

job_blueprint = Blueprint("jobs", __name__)
job_service = JobService()

@job_blueprint.route('/receive_jobs', methods=['POST'])
def receive_jobs():
    try:
        raw_data = request.get_json()
        scraped_jobs = job_service.process_jobs(raw_data)
        return jsonify({
            "message": f"Extracted and saved details for {len(scraped_jobs)} jobs",
            "jobs": scraped_jobs
        }), 200
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500
