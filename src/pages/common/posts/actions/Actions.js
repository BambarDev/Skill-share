import { Link, Menu, Box } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Blog } from "../../../../context/context";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";
import { toast } from "react-toastify";
import { MoreHoriz } from "@mui/icons-material";

const Actions = ({ postId, title, desc }) => {
  const { setUpdateData, currentUser } = Blog();
  const [showDrop, setShowDrop] = useState(false);
  const navigate = useNavigate(null);

  const handleOpen = (event) => {
    setShowDrop(event.currentTarget);
  };

  const handleClose = () => {
    setShowDrop(null);
  };

  const handleEdit = () => {
    navigate(`/editPost/${postId}`);
    setUpdateData({ title, description: desc });
  };

  const handleRemove = async () => {
    try {
      const ref = doc(db, "posts", postId);
      const likeRef = doc(db, "posts", postId, "likes", currentUser?.uid);
      const commentRef = doc(db, "posts", postId, "comments", currentUser?.uid);
      const savedPostRef = doc(
        db,
        "users",
        currentUser?.uid,
        "savedPost",
        postId
      );
      await deleteDoc(ref);
      await deleteDoc(likeRef);
      await deleteDoc(commentRef);
      await deleteDoc(savedPostRef);

      toast.success("post has been removed");
      setShowDrop(false);
      navigate("/");
    } catch (error) {
      toast.success(error.message);
    }
  };

  return (
    <>
      <Link onClick={handleOpen} sx={{ color: "grey.600" }}>
        <MoreHoriz sx={{ fontSize: "text-2xl" }} />
      </Link>
      <Menu
        anchorEl={showDrop}
        keepMounted
        open={Boolean(showDrop)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box
          onClick={handleClose}
          sx={{
            p: "10px",
            px: "24px",
            width: "88px",
            display: "flex",
            justifyContent: "flex-start",
            "&:hover": {
              backgroundColor: "grey.300",
            },
          }}
        >
          <Link
            underline="none"
            sx={{
              gap: "12px",
              color: "black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "sans-serif",
              "&:hover": {
                color: "rgba(0, 0, 0, 0.8)",
              },
            }}
            href={"/"}
          >
            Edit post
          </Link>
        </Box>
        <Box
          onClick={handleClose}
          sx={{
            p: "10px",
            px: "24px",
            width: "88px",
            display: "flex",
            justifyContent: "flex-start",
            "&:hover": {
              backgroundColor: "grey.300",
            },
          }}
        >
          <Link
            underline="none"
            sx={{
              gap: "12px",
              color: "#dc2626",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "sans-serif",
              "&:hover": {
                color: "rgba(0, 0, 0, 0.8)",
              },
            }}
            href={""}
          >
            Delete post
          </Link>
        </Box>
      </Menu>
    </>
  );
};

export default Actions;
