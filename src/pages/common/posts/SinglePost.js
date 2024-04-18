import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Blog } from "../../../context/context";
import { db } from "../../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const SinglePost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = Blog();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const postRef = doc(db, "posts", postId);
        const getPost = await getDoc(postRef);

        if (getPost.exists()) {
          const postData = getPost.data();
          if (postData?.userId) {
            const userRef = doc(db, "users", postData?.userId);
            const getUser = await getDoc(userRef);

            if (getUser.exists()) {
              const { created, ...rest } = getUser.data();
              setPost({ ...postData, ...rest, id: postId });
            }
          }
        }
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId, post?.userId]);

  return <div></div>;
};

export default SinglePost;
