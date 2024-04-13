import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo.png";
import { Box, Link } from "@mui/material";
import { menu } from "../../constants";
import AuthModal from "../../components/authModal";

const DemoHeader = () => {
  const [isActive, setIsActive] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const scroll = () => {
    window.scrollY > 50 ? setIsActive(true) : setIsActive(false);
  };
  window.addEventListener("scroll", scroll);

  useEffect(() => {
    scroll();
  }, []);

  return (
    <Box
      position="sticky"
      sx={{
        borderBottom: 1,
        top: 0,
        zIndex: 50,
        backgroundColor: isActive ? "white" : "#FFC017",
        transition: "all",
        transitionDuration: 500,
      }}
    >
      <Box
        sx={{
          width: "95%",
          "@media (min-width: 600px)": {
            width: "90%",
          },
          margin: "auto",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link href="/">
          <img style={{ height: "70px" }} src={Logo} alt="Blog logo" />
        </Link>
        <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: "20px",
            }}
          >
            {menu.map((link, i) => (
              <Link
                key={i}
                underline="none"
                href={link.path}
                sx={{ color: "black", fontFamily: "sans-serif" }}
              >
                {link.title}
              </Link>
            ))}
          </Box>
          <Box position="relative">
            <Link
              underline="none"
              sx={{
                color: "black",
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                gap: "20px",
                fontFamily: "sans-serif",
              }}
            >
              <AuthModal
                color="black"
                buttonTitle="Sign In"
                onOpen={handleOpen}
                click={open}
                onClose={handleClose}
              />
            </Link>
          </Box>
          <Link
            sx={{
              backgroundColor: isActive ? "#16a34a" : "black",
              color: "white",
              fontFamily: "sans-serif",
              textTransform: "capitalize",
              borderRadius: "100px",
              "&:hover": {
                backgroundColor: isActive ? "#22c55e" : "black",
              },
            }}
          >
            <AuthModal
              color="white"
              buttonTitle="Get started"
              onOpen={handleOpen}
              click={open}
              onClose={handleClose}
            />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default DemoHeader;
