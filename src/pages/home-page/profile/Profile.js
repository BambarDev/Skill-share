import React, { useState } from "react";
import { Avatar, Box, Link, Typography } from "@mui/material";
import ProfileImg from "../../../assets/profile.jpg";
import ProfileHome from "./activities/ProfileHome";
import ProfileLists from "./activities/ProfileLists";
import ProfileAbout from "./activities/ProfileAbout";
import { categoryActions } from "../../../constants";
import { Blog } from "../../../context/context";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { allUsers } = Blog();
  const { userId } = useParams();
  const activities = [
    {
      title: "Home",
      comp: ProfileHome,
    },
    {
      title: "Lists",
      comp: ProfileLists,
    },
    {
      title: "About",
      comp: ProfileAbout,
    },
  ];
  const [currentActive, setCurrentActive] = useState(activities[0]);

  const getUserData = allUsers.find((user) => user.id === userId);

  return (
    <Box
      sx={{
        width: "95%",
        "@media (min-width: 600px)": {
          width: "90%",
        },
        margin: "auto",
        display: "flex",
        gap: "64px",
        position: "relative",
      }}
    >
      <Box
        sx={{
          mt: "144px",
          flex: "2",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Typography
            sx={{
              fontSize: "30px",
              fontWeight: "bold",
              textTransform: "capitalize",
              "@media (min-width: 640px)": {
                fontSize: "48px",
              },
            }}
          >
            {getUserData?.username}
          </Typography>
          <Typography
            sx={{
              color: "grey.500",
              fontSize: "12px",
              mt: "23px",
              "@media (min-width: 640px)": {
                fontSize: "14px",
              },
            }}
          >
            Followers(2)
          </Typography>
          <Box
            sx={{
              color: "grey.500",
              fontSize: "12px",
              mt: "23px",
              "@media (min-width: 640px)": {
                fontSize: "14px",
              },
            }}
          >
            Followings(4)
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            mt: "16px",
            borderBottom: "1px solid",
            borderColor: "grey.300",
            mb: "48px",
          }}
        >
          {activities.map((item, i) => (
            <Box
              key={i}
              sx={{
                py: "8px",
                borderBottom:
                  item.title === currentActive.title ? "1px solid" : "none",
              }}
            >
              <Link
                underline="none"
                sx={{
                  color: "black",
                  fontFamily: "sans-serif",
                  cursor: "pointer",
                }}
                onClick={() => setCurrentActive(item)}
              >
                {item.title}
              </Link>
            </Box>
          ))}
        </Box>
        <Box>
          <currentActive.comp getUserData={getUserData} />
        </Box>
      </Box>
      <Box
        sx={{
          flex: "1",
          borderLeft: "1px solid",
          borderColor: "grey.300",
          p: "32px",
          zIndex: "10",
        }}
      >
        <Box
          sx={{
            position: "sticky",
            top: "28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Avatar
            src={getUserData?.userImg || ProfileImg}
            sx={{ width: 56, height: 56 }}
          />
          <Typography
            sx={{ py: "8px", fontWeight: "bold", textTransform: "capitalize" }}
          >
            {getUserData?.username}
          </Typography>
          <Typography
            sx={{
              color: "grey.500",
              "&::first-letter": {
                textTransform: "uppercase",
                fontSize: "14px",
              },
            }}
          >
            this will be test website
          </Typography>
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
            onClick={() => {}}
          >
            Edit profile
          </Link>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
              lineHeight: "12px",
              pt: "32px",
            }}
          >
            {categoryActions.map((item, i) => (
              <Link
                key={i}
                underline="none"
                sx={{
                  fontFamily: "sans-serif",
                  color: "#232427",
                  cursor: "pointer",
                  fontSize: "11px",
                  py: "12px",
                  "&:hover": {
                    color: "#232427",
                  },
                }}
                onClick={() => {}}
              >
                {item}
              </Link>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
