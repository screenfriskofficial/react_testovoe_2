import { Box, ImageList, Typography } from "@mui/material";
import cls from "./UserWall.module.scss";
import React from "react";

import { doc, getDoc } from "firebase/firestore";
import { db } from "~app/firebase.ts";
import { useAuthStore } from "~features/session";
import { Spinner } from "~shared/ui/spinner";
import { ImageCard } from "~widgets/image-card";
import { useUserWallStore } from "~widgets/user-wall";

interface Card {
  id: string;
  photoURL: string;
  title: string;
  description: string;
  author: string;
}

export const UserWall = () => {
  const { error, setError, loader, setLoader } = useUserWallStore();
  const [data, setData] = React.useState<Card[]>([]);

  const { user } = useAuthStore();

  React.useEffect(() => {
    const userUI = user.uid;
    setLoader(true);
    const getProfilePhotos = async () => {
      const likeDocRef = doc(db, "likes", `${userUI}`);
      const likeDocSnap = await getDoc(likeDocRef);
      try {
        if (likeDocSnap.exists()) {
          setData(likeDocSnap.data().likedPhotos);
        } else {
          setLoader(true);
        }
      } catch (error) {
        const result = error as Error;
        setError(result.message);
      }
    };
    getProfilePhotos()
      .then(() => setLoader(false))
      .catch((error) => {
        const result = error as Error;
        setError(result.message);
      })
      .finally(() => setLoader(false));
  }, [user.uid, setError, setLoader, setData]);

  return (
    <Box className={cls.userWall}>
      <ImageList variant={"masonry"} cols={3} gap={10}>
        {!loader ? (
          data && data.length > 0 ? (
            data.map((card: Card, index) => (
              <ImageCard
                key={card.id}
                index={index}
                error={error}
                card={card}
              />
            ))
          ) : (
            <Typography variant="body1" fontWeight={"600"} fontSize={"20px"}>
              No saved images found.
            </Typography>
          )
        ) : (
          <Spinner />
        )}
      </ImageList>
    </Box>
  );
};
