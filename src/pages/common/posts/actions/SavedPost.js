import { Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SaveAlt } from "@mui/icons-material";
import { Blog } from "../../../../context/context";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";
import { toast } from "react-toastify";
import useSingleFetch from "../../../../hook/useSingleFetch";

const SavedPost = ({ post }) => {
  const [isSaved, setIsSaved] = useState(false);
  const { currentUser } = Blog();
  const { data, loading } = useSingleFetch("users", post?.userId, "savePost");

  useEffect(() => {
    setIsSaved(data && data.find((item) => item.id === post.id));
  }, [data, post?.id]);

  const handleSave = async () => {
    try {
      if (currentUser) {
        const saveRef = doc(
          db,
          "users",
          currentUser?.uid,
          "savePost",
          post?.id
        );
        if (isSaved) {
          await deleteDoc(saveRef);
          toast.success("Post has been unsaved");
        } else {
          await setDoc(saveRef, {
            ...post,
          });
          toast.success("Post has been saved");
        }
      }
    } catch (error) {}
  };

  return (
    <Link onClick={handleSave} sx={{ color: "grey.600" }}>
      <SaveAlt sx={{ color: isSaved ? "#fff600" : "" }} />
    </Link>
  );
};

export default SavedPost;
