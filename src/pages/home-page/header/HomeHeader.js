import React, { useState } from "react";
import Logo from "../../../assets/logo.png";
import Profile from "../../../assets/profile.jpg";
import { Blog } from "../../../context/context";
import {
  Box,
  Link,
  TextField,
  Typography,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
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

const HomeHeader = () => {
  const { allUsers, currentUser } = Blog();
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

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
                <MenuItem
                  key={i}
                  onClick={handleClose}
                  sx={{
                    p: "10px",
                    width: "288px",
                    borderBottom: i === user.length - 1 ? 1 : 0,
                    borderColor: "grey.300",
                    pl: "24px",
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
                      "&:hover": {
                        color: "#232427",
                      },
                      gap: "12px",
                    }}
                    href={item.path}
                  >
                    {item.icon} {item.title}
                  </Link>
                </MenuItem>
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
