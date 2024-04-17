import React from "react";
import { Box } from "@mui/material";
import useFetch from "../../../hook/useFetch";
import Loading from "../../loading/Loading";
import PostsCard from "./PostsCard";

const Posts = () => {
  const { data, loading } = useFetch("posts");
  
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      {loading ? (
        <Loading />
      ) : (
        data.map((post, i) => <PostsCard post={post} key={i} />)
      )}
    </Box>
  );
};

export default Posts;
