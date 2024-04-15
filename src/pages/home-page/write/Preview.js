import React, { useEffect, useRef, useState } from "react";
import { CloseOutlined } from "@mui/icons-material";
import { Box, IconButton, Link, TextField, Typography } from "@mui/material";
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
import TagsInput from "react-tagsinput";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Blog } from "../../../context/context";
import { useNavigate } from "react-router-dom";

const Preview = ({ setPublish, title, content }) => {
  const imageRef = useRef(null);
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState([]);
  const [desc, setDesc] = useState("");
  const { currentUser } = Blog();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState({
    title: "",
    photo: "",
  });

  useEffect(() => {
    if (title || content) {
      setPreview({ ...preview, title: title });
      setDesc(content);
    } else {
      setPreview({ ...preview, title: "" });
      setDesc("");
    }
  }, [title, content]);

  const handleClick = () => {
    imageRef.current.click();
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (preview.title === "" || desc === "" || tags.length === 0) {
        toast.error("All fields are required!!!");
        return;
      }

      const collections = collection(db, "posts");

      let url;
      if (imageUrl) {
        const storageRef = ref(storage, `image/${preview.photo.name}`);
        await uploadBytes(storageRef, preview?.photo);

        url = await getDownloadURL(storageRef);
      }

      await addDoc(collections, {
        userId: currentUser?.uid,
        title: preview.title,
        desc,
        tags,
        postImg: url || "",
        created: Date.now(),
        pageViews: 0,
      });
      toast.success("Post has been added");
      navigate("/");
      setPublish(false);
      setPreview({
        title: "",
        photo: "",
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        backgroundColor: "white",
        zIndex: "30",
        inset: "0px",
      }}
    >
      <Box
        sx={{
          width: "95%",
          "@media (min-width: 600px)": {
            width: "90%",
          },
          margin: "auto",
          mt: "32px",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            right: "16px",
            "@media (min-width: 768px)": {
              right: "80px",
              top: "48px",
              fontSize: "24px",
            },
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
              "@media (max-width: 768px)": {
                right: 0,
                top: -40,
              },
              "&:hover": {
                opacity: 0.5,
              },
            }}
            onClick={() => setPublish(false)}
          >
            <CloseOutlined />
          </IconButton>
        </Box>
        <Box
          sx={{
            mt: "128px",
            display: "flex",
            flexDirection: "column",
            "@media (min-width: 768px)": {
              flexDirection: "row",
              gap: "40px",
            },
          }}
        >
          <Box sx={{ flex: "1" }}>
            <Typography sx={{ fontFamily: "sans-serif" }}>
              Story Preview
            </Typography>
            <Box
              sx={{
                width: "100%",
                height: "400px",
                backgroundColor: "grey.100",
                objectFit: "cover",
                my: "12px",
                placeItems: "center",
                display: "grid",
                cursor: "pointer",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                fontFamily: "sans-serif",
                backgroundImage: `url(${imageUrl})`,
              }}
              onClick={handleClick}
            >
              {!imageUrl && "Add Image"}
            </Box>
            <input
              onChange={(e) => {
                setImageUrl(URL.createObjectURL(e.target.files[0]));
                setPreview({ ...preview, photo: e.target.files[0] });
              }}
              ref={imageRef}
              type="file"
              hidden
            />
            <TextField
              variant="standard"
              size="large"
              placeholder="Title"
              value={preview.title}
              onChange={(e) =>
                setPreview({ ...preview, title: e.target.value })
              }
              InputProps={{
                disableUnderline: true,
              }}
              sx={{
                my: "20px",
                width: "100%",
                borderBottom: "1px solid",
                borderColor: "grey.300",
              }}
            />
            <EditorProvider>
              <Editor value={desc} onChange={(e) => setDesc(e.target.value)}>
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
            <Typography
              sx={{
                color: "grey.500",
                pt: "16px",
                flexDirection: "row",
                fontSize: "14px",
              }}
            >
              Note: Changes here will affect how your story appears in public
              places like Medium’s homepage and in subscribers’ inboxes — not
              the contents of the story itself.
            </Typography>
          </Box>
          <Box
            sx={{
              flex: "1",
              display: "flex",
              flexDirection: "column",
              "@media (max-width: 768px)": {
                mt: "14px",
              },
              mb: "20px",
              gap: "16px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                fontFamily: "sans-serif",
                flexDirection: "row",
                fontSize: "24px",
                gap: "4px",
              }}
            >
              Publishing to:
              <Box
                sx={{
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  fontSize: "24px",
                  mb: {
                    md: 0,
                  },
                }}
              >
                Bambar
              </Box>
            </Box>
            <Typography sx={{ fontFamily: "sans-serif" }}>
              Add or change topics up to 5 so readers know what your story is
              about
            </Typography>
            <TagsInput value={tags} onChange={setTags} />
            <Link
              underline="none"
              sx={{
                px: "20px",
                py: "10px",
                color: "white",
                cursor: "pointer",
                width: "fit-content",
                borderRadius: "100px",
                fontFamily: "sans-serif",
                backgroundColor: "#16a34a",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#22c55e",
                },
              }}
              onClick={handleSubmit}
            >
              {loading ? "Submitting" : "Ready to publish"}
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Preview;
