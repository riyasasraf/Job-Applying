(async function () {
  try {
    if (location.hostname.includes("linkedin.com")) {
      const scraperModule = await import(
        chrome.runtime.getURL("Linkedin/saved_page.js")
      );
      const jobs = await scraperModule.extractSavedJobs();
      console.log("✅ Extracted jobs:", jobs);
      return jobs;
    } else {
      console.warn("No matching scraper for this site.");
      return [];
    }
  } catch (err) {
    console.error("❌ Error in content.js:", err);
    return [];
  }
})();
