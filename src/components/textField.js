import React, { useState } from "react";
import { TextField, Box, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const CustomTextField = ({ title, type, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "50ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        type={type === "password" && showPassword ? "text" : type}
        label={title}
        onChange={onChange}
        variant="standard"
        InputProps={{
          endAdornment:
            type === "password" ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ) : null,
        }}
      />
    </Box>
  );
};

export default CustomTextField;
