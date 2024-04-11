import React, { useState } from "react";
import { Box, Typography, Button, Link } from "@mui/material";
import CustomTextField from "../../components/textField";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

const SignUp = ({ closeModal, setSignReq }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form[("username", "email", "password", "confirmPassword")] === "") {
      toast.error("All fields are required");
    } else if (form["password"] !== form["confirmPassword"]) {
      toast.error("Your passwords are not matching!!");
      return;
    } else {
      setLoading(true);
      const { user } = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const ref = doc(db, "users", user.uid);
      const userDoc = await getDoc(ref);

      if (!userDoc.exists()) {
        await setDoc(ref, {
          userId: user.uid,
          username: form.username,
          email: form.email,
          userImg: "",
          bio: "",
        });
        navigate("/");
        toast.success("New account has been Created");
        closeModal();
        setLoading(false);
      }
    }
  };

  const handleChange = (field) => (e) => {
    setForm({
      ...form,
      [field]: e.target.value,
    });
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
        <CustomTextField
          title="Username"
          value={form.username}
          onChange={handleChange("username")}
        />
        <CustomTextField
          title="Email"
          value={form.email}
          onChange={handleChange("email")}
        />
        <CustomTextField
          type="password"
          title="Password"
          value={form.password}
          onChange={handleChange("password")}
        />
        <CustomTextField
          type="password"
          title="Confirm password"
          value={form.confirmPassword}
          onChange={handleChange("confirmPassword")}
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
          Sign Up
        </Button>
      </Box>
      <Link
        underline="none"
        sx={{
          display: "flex",
          alignItems: "center",
          fontFamily: "sans-serif",
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
