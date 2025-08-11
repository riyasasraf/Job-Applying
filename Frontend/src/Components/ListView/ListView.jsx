import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Box,
  List,
} from "@mui/material";
import { MailOutline, Phone } from "@mui/icons-material"; // Lucide React icons are not directly available for Material-UI, using Material Icons
import ContactCardGrid from "./ContactCardGrid";



export const ListView = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center items-center font-inter">
      <div className="w-full ">
        <Box
          sx={{
            display: "grid",
            gap: "1.5rem", // Tailwind's gap-4
            gridTemplateColumns: {
              xs: "repeat(1, minmax(0, 1fr))", // 1 column on extra small screens
              sm: "repeat(2, minmax(0, 1fr))", // 2 columns on small screens
              md: "repeat(3, minmax(0, 1fr))", // 3 columns on medium screens
              lg: "repeat(4, minmax(0, 1fr))", // 3 columns on medium screens
              xl: "repeat(5, minmax(0, 1fr))", // 3 columns on medium screens
            },
            padding: "1rem", // Tailwind's p-4
            
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
          <ContactCardGrid />
        </Box>
      </div>
    </div>
  );
};

export default ListView;
