import json
from LinkedIn.linkedin import extract_all_job_details
from entities.job_entity import Job
from Repository.job_repository import JobRepository

class JobService:
    def __init__(self):
        self.repo = JobRepository()
        self.repo.init_db()

    def process_jobs(self, raw_data):
        # Parse incoming JSON
        if isinstance(raw_data, dict) and "extractedJobs" in raw_data:
            try:
                job_links = json.loads(raw_data["extractedJobs"])
            except json.JSONDecodeError:
                raise ValueError("Invalid JSON in extractedJobs")
        elif isinstance(raw_data, list):
            job_links = raw_data
        else:
            raise ValueError("Expected a JSON list or extractedJobs string")

        if not all(isinstance(job, dict) for job in job_links):
            raise ValueError("Each job must be an object")

        # Scrape details
        scraped_jobs = extract_all_job_details(job_links)

        # Convert to Job entities
        job_entities = [
            Job(
                job.get("job_id"),
                job.get("job_title"),
                job.get("company_name"),
                job.get("location"),
                job.get("description"),
                job.get("url"),
                job.get("logo"),
                job.get("date_posted")
            )
            for job in scraped_jobs
        ]

        # Save to DB
        self.repo.save_jobs(job_entities)

        return scraped_jobs
