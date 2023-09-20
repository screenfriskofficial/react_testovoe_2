import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton, ImageListItem, ImageListItemBar } from "@mui/material";
import { ImageModal } from "~widgets/image-card";
import { db } from "~app/firebase.ts";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useAuthStore } from "~features/session";

interface Card {
  id: string;
  photoURL: string;
  title: string;
  description: string;
  author: string;
}

interface CardProps {
  index: number;
  error: string;
  card: Card;
}

export const ImageCard = ({ card, index, error }: CardProps) => {
  const [activeImg, setActiveImg] = React.useState<number | null>(null);
  const [liked, setLiked] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { user } = useAuthStore();
  const { photoURL, title, description, author, id } = card;

  const handleOpen = (index: number) => {
    setActiveImg(index);
    setOpen(true);
  };

  const handleClose = () => {
    setActiveImg(null);
    setOpen(false);
  };

  React.useEffect(() => {
    const localStorageKey = `like_${user?.uid}_${id}`;
    const savedLike = localStorage.getItem(localStorageKey);
    if (savedLike === "true") {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, id]);

  const handleLikeClick = async () => {
    if (!user) {
      console.error("Пользователь не аутентифицирован.");
      return;
    }
    const userUI = user.uid;
    const localStorageKey = `like_${userUI}_${id}`;
    const likeDocRef = doc(db, "likes", userUI);

    if (liked) {
      await updateDoc(likeDocRef, {
        likedPhotos: arrayRemove({
          id,
          photoURL,
          title,
          description,
          author,
          liked: true,
        }),
      });
      localStorage.setItem(localStorageKey, "false");
      setLiked(false);
    } else {
      await updateDoc(likeDocRef, {
        likedPhotos: arrayUnion({
          id,
          photoURL,
          title,
          description,
          author,
          liked: true,
        }),
      });
      localStorage.setItem(localStorageKey, "true");
      setLiked(true);
    }
  };

  return (
    <>
      <ImageListItem>
        <img
          src={`${photoURL}?w=248&fit=crop&auto=format`}
          srcSet={`${photoURL}?w=248&fit=crop&auto=format&dpr=2 2x`}
          alt=""
          loading="lazy"
          className="image"
          onClick={() => handleOpen(index)}
        />
        <ImageListItemBar
          title={title}
          className={"image_bar"}
          subtitle={<span>by: {author}</span>}
          actionIcon={
            <IconButton sx={{ color: "#fff" }} onClick={handleLikeClick}>
              {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          }
        />
      </ImageListItem>
      <ImageModal
        img={photoURL}
        title={title}
        description={description}
        open={open && index === activeImg}
        handleClose={handleClose}
      />
      {error}
    </>
  );
};
