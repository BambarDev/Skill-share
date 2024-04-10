import React from "react";
import { TextField, Box } from "@mui/material";

const CustomTextField = ({ title }) => {
  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "50ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="standard-basic" label={title} variant="standard" />
      </Box>
    </div>
  );
};

export default CustomTextField;
