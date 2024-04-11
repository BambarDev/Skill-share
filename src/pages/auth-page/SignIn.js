import React, { useState } from "react";
import { Box, Typography, Button, Link } from "@mui/material";
import CustomTextField from "../../components/textField";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignIn = ({ setSignReq }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (field) => (event) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form[("email", "password")] === "") {
      toast.error("All fields are required!!!");
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate("/");
      toast.success("User has been logged in ");
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

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
        <Typography sx={{ fontSize: "30px" }}>Sign in with email</Typography>
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
        <CustomTextField
          value={form.email}
          onChange={handleChange("email")}
          title="Email"
        />
        <CustomTextField
          value={form.password}
          onChange={handleChange("password")}
          type="password"
          title="Password"
        />
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
            opacity: loading ? 0.5 : 1,
            pointerEvents: loading ? "none" : "auto",
          }}
          onClick={handleSubmit}
        >
          Sign In
        </Button>
      </Box>
      <Link
        underline="none"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
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
        All sign in options
      </Link>
    </>
  );
};

export default SignIn;
