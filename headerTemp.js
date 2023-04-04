import React from "react";
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";
import downCcon from "../images/down-icon.svg";
import navHome from "../images/nav-home.svg";
import user from "../images/user.svg";
import logo2 from "../images/logo/logo2.jpg";
import ChatIcon from "@mui/icons-material/Chat";
import { useNavigate } from "react-router-dom";
import Chat from "./Chat/Chatpage";
import { faker } from "@faker-js/faker";
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
function Header() {
  const pages = ["Products", "Pricing", "Blog"];
  const settings = ["Profile", "Account", "Dashboard", "Logout"];
  const navigate = useNavigate();
  // const loggedOut = () => {
  //   navigate("/");
  // };
  // const chatpageRoute = () => {
  //   navigate("/Chat");
  // };
  const [anchorElNav, setAnchorElNav] =
    (React.useState < null) | (HTMLElement > null);
  const [anchorElUser, setAnchorElUser] =
    (React.useState < null) | (HTMLElement > null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    // <Container>
    //   <Elements>
    //     <Logo>
    //       <a href="/home">
    //         <img src={logo2} alt="logo" />
    //       </a>
    //     </Logo>
    //     <Nav>
    //       <NavList className="active">
    //         <a href="/home">
    //           <img src={navHome} alt="" />
    //           <span>Home</span>
    //         </a>
    //         <a href="/chat">
    //           <ChatIcon />
    //           <span style={{ color: "black" }} onClick={chatpageRoute}>
    //             Connect
    //           </span>
    //         </a>
    //       </NavList>
    //       <User>
    //         <a>
    //           {/* {props.user && props.user.avatarUrl ? ( */}
    //           {/* <img src={user} alt="" /> */}
    //           {/* ) : ( */}
    //           <img src={faker.image.avatar()} alt="" />
    //           {/* )} */}
    //           <span>
    //             Me
    //             <img src={downCcon} alt="" />
    //           </span>
    //         </a>

    //         {/* <SignOut onClick={() => props.signOut()}> */}
    //         <SignOut>
    //           <a onClick={loggedOut}>Sign Out</a>
    //         </SignOut>
    //       </User>
    //     </Nav>
    //   </Elements>
    // </Container>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
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
            LOGO
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
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
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
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

// const Container = styled.div`
//   top: 0;
//   left: 0;
//   z-index: 1000;
//   padding: 0 10px;
//   position: fixed;
//   width: 100vw;
//   margin-bottom: 10px;
//   background-color: whitesmoke;
// `;
// const Elements = styled.div`
//   display: flex;
//   align-items: center;
//   margin: 0 auto;
//   justify-content: space-between;
//   min-height: 100%;
//   max-width: 970px;
// `;
// const Logo = styled.span`
//   & > a > img {
//     height: 60px;
//     outline: none;
//   }
// `;
// const Nav = styled.nav`
//   margin-left: auto;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;
// const NavList = styled.li`
//   display: flex;
//   align-items: center;
//   cursor: pointer;
//   a {
//     align-items: center;
//     background: transparent;
//     display: flex;
//     flex-direction: column;
//     font-size: 12px;
//     font-weight: 400;
//     justify-content: center;
//     line-height: 1.5;
//     min-height: 52px;
//     min-width: 80px;
//     position: relative;
//     text-decoration: none;
//     span {
//       color: rgba(0, 0, 0, 0.6);
//       display: flex;
//       align-items: center;
//     }
//     @media (max-width: 768px) {
//       min-width: 70px;
//     }
//   }
//   &:hover,
//   &:active {
//     a {
//       span {
//         color: rgba(0, 0, 0, 0.9);
//       }
//     }
//   }
// `;
// const SignOut = styled.div`
//   position: absolute;
//   top: 55px;
//   background: white;
//   border-radius: 5px;
//   width: 70px;
//   height: 40px;
//   font-size: 16px;
//   transition-duration: 167ms;
//   text-align: center;
//   display: none;
//   cursor: pointer;
//   border: 1px solid black;
// `;
// const User = styled(NavList)`
//   cursor: pointer;
//   a > svg {
//     width: 24px;
//     border-radius: 50%;
//   }
//   a > img {
//     width: 24px;
//     height: 24px;
//     border-radius: 50%;
//   }
//   span {
//     display: flex;
//     align-items: center;
//   }
//   &:hover {
//     ${SignOut} {
//       align-items: center;
//       display: flex;
//       justify-content: center;
//     }
//   }
// `;

export default Header;
