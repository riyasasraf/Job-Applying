import pythonInstance from "./axiosInstance";

export const getJobdetails = async (preferences) => {
  try {
   const response = await pythonInstance.post(
     "http://127.0.0.1:5000/receive_jobs",
     preferences,
     {
       headers: {
         "Content-Type": "application/json",
       },
     }
   );
    return response.data;
  } catch (error) {
    console.error("Error searching jobs:", error);
    throw error;
  }
};
