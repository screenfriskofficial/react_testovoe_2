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
import React from "react";
import CloudIcon from "@mui/icons-material/Cloud";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import LogoutIcon from "@mui/icons-material/Logout";
import cls from "./Navbar.module.scss";
import { Link } from "react-router-dom";
import { useAuth, useAuthStore } from "~features/session";

export const Navbar = () => {
  const { user } = useAuthStore();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );
  const { logout } = useAuth();

  const settings = [
    {
      title: "Profile",
      url: `/${user?.displayName}`,
      ico: <AccountCircleIcon />,
    },
    {
      title: "Upload",
      url: "/upload",
      ico: <FileUploadIcon />,
    },
  ];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
                  <span className={cls.logo_img}>img 18+</span>
                </Box>
              </Button>
            </Link>
          </Box>

          <Box>
            <Tooltip title={"open settings"}>
              <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                <Avatar src={user?.photoURL ? user?.photoURL : ""}>
                  {user?.displayName?.charAt(0).toUpperCase()}
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
              <MenuItem onClick={logout}>
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
