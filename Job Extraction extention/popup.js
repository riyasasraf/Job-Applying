document.addEventListener("DOMContentLoaded", () => {
  const extractButton = document.getElementById("extractButton");
  const jobDetailsOutput = document.getElementById("jobDetailsOutput");
  const statusDiv = document.getElementById("status");
  const copyButton = document.getElementById("copyButton");

  extractButton.addEventListener("click", async () => {
    statusDiv.textContent = "Extracting...";
    jobDetailsOutput.value = "";
    copyButton.classList.add("hidden");

    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (!tab || !tab.url.includes("linkedin.com")) {
        statusDiv.textContent = "Please navigate to a LinkedIn jobs page.";
        return;
      }

      let scriptToInject;
      let functionToCall;

      if (tab.url.includes("linkedin.com/my-items/saved-jobs")) {
        scriptToInject = "Linkedin/saved_page.js";
        functionToCall = () => window.extractSavedJobs();
      } else if (tab.url.includes("linkedin.com/jobs/search")) {
        scriptToInject = "Linkedin/jobs_page.js";
        functionToCall = () => window.extractJobsFromSearchPage();
      } else {
        statusDiv.textContent = "No matching scraper for this page type.";
        return;
      }

      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: [scriptToInject],
      });

      const scrapeResults = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: functionToCall,
      });

      const jobData = scrapeResults[0].result;

      if (Array.isArray(jobData) && jobData.length > 0) {
        jobDetailsOutput.value = JSON.stringify(jobData, null, 2);
        statusDiv.textContent = `Extracted ${jobData.length} jobs! Attempting to send...`;
        copyButton.classList.remove("hidden");

        // Send the extracted jobs to the Python service
        const response = await fetch("http://127.0.0.1:5000/receive_jobs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ jobs: jobData }),
        });

        if (response.ok) {
          statusDiv.textContent = `✅ Extracted and sent ${jobData.length} jobs to the service!`;
        } else {
          statusDiv.textContent = `⚠️ Extracted ${jobData.length} jobs, but failed to send. Server responded with: ${response.status}`;
        }
      } else {
        statusDiv.textContent = "No jobs found on this page.";
      }
    } catch (error) {
      console.error("❌ Error during extraction or sending data:", error);
      statusDiv.textContent = `❌ Error: ${error.message}`;
    }
  });

  copyButton.addEventListener("click", () => {
    jobDetailsOutput.select();
    document.execCommand("copy");
    statusDiv.textContent = "Copied to clipboard!";
    setTimeout(() => {
      statusDiv.textContent = "Details extracted!";
    }, 2000);
  });
});
