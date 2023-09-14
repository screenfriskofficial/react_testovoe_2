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
  Typography,
} from "@mui/material";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "~app/firebase.ts";
import React from "react";
import { AuthContext } from "~features/session";
import cls from "./Navbar.module.scss";
import CloudIcon from "@mui/icons-material/Cloud";
import { Search } from "~widgets/search";

const settings = [
  {
    title: "Profile",
    url: "/profile",
  },
  {
    title: "Upload",
    url: "/upload",
  },
];
export const Navbar = () => {
  const { currentUser } = React.useContext(AuthContext);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );
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
                }}
              >
                <Box className={cls.logo}>
                  C L
                  <CloudIcon fontSize={"small"} />U D
                  <span className={cls.logo_img}>img</span>
                </Box>
              </Button>
            </Link>
          </Box>
          <Box>
            <Search />
          </Box>
          <Box>
            <Tooltip title={"open settings"}>
              <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                <Avatar>
                  {currentUser?.displayName?.split("")[0].toUpperCase()}
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
                <Link to={setting.url} className={cls.link}>
                  <MenuItem key={setting.title} onClick={handleCloseUserMenu}>
                    <Typography textAlign={"center"}>
                      {setting.title}
                    </Typography>
                  </MenuItem>
                </Link>
              ))}
              <MenuItem onClick={handleCloseMenuAndLogout}>
                <Typography textAlign={"center"}>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
