import { Box, ImageList, Typography } from "@mui/material";
import cls from "./UserWall.module.scss";
import React from "react";

import { doc, getDoc } from "firebase/firestore";
import { db } from "~app/firebase.ts";
import { useAuthStore } from "~features/session";
import { ImageCard } from "~widgets/image-card";

interface Card {
  id: string;
  photoURL: string;
  title: string;
  description: string;
  author: string;
}

export const UserWall = () => {
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState("");
  const { user } = useAuthStore();

  React.useEffect(() => {
    const userUI = user.uid;
    const getProfilePhotos = async () => {
      const likeDocRef = doc(db, "likes", `${userUI}`);
      const likeDocSnap = await getDoc(likeDocRef);
      try {
        if (likeDocSnap.exists()) {
          console.log("Document data:", likeDocSnap.data());
          setData(likeDocSnap.data().likedPhotos);
        } else {
          console.log("Document data:", "NONE");
        }
      } catch (error) {
        const result = error as Error;
        setError(result.message);
      }
    };
    getProfilePhotos();
  }, [user.uid]);

  return (
    <Box className={cls.userWall}>
      {/* userWall header */}
      <Typography variant={"h5"} fontWeight={"bold"}>
        {data.length > 0 ? "Saved Images" : "Save Your first image!"}
      </Typography>
      {/* userWall images*/}
      <ImageList variant={"masonry"} cols={3} gap={10}>
        {data.map((card: Card, index) => (
          <ImageCard key={card.id} index={index} error={error} card={card} />
        ))}
      </ImageList>
    </Box>
  );
};
