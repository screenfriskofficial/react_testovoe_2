import { Avatar, Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { AuthContext } from "~features/session";
import { auth } from "~app/firebase.ts";
import { signOut } from "firebase/auth";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { UserWall } from "~widgets/user-wall";
import { ProfileModal } from "~widgets/profile-modal/ui/ProfileModal.tsx";

const ProfilePage = () => {
  const { currentUser } = React.useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => console.error(error));
  };

  return (
    <Box className={"gaps"}>
      <Box className={"profile"}>
        <Box className={"avatarBox"}>
          <Avatar
            className={"avatar"}
            src={currentUser?.photoURL ? currentUser?.photoURL : ""}
          >
            {currentUser?.displayName?.charAt(0).toUpperCase()}
          </Avatar>
          <Box className={"title_edit"}>
            <Typography
              className={"avatar_title"}
              variant={"h5"}
              fontWeight={"600"}
            >
              {currentUser?.displayName}
            </Typography>
            <ProfileModal />
          </Box>
        </Box>
        <Box>
          <IconButton className={"logout"} onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Box>
      <UserWall />
    </Box>
  );
};

export default ProfilePage;
