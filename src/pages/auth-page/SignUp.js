import React from "react";
import { Box, Typography, Button, Link } from "@mui/material";
import CustomTextField from "../../components/textField";

const SignUp = ({ setSignReq }) => {
  return (
    <>
      <Box
        sx={{
          mt: "96px",
          textAlign: "center",
          mx: "auto",
          width: "95%",
          "@media (min-width: 768px)": {
            width: "90%",
          },
        }}
      >
        <Typography sx={{ fontSize: "30px" }}>Sign up with email</Typography>
        <Typography
          sx={{
            width: "100%",
            mx: "auto",
            py: "48px",
            "@media (min-width:600px)": {
              width: "400px",
            },
          }}
        >
          Enter the email address associated with your account, and we’ll send a
          magic link to your inbox.
        </Typography>
        <CustomTextField title="Username" />
        <CustomTextField title="Email" />
        <CustomTextField title="Password" />
        <CustomTextField title="Confirm password" />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#16a34a",
            color: "white",
            fontFamily: "sans-serif",
            textTransform: "capitalize",
            borderRadius: "100px",
            mt: "20px",
            "&:hover": {
              backgroundColor: "#22c55e",
            },
            fontWeight: "bold",
          }}
        >
          Sign Up
        </Button>
      </Box>
      <Link
        underline="none"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#34d399",
          "&:hover": {
            color: "#22c55e",
          },
          fontWeight: "bold",
          ml: "4px",
          cursor: "pointer",
        }}
        onClick={() => setSignReq("")}
      >
        All sign up options
      </Link>
    </>
  );
};

export default SignUp;
