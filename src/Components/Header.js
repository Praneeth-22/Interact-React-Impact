import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { faker } from "@faker-js/faker";
import logo from "../images/logo/logo2.jpg";
import { useUserAuth } from ".././context/UserContextApi";
import { useState ,useEffect} from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Profile from "./TimeLine/Profile";
//
const pages = ["Home", "Category", "Chat"]; // change the caterogy
const settings = ["Profile", "Logout"];
function Header(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { setOpenModel } = props;
  const { user,logOut } = useUserAuth();
  const ava = faker.image.avatar();
  const [photoUrl, setPhotoUrl] = useState(ava);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [modelOpen, setModelOpen] = useState(false);
  const handleOpenModel = () => setModelOpen(true);
  const handleCloseModel = () => setModelOpen(false);

  useEffect(
    () => {
      if (user.photoURL) { // user != null && user.photoURL != null
        console.log("photo   is:", user.photoURL);
        console.log("display name is:", user.displayName);
        setPhotoUrl(user.photoURL);
        setDisplayName(user.displayName);
        setEmail(user.email);
      }
    },[user]
  );
  console.log("user is:", user);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (option) => {
    if (option === "Home") {
      window.location.href = "/home";
    } else if (option === "Category") {
      setOpenModel(true);
    } else if (option === "Chat") {
      window.location.href = "/chat-home";
    }
    console.log("option", option);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting) => {
    if (setting === "Profile") {
      handleOpenModel();
      // window.location.href = "/profile";
    } else if (setting === "Logout") {
      logOut(); // to logout the user
      window.location.href = "/";
    }
    setAnchorElUser(null);
  };


  return (
    <AppBar
      position="static"
      style={{
        // backgroundColor: "#6237a0",
        backgroundColor: "#28104e",

        // backgroundColor:"#deacf5",
        color: "white",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              src={logo}
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
              alt="logo"
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            IRI
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleCloseNavMenu(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="avatar"
                  src={photoUrl}
                  referrerpolicy="no-referrer"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleCloseUserMenu(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={modelOpen}
          onClose={handleCloseModel}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={modelOpen}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "50vw",
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              <Profile name={displayName} email={email} />
            </Box>
          </Fade>
        </Modal>
      </Container>
    </AppBar>
  );
}
export default Header;
