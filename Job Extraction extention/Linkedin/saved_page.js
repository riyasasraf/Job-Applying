async function extractSavedJobs(maxJobs = 20) {
  const jobs = [];

  function getJobCardsFromCurrentPage() {
    const jobCards = document.querySelectorAll(
      "div[data-chameleon-result-urn]"
    );
    const extracted = [];

    jobCards.forEach((card) => {
      const urn = card.getAttribute("data-chameleon-result-urn");
      const jobId = urn?.split(":").pop() || null;

      const titleElement = card.querySelector("a");
      const link = titleElement?.href || null;

      // const companyElement = card.querySelector(".t-14.t-black.t-normal");
      // const company = companyElement?.textContent.trim() || null;

      // const locationElement = card.querySelector(
      //   ".t-14.t-normal + .t-14.t-normal"
      // );
      // const location = locationElement?.textContent.trim() || null;

      if (link) {
        extracted.push({
          jobId,
          link,
          // company,
          // location,
        });
      }
    });

    return extracted;
  }

  async function waitForNextPageLoad(previousJobCount, timeout = 5000) {
    return new Promise((resolve) => {
      const interval = 100;
      const start = Date.now();

      const check = () => {
        const currentCount = document.querySelectorAll(
          "div[data-chameleon-result-urn]"
        ).length;
        if (currentCount !== previousJobCount || Date.now() - start > timeout) {
          resolve();
        } else {
          setTimeout(check, interval);
        }
      };
      check();
    });
  }

  while (jobs.length < maxJobs) {
    const newJobs = getJobCardsFromCurrentPage();

    for (const job of newJobs) {
      if (jobs.length >= maxJobs) break;
      if (!jobs.some((j) => j.jobId === job.jobId)) {
        jobs.push(job);
      }
    }

    const nextButton = document.querySelector(
      "button.artdeco-pagination__button--next:not([disabled])"
    );

    if (!nextButton || nextButton.disabled) {
      console.log("🚫 No more pages.");
      break;
    }

    const currentCount = document.querySelectorAll(
      "div[data-chameleon-result-urn]"
    ).length;
    nextButton.click();
    await waitForNextPageLoad(currentCount);
  }

  console.log("✅ Extracted jobs:", jobs);
  return jobs;
}
