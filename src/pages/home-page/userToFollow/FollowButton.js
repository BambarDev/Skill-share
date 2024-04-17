import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Blog } from "../../../context/context";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import useSingleFetch from "../../../hook/useSingleFetch";
import { db } from "../../../firebase/firebase";

const FollowButton = ({ userId }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const { currentUser } = Blog();
  const { data, loading } = useSingleFetch(
    "users",
    currentUser?.uid,
    "follows"
  );

  useEffect(() => {
    const isFollow =
      data && data.findIndex((item) => item.id === userId) !== -1;

    setIsFollowed(isFollow);
  }, [data, currentUser?.uid]);

  const handleFollow = async () => {
    try {
      if (currentUser) {
        const followRef = doc(db, "users", currentUser?.uid, "follows", userId);
        const followerRef = doc(
          db,
          "users",
          userId,
          "followers",
          currentUser?.uid
        );
        if (isFollowed) {
          await deleteDoc(followRef);
          await deleteDoc(followerRef);
          toast.success("User is unfollowed");
        } else {
          await setDoc(followRef, {
            userId: userId,
          });
          await setDoc(followerRef, {
            userId: userId,
          });
          toast.success("User is following");
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <Button
      onClick={handleFollow}
      sx={{
        border: isFollowed ? "" : "1px solid",
        borderRadius: "100px",
        borderColor: "black",
        textTransform: "capitalize",
        color: isFollowed ? "grey.500" : "black",
        "&:hover": {
          opacity: 0.5,
        },
      }}
    >
      {isFollowed ? "Following" : "Follow"}
    </Button>
  );
};

export default FollowButton;
