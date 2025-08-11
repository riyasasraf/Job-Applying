
import { CancelOutlined, CheckCircleOutline } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { users } from './Listdata';

const ContactCardGrid = () => {
  return users.map((user) => (
    <Card
      key={user.id}
      sx={{
        borderRadius: "0.5rem", // Tailwind's rounded-lg
        boxShadow:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)", // Tailwind's shadow-md
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "1rem", // Tailwind's p-4
        minWidth: "280px", // Minimum width for cards
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: "1rem",
          }}
        >
          <Box sx={{ textAlign: "left" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "semibold", color: "#1F2937" }}
            >
              {user.company}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                display: "inline-block",
                backgroundColor: "#D1FAE5", // Tailwind's bg-green-100
                color: "#047857", // Tailwind's text-green-700
                px: 1.5,
                py: 0.5,
                borderRadius: "9999px", // Tailwind's rounded-full
                mt: 0.5,
                fontSize: "0.75rem", // Tailwind's text-xs
              }}
            >
              {user.company}
            </Typography>
          </Box>
          <Avatar
            alt={`${user.title}'s avatar`}
            src={user.logo}
            sx={{
              width: 48,
              height: 48,
              borderRadius: "9999px",
              objectFit: "cover",
            }}
          />
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            color: "#4B5563",
            fontSize: "0.875rem",
            marginBottom: "1rem",
          }}
        >
          {user.title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
            marginTop: "auto",
          }}
        >
          <Button
            variant="contained"
            startIcon={<CheckCircleOutline />}
            sx={{
              backgroundColor: "#D1FAE5", // Tailwind's bg-green-100
              color: "#065F46", // Tailwind's text-green-700
              "&:hover": {
                backgroundColor: "#A7F3D0", // hover:bg-green-200
              },
              borderRadius: "0.5rem", // rounded-lg
              textTransform: "none",
              paddingX: "1rem",
              paddingY: "0.5rem",
              boxShadow: "none",
            }}
          >
            Accept
          </Button>

          <Button
            variant="contained"
            startIcon={<CancelOutlined />}
            sx={{
              backgroundColor: "#FECACA", // Tailwind's bg-red-200
              color: "#991B1B", // Tailwind's text-red-800
              "&:hover": {
                backgroundColor: "#FCA5A5", // hover:bg-red-300
              },
              borderRadius: "0.5rem",
              textTransform: "none",
              paddingX: "1rem",
              paddingY: "0.5rem",
              boxShadow: "none",
            }}
          >
            Reject
          </Button>
        </Box>
      </CardContent>
    </Card>
  ));
}

export default ContactCardGrid