import requests
from bs4 import BeautifulSoup
import time
import random
import re

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                  "AppleWebKit/537.36 (KHTML, like Gecko) "
                  "Chrome/114.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "Referer": "https://www.google.com/",
    "Connection": "keep-alive",
    "DNT": "1",
}

def fetch_job_html(link):
    """Fetches the HTML content of a single job page."""
    try:
        response = requests.get(link, headers=HEADERS, timeout=10)
        if response.status_code == 200:
            return response.text
        print(f"❌ Failed to fetch {response.status_code} for: {link}")
    except Exception as e:
        print(f"❌ Exception for {link}: {e}")
    return None

def extract_job_details(html_content, url):
    """Extracts key job details from HTML content."""
    soup = BeautifulSoup(html_content, "html.parser")
    job_details = {
        "job_title": None,
        "company_name": None,
        "location": None,
        "job_id": None,
        "description": None,
        "url": url
    }

    # Extract Job Title
    title_tag = soup.find('h1', class_='topcard__title')
    if title_tag:
        job_details["job_title"] = title_tag.text.strip()

    # Extract Company Name
    company_tag = soup.find('a', class_='topcard__org-name-link')
    if company_tag:
        job_details["company_name"] = company_tag.text.strip()

    # Extract Location
    location_tag = soup.find('span', class_='topcard__flavor--bullet')
    if location_tag:
        job_details["location"] = location_tag.text.strip()

    # Extract Job ID from URL
    match = re.search(r'jobs/view/(\d+)', url)
    if match:
        job_details["job_id"] = match.group(1)

    # Extract Description
    description_container = soup.find('div', class_='description__text')
    if description_container:
        job_details["description"] = description_container.get_text(separator="\n", strip=True)

    return job_details

def extract_all_job_details(job_links):
    """Fetches and extracts details for all job links."""
    all_jobs_data = []
    for i, job_obj in enumerate(job_links, 1):
        link = job_obj.get("link")
        if not link:
            continue

        print(f"🔎 Fetching and extracting job {i}/{len(job_links)}: {link}")
        html = fetch_job_html(link)
        if html:
            job_details = extract_job_details(html, link)
            all_jobs_data.append(job_details)

        time.sleep(random.uniform(2, 5))  # Avoid detection

    return all_jobs_data
