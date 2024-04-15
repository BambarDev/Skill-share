import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnUnderline,
  Editor,
  EditorProvider,
  Toolbar,
} from "react-simple-wysiwyg";
import Preview from "./Preview";
import { Blog } from "../../../context/context";

const Write = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { publish, setPublish } = Blog();

  return (
    <Box
      sx={{
        width: {
          xs: "90%",
          md: "90%",
          lg: "90%",
        },
        m: "0 auto",
        py: "48px",
      }}
    >
      <TextField
        variant="standard"
        size="large"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        InputProps={{
          disableUnderline: true,
        }}
        sx={{
          mb: "30px",
          width: "100%",
        }}
      />

      <EditorProvider>
        <Editor value={content} onChange={(e) => setContent(e.target.value)}>
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnBulletList />
            <BtnNumberedList />
            <BtnLink />
            <BtnClearFormatting />
          </Toolbar>
        </Editor>
      </EditorProvider>
      <Box
        sx={{
          visibility: publish ? "visible" : "hidden",
          opacity: publish ? 1 : 0,
          transition: "all 200ms",
        }}
      >
        <Preview setPublish={setPublish} content={content} title={title} />
      </Box>
    </Box>
  );
};

export default Write;
