class Job:
    def __init__(self, job_id, job_title, company_name, location, description, url, logo, date_posted=None):
        self.job_id = job_id
        self.job_title = job_title
        self.company_name = company_name
        self.location = location
        self.description = description
        self.url = url
        self.logo = logo
        self.date_posted = date_posted

    def to_tuple(self):
        return (
            self.job_id,
            self.job_title,
            self.company_name,
            self.location,
            self.description,
            self.url,
            self.logo,
            self.date_posted
        )
