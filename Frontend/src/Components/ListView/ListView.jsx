import { Description } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import ContactCardGrid from "./ContactCardGrid";
import { useEffect, useState } from "react";
import { getJobData } from "../../apis/Java Jobs/apis";

export const ListView = ({ reloadTrigger }) => {
  // Extract jobs array from the response object

  const [loading, setLoading] = useState(false);
  const [jobData, setJobData] = useState([]);

  const loadDatafromDataBase = async () => {
    try {
      setLoading(true);
      // Send data to API
      const apiResponse = await getJobData();
      // Update state
      setJobData(apiResponse);
      // Success feedback
      alert(`Successfully got ${apiResponse.length} jobs!`);
    } catch (error) {
      console.error("Failed to send job data:", error);
      alert("Failed to send job data to API. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadDatafromDataBase();
  }, [reloadTrigger]);
  const message = jobData?.message || "";
  console.log("ListView - Full jobdata:", jobData);

  const [formData, setFormData] = useState(null);
  const LOCAL_STORAGE_KEY = "profile-form-data";

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedData) {
        setFormData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error("Failed to parse data from local storage:", error);
    }
  }, []); // The empty dependency array ensures this runs only once when the component mounts.

  const handleGenerateResume = () => {
    // Now you have access to the formData object from the component's state
    if (formData) {
      console.log("Generate Resume clicked");
      console.log("Current Form Data from local storage:", formData);
      alert("Generating resume based on selected jobs...");
    } else {
      console.log("No form data found in local storage.");
      alert("Please fill out the form first.");
    }
  };  

  if (!jobData) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 flex justify-center items-center font-inter">
        {loading ? (
          <div className="text-center text-gray-500 py-8">
            <Typography variant="h6" className="mb-4">
              Loading.....
            </Typography>
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            <Typography variant="h6" className="mb-4">
              No job data available
            </Typography>
            <Typography variant="body2">
              Click the search icon in the navbar to paste JSON data.
            </Typography>
          </div>
        )}
      </div>
    );
  }

  if (jobData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 flex justify-center items-center font-inter">
        <div className="text-center text-gray-500 py-8">
          <Typography variant="h6">No jobs found</Typography>
          {message && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              {message}
            </Typography>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-inter flex flex-col">
      {/* Main content area */}
      <div className="w-full flex-1">
        {/* Header with job count and message */}
        <Box sx={{ mb: 3, textAlign: "center" }}>
          <Typography variant="h4" className="mb-2" sx={{ fontWeight: "bold" }}>
            Job Listings
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {message ||
              `Found ${jobData.length} job${jobData.length !== 1 ? "s" : ""}`}
          </Typography>
        </Box>

        {/* Grid container */}
        <Box
          sx={{
            display: "grid",
            gap: "1.5rem",
            gridTemplateColumns: {
              xs: "repeat(1, minmax(0, 1fr))",
              sm: "repeat(2, minmax(0, 1fr))",
              md: "repeat(3, minmax(0, 1fr))",
              lg: "repeat(4, minmax(0, 1fr))",
              xl: "repeat(5, minmax(0, 1fr))",
            },
            padding: "1rem",
            maxHeight: "75vh", // Reduced to make room for button
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f1f1f1",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#888",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#555",
            },
          }}
        >
          {/* Pass the jobs array to ContactCardGrid */}
          <ContactCardGrid jobdata={jobData} />
        </Box>
      </div>

      <Button
        variant="contained"
        startIcon={<Description />}
        onClick={handleGenerateResume}
        sx={{
          backgroundColor: "#6366F1",
          "&:hover": {
            backgroundColor: "#4F46E5",
          },
          borderRadius: "0.5rem",
          textTransform: "none",
          paddingX: "1.5rem",
          paddingY: "0.75rem",
          fontSize: "0.875rem",
          fontWeight: "600",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          // eslint-disable-next-line no-dupe-keys
          "&:hover": {
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            transform: "translateY(-1px)",
          },
          position: "fixed",
          bottom: "35px",
          right: "50px",
          transition: "all 0.2s ease-in-out",
        }}
      >
        Generate Resume
      </Button>
    </div>
  );
};

export default ListView;
