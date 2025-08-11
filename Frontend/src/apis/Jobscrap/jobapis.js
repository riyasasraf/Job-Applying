import pythonInstance from "./PythonInstance";

// Function to send job data to API
export const sendJobData = async (jobData) => {
  try {
    const response = await pythonInstance.post("/receive_jobs", jobData );

    return response.data;
  } catch (error) {
    console.error("Error sending job data:", error);
    throw error;
  }
};

