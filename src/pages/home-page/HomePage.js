import { Box, Typography } from "@mui/material";
import React from "react";
import Follow from "./userToFollow/Follow";
import Posts from "../common/posts/Posts";

const HomePage = () => {
  return (
    <Box
      sx={{
        width: "95%",
        "@media (min-width: 600px)": {
          width: "90%",
        },
        margin: "auto",
        display: "flex",
        gap: "80px",
        position: "relative",
      }}
    >
      <Box sx={{ flex: 2, py: "40px", px: "40px", mb: "64px" }}>
        <Posts />
      </Box>
      <Box
        sx={{
          display: {
            xs: "none",
            md: "inline-block",
          },
          width: {
            md: "336px",
          },
          p: "28px",
          borderLeft: "1px solid",
          borderColor: "grey.300",
        }}
      >
        <Typography>Who to follow?</Typography>
        <Follow />
      </Box>
    </Box>
  );
};

export default HomePage;
