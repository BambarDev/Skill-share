import React from "react";
import { Box, Typography, Button, Link } from "@mui/material";
import { category, categoryActions } from "../../constants";
import { useNavigate } from "react-router-dom";

const Discover = () => {
  const navigate = useNavigate();
  return (
    <Box position="sticky" sx={{ top: "96px" }}>
      <Box sx={{ pb: "28px", borderBottom: 1, borderColor: "grey.400" }}>
        <Typography sx={{ fontWeight: "semibold" }}>
          Discover more of what matters to you
        </Typography>
        <Typography
          sx={{
            my: "23px",
            gap: "12px",
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {category.map((item, i) => (
            <Button
              onClick={() => navigate(`/filter/${item.toLowerCase()}`)}
              sx={{
                backgroundColor: "grey.200",
                py: "8px",
                px: "12px",
                fontSize: "14px",
                borderRadius: "100px",
                fontFamily: "sans-serif",
                textTransform: "capitalize",
                color: "black",
              }}
              key={i}
            >
              {item}
            </Button>
          ))}
        </Typography>
        <Link
          underline="none"
          sx={{
            fontFamily: "sans-serif",
            color: "#16a34a",
            cursor: "pointer",
            fontSize: "14px",
            py: "12px",
            "&:hover": {
              color: "#232427",
            },
          }}
          onClick={() => {}}
        >
          See more topics
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          lineHeight: "12px",
          pt: "32px",
        }}
      >
        {categoryActions.map((item, i) => (
          <Link
            key={i}
            underline="none"
            sx={{
              fontFamily: "sans-serif",
              color: "#232427",
              cursor: "pointer",
              fontSize: "16px",
              py: "12px",
              "&:hover": {
                color: "#232427",
              },
            }}
            onClick={() => {}}
          >
            {item}
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default Discover;
