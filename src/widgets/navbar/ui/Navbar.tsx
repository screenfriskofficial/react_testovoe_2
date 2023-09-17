import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { signOut } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "~app/firebase.ts";
import React from "react";
import { AuthContext } from "~features/session";
import cls from "./Navbar.module.scss";
import CloudIcon from "@mui/icons-material/Cloud";
import { Search } from "~widgets/search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import LogoutIcon from "@mui/icons-material/Logout";

const settings = [
  {
    title: "Profile",
    url: "/profile",
    ico: <AccountCircleIcon />,
  },
  {
    title: "Upload",
    url: "/upload",
    ico: <FileUploadIcon />,
  },
];

// TODO: may be create auth with google and github.
// TODO: create grid layout in homepage

export const Navbar = () => {
  const { currentUser } = React.useContext(AuthContext);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const location = useLocation();
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleCloseMenuAndLogout = () => {
    setAnchorElUser(null);
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <AppBar position={"sticky"}>
      <Container maxWidth={"xl"}>
        <Toolbar className={cls.toolbar}>
          <Box>
            <Link to={"/"} className={cls.link}>
              <Button
                sx={{
                  color: "#fff",
                  display: {
                    sm: "block",
                    xs: `${
                      location.pathname === "/upload" ||
                      location.pathname === "/profile"
                        ? "block"
                        : "none"
                    }`,
                  },
                }}
              >
                <Box className={cls.logo}>
                  C L
                  <CloudIcon fontSize={"small"} />U D
                  <span className={cls.logo_img}>img 18+</span>
                </Box>
              </Button>
            </Link>
          </Box>
          {location.pathname === "/upload" ||
          location.pathname === "/profile" ? (
            ""
          ) : (
            <Box>
              <Search />
            </Box>
          )}
          <Box>
            <Tooltip title={"open settings"}>
              <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                <Avatar
                  src={currentUser?.photoURL ? currentUser?.photoURL : ""}
                >
                  {currentUser?.displayName?.charAt(0).toUpperCase()}
                </Avatar>
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
                <Link key={setting.title} to={setting.url} className={cls.link}>
                  <MenuItem key={setting.title} onClick={handleCloseUserMenu}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "5px",
                      }}
                    >
                      {setting.ico}
                      {setting.title}
                    </Box>
                  </MenuItem>
                </Link>
              ))}
              <MenuItem onClick={handleCloseMenuAndLogout}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "5px",
                  }}
                >
                  <LogoutIcon />
                  Logout
                </Box>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
