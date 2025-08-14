import { CancelOutlined, CheckCircleOutline } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const ContactCardGrid = ({ jobdata }) => {
  // Handle the case where jobdata might be the full response object or just the jobs array
  console.log(jobdata + "from contact grid");
  const jobs = Array.isArray(jobdata) ? jobdata : jobdata?.jobs || [];
  console.log(jobs + "jobs ")
  if (!jobs || jobs.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "2rem", color: "#6B7280" }}>
        <Typography variant="h6">No jobs available</Typography>
      </div>
    );
  }

  return jobs.map((job, index) => (
    <Card
      key={job.jobId || `job-${index}`} // Fixed: use jobId instead of id
      sx={{
        borderRadius: "0.5rem",
        boxShadow:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "1rem",
        minWidth: "280px",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        },
      }}
    >
      <CardContent
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Header with company info */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: "1rem",
          }}
        >
          <Box sx={{ textAlign: "left", flex: 1 }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: "semibold",
                color: "#1F2937",
                textAlign: "center",
              }}
            >
              {job.companyName}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                display: "inline-block",
                backgroundColor: "#D1FAE5",
                color: "#047857",
                px: 1.5,
                py: 0.5,
                borderRadius: "9999px",
                mt: 0.5,
                fontSize: "0.75rem",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {job.location}
            </Typography>
          </Box>
          <Avatar
            alt={`${job.jobTitle} avatar`}
            src={job.logo || undefined} // Handle missing logo
            sx={{
              width: 48,
              height: 48,
              borderRadius: "9999px",
              objectFit: "cover",
              backgroundColor: job.logo ? "transparent" : "#6366F1",
            }}
          >
            {!job.logo && job.companyName ? job.companyName.charAt(0) : "J"}
          </Avatar>
        </Box>

        {/* Job Title */}
        <Typography
          variant="h6"
          sx={{
            color: "#1F2937",
            fontSize: "1.1rem",
            fontWeight: "600",
            marginBottom: "0.5rem",
            textAlign: "center",
          }}
        >
          {job.jobTitle}
        </Typography>

        {/* Job ID */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            color: "#6B7280",
            fontSize: "0.875rem",
            marginBottom: "1rem",
            fontFamily: "monospace",
          }}
        >
          ID: {job.jobId}
        </Typography>

        {/* Description Preview */}
        <Typography
          variant="body2"
          sx={{
            color: "#4B5563",
            fontSize: "0.8rem",
            marginBottom: "1rem",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textAlign: "left",
            width: "100%",
          }}
        >
          {job.description}
        </Typography>

        {/* Action Buttons */}
        {/* <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
            marginTop: "auto",
            gap: "0.5rem",
          }}
        >
          <Button
            variant="contained"
            startIcon={<CheckCircleOutline />}
            sx={{
              backgroundColor: "#D1FAE5",
              color: "#065F46",
              "&:hover": {
                backgroundColor: "#A7F3D0",
              },
              borderRadius: "0.5rem",
              textTransform: "none",
              paddingX: "1rem",
              paddingY: "0.5rem",
              boxShadow: "none",
              flex: 1,
            }}
          >
            Accept
          </Button>
          <Button
            variant="contained"
            startIcon={<CancelOutlined />}
            sx={{
              backgroundColor: "#FECACA",
              color: "#991B1B",
              "&:hover": {
                backgroundColor: "#FCA5A5",
              },
              borderRadius: "0.5rem",
              textTransform: "none",
              paddingX: "1rem",
              paddingY: "0.5rem",
              boxShadow: "none",
              flex: 1,
            }}
          >
            Reject
          </Button>
        </Box> */}

        {/* View Job Link */}
        <Button
          variant="outlined"
          href={job.jobLink}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            marginTop: "0.75rem",
            width: "100%",
            color: "#0077B5",
            borderColor: "#0077B5",
            "&:hover": {
              backgroundColor: "#EFF6FF",
              borderColor: "#0077B5",
            },
            textTransform: "none",
            fontSize: "0.875rem",
          }}
        >
          View on LinkedIn
        </Button>
      </CardContent>
    </Card>
  ));
};

export default ContactCardGrid;
