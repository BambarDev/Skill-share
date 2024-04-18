import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import useFetch from "../../../hook/useFetch";
import { readTime } from "../../../components/helper";
import moment from "moment/moment";
import SavedPost from "./actions/SavedPost";
import { Blog } from "../../../context/context";
// import Loading from "../../loading/Loading";
import Actions from "./actions/Actions";
import { useNavigate } from "react-router-dom";

const PostsCard = ({ post }) => {
  const { title, desc, created, postImg, id: postId, userId } = post;
  const { data, loading } = useFetch("users");
  const { currentUser } = Blog();
  const getUserData = data && data?.find((user) => user?.id === userId);

  const navigate = useNavigate();

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        cursor: "pointer",
        py: "10px",
        pr: "10px",
      }}
    >
      <Box sx={{ flex: "2", display: "flex", flexDirection: "column" }}>
        <CardContent onClick={() => navigate(`/post/${postId}`)}>
          <Typography
            component="div"
            variant="h5"
            sx={{
              fontSize: "20px",
              "&::first-letter": {
                textTransform: "uppercase",
              },
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              py: "4px",
              color: "grey.500",
              lineClamp: 2,
              lineHeight: "20px",
              "&::first-letter": {
                textTransform: "uppercase",
              },
            }}
            dangerouslySetInnerHTML={{ __html: desc }}
          />
        </CardContent>
        <Box
          sx={{
            pl: 2,
            pb: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            sx={{
              fontSize: "20px",
              "&::first-letter": {
                textTransform: "uppercase",
              },
            }}
          >
            {getUserData?.username}
          </Typography>
          <Box
            sx={{
              flex: "2",
              gap: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Typography sx={{ fontSize: "12px", color: "grey.600" }}>
              {readTime({ __html: desc })} min read{" "}
              {moment(created).format("MMM DD")}
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
                mr: "20px",
              }}
            >
              <SavedPost post={post} getUserData={getUserData} />
              {currentUser?.uid === userId && (
                <Actions postId={postId} title={title} desc={desc} />
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{
          width: 150,
          height: "auto",
          objectFit: "contain",
        }}
        image={postImg}
        alt="Post img"
      />
    </Card>
  );
};

export default PostsCard;
