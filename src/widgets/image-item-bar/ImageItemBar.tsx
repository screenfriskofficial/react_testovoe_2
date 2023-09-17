import { IconButton, ImageListItemBar } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import React from "react";

interface itemProps {
  title: string;
  author: string;
}

export const ImageItemBar = ({ title, author }: itemProps) => {
  const [liked, setLiked] = React.useState(false);
  return (
    <ImageListItemBar
      title={title}
      className={"image_bar"}
      subtitle={<span>by: {author}</span>}
      actionIcon={
        <IconButton sx={{ color: "#fff" }} onClick={() => setLiked(!liked)}>
          {liked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
        </IconButton>
      }
    />
  );
};
