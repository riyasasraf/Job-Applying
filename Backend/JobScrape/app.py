from flask import Flask
from flask_cors import CORS
from Controller.job_controller import job_blueprint

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

app.register_blueprint(job_blueprint)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
