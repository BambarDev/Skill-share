import React from "react";
import { Box, Typography, Button } from "@mui/material";

const Banner = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#FFC017",
        borderBottom: 1,
        borderColor: "black",
      }}
    >
      <Box
        sx={{
          width: "95%",
          "@media (min-width: 600px)": {
            width: "90%",
          },
          margin: "auto",
          py: "80px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "16px",
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: "48px",
              sm: "64px",
              md: "96px",
            },
            fontWeight: "normal",
            fontFamily:
              'gt-super, Georgia, Cambria, "Times New Roman", Times, serif',
          }}
        >
          Stay curious.
        </Typography>
        <Typography
          sx={{
            width: "100%",
            fontSize: {
              xs: "20.8px",
              md: "24px",
            },
            fontWeight: "medium",
            lineHeight: "28px",
            "@media (min-width:600px)": {
              width: "496px",
            },
          }}
        >
          Discover stories, thinking, and expertise from writers on any topic.
        </Typography>
        <Button
          sx={{
            px: "12px",
            p: "8px",
            fontSize: "14px",
            fontWeight: "medium",
            backgroundColor: "#232427",
            color: "white",
            fontFamily: "sans-serif",
            textTransform: "capitalize",
            borderRadius: "100px",
            "&:hover": {
              backgroundColor: "black",
            },
          }}
        >
          Start Reading
        </Button>
      </Box>
    </Box>
  );
};

export default Banner;
