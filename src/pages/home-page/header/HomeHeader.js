import React, { useState } from "react";
import Logo from "../../../assets/logo.png";
import Profile from "../../../assets/profile.jpg";
import { Blog } from "../../../context/context";
import { Box, Link, TextField, Typography, Avatar, Menu } from "@mui/material";
import {
  Search,
  Create,
  NotificationsActiveOutlined,
  Person,
  LocalLibrary,
  ListAlt,
  SignalCellularAlt,
} from "@mui/icons-material";
import { secretEmail } from "../../../components/helper";
import { useLocation } from "react-router-dom";

const HomeHeader = () => {
  const { allUsers, currentUser, setPublish } = Blog();
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const { pathname } = useLocation();
  console.log(pathname);

  const getUserData = allUsers.find((user) => user.id === currentUser?.uid);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const user = [
    {
      title: "Profile",
      icon: <Person />,
      path: `/profile/${currentUser?.uid}`,
    },
    {
      title: "Library",
      icon: <LocalLibrary />,
      path: "/library",
    },
    {
      title: "Stories",
      icon: <ListAlt />,
      path: "/stories",
    },
    {
      title: "Stats",
      icon: <SignalCellularAlt />,
      path: "/stats",
    },
  ];

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: "grey.200",
      }}
    >
      <Box
        sx={{
          width: "95%",
          "@media (min-width: 600px)": {
            width: "90%",
          },
          margin: "auto",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Link href="/">
            <img
              style={{ height: "70px" }}
              src={getUserData?.userImg ? getUserData?.userImg : Logo}
              alt="Blog logo"
            />
          </Link>
          <Box
            sx={{
              position: "absolute",
              right: "16px",
              left: "16px",
              top: "64px",
              "@media (min-width: 600px)": {
                position: "relative",
                left: "0",
                top: "0",
              },
            }}
          >
            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },
                alignItems: "center",
                gap: "4px",
                position: "relative",
                backgroundColor: "grey.100",
                padding: "8px",
                borderRadius: "50px",
              }}
            >
              <Search sx={{ fontSize: "24px", color: "grey.400" }} />
              <TextField
                variant="standard"
                size="small"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: {
              xs: "12px",
              sm: "28px",
            },
          }}
        >
          {pathname === "/write" ? (
            <Link
              underline="none"
              sx={{
                px: "20px",
                py: "10px",
                color: "white",
                cursor: "pointer",
                borderRadius: "100px",
                fontFamily: "sans-serif",
                backgroundColor: "#16a34a",
                textTransform: "capitalize",
                "&:hover": {
                  backgroundColor: "#22c55e",
                },
              }}
              onClick={() => setPublish(true)}
            >
              Publish
            </Link>
          ) : (
            <Link
              underline="none"
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "sans-serif",
                color: "black",
                "&:hover": {
                  color: "#232427",
                },
                fontWeight: "bold",
                gap: "12px",
              }}
              href="/write"
            >
              <Create sx={{ fontSize: "24px" }} />
              <Typography sx={{ fontSize: "14px" }}>Write</Typography>
            </Link>
          )}

          <Search
            sx={{
              display: {
                xs: "flex",
                md: "none",
              },
              fontSize: "30px",
              color: "black",
              cursor: "pointer",
            }}
          />

          <NotificationsActiveOutlined
            sx={{ fontSize: "30px", cursor: "pointer" }}
          />
          <Box
            sx={{ display: "flex", alignItems: "center", position: "relative" }}
          >
            <Avatar
              src={Profile}
              onClick={handleClick}
              sx={{ width: 48, height: 48, cursor: "pointer" }}
            />

            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              {user.map((item, i) => (
                <Box
                  key={i}
                  onClick={handleClose}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    p: "10px",
                    width: "288px",
                    borderBottom: i === user.length - 1 ? 1 : 0,
                    borderColor: "grey.300",
                    pl: "24px",
                    "&:hover": {
                      backgroundColor: "grey.300",
                    },
                  }}
                >
                  <Link
                    underline="none"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "sans-serif",
                      color: "black",
                      gap: "12px",
                    }}
                    href={item.path}
                  >
                    {item.icon} {item.title}
                  </Link>
                </Box>
              ))}
              <Link
                underline="none"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  pl: "24px",
                  py: "16px",
                  fontFamily: "sans-serif",
                  color: "black",
                  "&:hover": {
                    color: "#232427",
                  },
                  cursor: "pointer",
                }}
              >
                <Box sx={{ pb: "12px" }}>Sign Out</Box>
                <Box sx={{ fontSize: "14px" }}>
                  {secretEmail(currentUser?.email)}
                </Box>
              </Link>
            </Menu>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomeHeader;
