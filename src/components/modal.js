import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  IconButton,
  Link,
} from "@mui/material";
import { CloseOutlined, Google, Facebook, Email } from "@mui/icons-material";
import SignIn from "../pages/auth-page/SignIn";
import SignUp from "../pages/auth-page/SignUp";

const CustomModal = ({ buttonTitle, onOpen, click, onClose }) => {
  const [createUser, setCreateUser] = useState(false);
  const [signReq, setSignReq] = useState("");

  return (
    <div>
      <Button
        sx={{
          color: "black",
          fontFamily: "sans-serif",
          textTransform: "capitalize",
          fontSize: "15px",
        }}
        onClick={onOpen}
      >
        {buttonTitle}
      </Button>
      <Modal
        open={click}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "fixed",
            zIndex: 50,
            overflow: "auto",
            backgroundColor: "white",
            "@media (min-width: 600px)": {
              left: "20%",
              right: "20%",
              top: "10%",
              bottom: "10%",
            },
            boxShadow: "0px 0px 3px 0.3px rgba(182, 182, 182, 0.5)",
          }}
        >
          <IconButton
            aria-label="close"
            sx={{
              color: "black",
              position: "absolute",
              top: 8,
              right: 8,
              fontSize: "24px",
              "&:hover": {
                opacity: 0.5,
              },
            }}
            onClick={onClose}
          >
            <CloseOutlined />
          </IconButton>
          <Typography
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "48px",
            }}
          >
            {signReq === "" ? (
              <>
                <Box sx={{ fontSize: "24px", pt: "80px" }}>
                  {createUser ? "Join Medium" : "Welcome Back"}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    width: "fit-content",
                    mx: "auto",
                  }}
                >
                  <Button
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      gap: "10px",
                      width: "auto",
                      "@media (min-width: 600px)": {
                        width: "320px",
                      },
                      border: "1px solid black",
                      borderRadius: "100px",
                      textTransform: "capitalize",
                      color: "black",
                      px: 3,
                      py: 2,
                    }}
                    // onClick={() =>
                    //   setSignReq(createUser ? "sign-up" : "sign-in")
                    // }
                    variant="outlined"
                    startIcon={<Google sx={{ color: "#34A853" }} />}
                  >
                    {`${createUser ? "Sign up" : "Sign in"} with Google`}
                  </Button>
                  <Button
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      gap: "10px",
                      width: "auto",
                      "@media (min-width: 600px)": {
                        width: "320px",
                      },
                      border: "1px solid black",
                      color: "black",
                      borderRadius: "100px",
                      px: 3,
                      py: 2,
                      textTransform: "capitalize",
                    }}
                    // onClick={() =>
                    //   setSignReq(createUser ? "sign-up" : "sign-in")
                    // }
                    variant="outlined"
                    startIcon={<Facebook sx={{ color: "#1877F2" }} />}
                  >
                    {`${createUser ? "Sign up" : "Sign in"} with facebook`}
                  </Button>
                  <Button
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      gap: "10px",
                      width: "auto",
                      "@media (min-width: 600px)": {
                        width: "320px",
                      },
                      textTransform: "capitalize",
                      border: "1px solid black",
                      borderRadius: "100px",
                      px: 3,
                      py: 2,
                      color: "black",
                    }}
                    onClick={() =>
                      setSignReq(createUser ? "sign-up" : "sign-in")
                    }
                    variant="outlined"
                    startIcon={<Email sx={{ color: "black" }} />}
                  >
                    {`${createUser ? "Sign up" : "Sign in"} with email`}
                  </Button>
                </Box>
                <Box>
                  {createUser ? "Already have an account" : "No Account"}
                  <Link
                    underline="none"
                    sx={{
                      color: "#34d399",
                      "&:hover": {
                        color: "#22c55e",
                      },
                      fontWeight: "bold",
                      ml: "4px",
                      cursor: "pointer",
                    }}
                    onClick={() => setCreateUser(!createUser)}
                  >
                    {createUser ? "Sign in" : "Sign up"}
                  </Link>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: "480px",
                    ml: "auto",
                    mr: "auto",
                    textAlign: "center",
                    fontSize: "14px",
                    mb: "48px",
                  }}
                >
                  Click "{createUser ? "Sign in" : "Sign up"}" to agree to
                  Medium’s Terms of Service and acknowledge that Medium’s
                  Privacy Policy applies to you.
                </Box>
              </>
            ) : signReq === "sign-in" ? (
              <SignIn setSignReq={setSignReq} />
            ) : signReq === "sign-up" ? (
              <SignUp setSignReq={setSignReq} />
            ) : null}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default CustomModal;
