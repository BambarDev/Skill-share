import React, { useState } from "react";
import { Blog } from "../../../context/context";
import useFetch from "../../../hook/useFetch";
import { Avatar, Box, Link, Typography } from "@mui/material";
import FollowButton from "./FollowButton";
import { useNavigate } from "react-router-dom";

const Follow = () => {
  const { currentUser } = Blog();
  const { data, loading } = useFetch("users");
  const [count, setCount] = useState(5);
  const users =
    data &&
    data?.slice(0, count).filter((user) => user.userId !== currentUser?.uid);
  console.log(users);

  const navigate = useNavigate();

  return (
    <>
      {data &&
        users?.map((user, i) => {
          const { username, bio, userImg, userId } = user;
          return (
            <Box
              key={i}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                my: "16px",
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                }}
              >
                <Avatar
                  onClick={() => navigate("/profile" + "/" + userId)}
                  src={userImg}
                  sx={{ width: 56, height: 56, cursor: "pointer" }}
                />
                <Box
                  sx={{
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      "&::first-letter": {
                        textTransform: "uppercase",
                      },
                    }}
                  >
                    {username}
                  </Typography>
                  <Typography
                    sx={{
                      lineHeight: "16px",
                      color: "grey.500",
                      fontSize: "14px",
                      lineClamp: 2,
                    }}
                  >
                    {bio || "This user has no bio"}
                  </Typography>
                </Box>
                <FollowButton userId={userId} />
              </Box>
            </Box>
          );
        })}
      {data.length < 5 && (
        <Link
          underline="none"
          sx={{
            fontFamily: "sans-serif",
            color: "#16a34a",
            cursor: "pointer",
            fontSize: "14px",
            py: "12px",
            "&:hover": {
              color: "#232427",
            },
          }}
          onClick={() =>
            setCount((prev) => users.length < data?.length && prev + 3)
          }
        >
          Load for more users
        </Link>
      )}
    </>
  );
};

export default Follow;
