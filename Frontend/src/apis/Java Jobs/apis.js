import javaJobservice from "./javaJobservice";

// Function to send job data to API
export const getJobData = async () => {
  try {
    const response = await javaJobservice.get("/api/v1/jobs");

    return response.data;
  } catch (error) {
    console.error("Error sending job data:", error);
    throw error;
  }
};
