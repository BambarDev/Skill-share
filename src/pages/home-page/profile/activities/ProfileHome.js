import { Box, Typography } from "@mui/material";
import React from "react";
import Loading from "../../../loading/Loading";
import PostsCard from "../../../common/posts/PostsCard";
import useFetch from "../../../../hook/useFetch";

const ProfileHome = ({ getUserData }) => {
  const { data, loading } = useFetch("posts");
  const userPost =
    data && data?.filter((post) => post?.userId === getUserData?.userId);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: "20px", mb: "64px" }}
    >
      {userPost.length === 0 && (
        <Typography
          sx={{
            fontSize: "24px",
            "&::first-letter": {
              textTransform: "uppercase",
            },
          }}
        >
          {getUserData?.username} has no posts
        </Typography>
      )}
      {loading ? (
        <Loading />
      ) : (
        userPost?.map((post, i) => <PostsCard post={post} key={i} />)
      )}
    </Box>
  );
};

export default ProfileHome;
