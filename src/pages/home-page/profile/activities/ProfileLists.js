import React from "react";
import useSingleFetch from "../../../../hook/useSingleFetch";
import { Blog } from "../../../../context/context";
import Loading from "../../../loading/Loading";
import { Box, Typography } from "@mui/material";
import { Lock } from "@mui/icons-material";
import PostsCard from "../../../common/posts/PostsCard";

const ProfileLists = ({ getUserData }) => {
  const { currentUser } = Blog();
  const { data, loading } = useSingleFetch(
    "users",
    currentUser?.uid,
    "savePost"
  );
  return (
    <Box>
      {currentUser && currentUser?.uid === getUserData?.userId ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            mb: "32px",
          }}
        >
          {data && data.length === 0 && (
            <Typography
              sx={{
                fontSize: "24px",
                "&::first-letter": {
                  textTransform: "uppercase",
                },
              }}
            >
              {getUserData?.username} has no saved post
            </Typography>
          )}
          {loading ? (
            <Loading />
          ) : (
            data && data?.map((post, i) => <PostsCard post={post} key={i} />)
          )}
        </Box>
      ) : (
        <PrivateLists username={getUserData?.username} />
      )}
    </Box>
  );
};

export default ProfileLists;

const PrivateLists = ({ username }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "48px",
        textAlign: "center",
      }}
    >
      <Box>
        <Typography sx={{ textTransform: "capitalize" }}>
          {username} saved posts are private
        </Typography>
      </Box>
      <Box sx={{ fontSize: "160px", color: "grey.500" }}>
        <Lock style={{ width: "140px", height: "160px" }} />
      </Box>
    </Box>
  );
};
