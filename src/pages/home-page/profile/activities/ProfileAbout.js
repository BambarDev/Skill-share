import { Box, Typography } from "@mui/material";
import React from "react";

const ProfileAbout = ({ getUserData }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        sx={{
          fontSize: "24px",
          "&::first-letter": {
            textTransform: "uppercase",
          },
        }}
      >
        {getUserData?.bio || getUserData?.username + " has no bio"}
      </Typography>
    </Box>
  );
};

export default ProfileAbout;
