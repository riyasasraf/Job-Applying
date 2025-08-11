import psycopg2
from config import Config

class JobRepository:
    def __init__(self):
        self.conn = psycopg2.connect(
            host=Config.DB_HOST,
            port=Config.DB_PORT,
            dbname=Config.DB_NAME,
            user=Config.DB_USER,
            password=Config.DB_PASS
        )

    def init_db(self):
        with self.conn.cursor() as cur:
            cur.execute("""
                CREATE TABLE IF NOT EXISTS jobs (
                    id SERIAL PRIMARY KEY,
                    job_id TEXT UNIQUE,
                    job_title TEXT,
                    company_name TEXT,
                    location TEXT,
                    description TEXT,
                    url TEXT,
                    logo TEXT,
                    date_posted TIMESTAMP NULL
                )
            """)
            self.conn.commit()

    def save_jobs(self, jobs):
        with self.conn.cursor() as cur:
            for job in jobs:
                cur.execute("""
                    INSERT INTO jobs (job_id, job_title, company_name, location, description, url, logo, date_posted)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                    ON CONFLICT (job_id) DO UPDATE SET
                        job_title = EXCLUDED.job_title,
                        company_name = EXCLUDED.company_name,
                        location = EXCLUDED.location,
                        description = EXCLUDED.description,
                        url = EXCLUDED.url,
                        logo = EXCLUDED.logo,
                        date_posted = EXCLUDED.date_posted
                """, job.to_tuple())
            self.conn.commit()
