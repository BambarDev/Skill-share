import React from "react";
import Banner from "./Banner";
import Trending from "./Trending";
import Posts from "../common/posts/Posts";
import Discover from "./Discover";
import { Box } from "@mui/material";

const DemoPage = () => {
  return (
    <>
      <Banner />
      <Trending />
      <Box
        sx={{
          width: "95%",
          "@media (min-width: 600px)": {
            width: "90%",
          },
          margin: "auto",
          py: "28px",
          display: "flex",
          flexDirection: {
            xs: "column-reverse",
            md: "row",
          },
          gap: "28px",
          "@media (min-width:600px)": {
            flexDirection: "row",
          },
        }}
      >
        <Box sx={{ flex: 1.5 }}>
          <Posts />
        </Box>
        <Box sx={{ flex: 1, position: "relative" }}>
          <Discover />
        </Box>
      </Box>
    </>
  );
};

export default DemoPage;
