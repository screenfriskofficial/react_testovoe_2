import { Box, ImageList, ImageListItem, Typography } from "@mui/material";
import cls from "./UserWall.module.scss";
import React from "react";
import { ImagesModal } from "~widgets/images-modal";

const itemData = [
  {
    img: "./women1.jfif",
    title: "Bed",
    author: "@Mark",
  },
  {
    img: "./women2.jfif",
    title: "Books",
    author: "@Mark",
  },
  {
    img: "./women3.jfif",
    title: "Sink",
    author: "@Mark",
  },
  {
    img: "./women4.jfif",
    title: "Kitchen",
    author: "@Mark",
  },
  {
    img: "./women5.jfif",
    title: "Blinds",
    author: "@Mark",
  },
  {
    img: "./women6.jfif",
    title: "Chairs",
    author: "@Mark",
  },
  {
    img: "./giphy.gif",
    title: "Chairs",
    author: "@Mark",
  },
];

export const UserWall = () => {
  const [activeImg, setActiveImg] = React.useState<number | null>(null);
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = (index: number) => {
    setActiveImg(index);
    setOpen(true);
  };
  const handleClose = () => {
    setActiveImg(null);
    setOpen(false);
  };
  return (
    <Box className={cls.userWall}>
      {/* userWall header */}
      <Typography variant={"h5"} fontWeight={"bold"}>
        Liked Images
      </Typography>
      {/* userWall images*/}
      <ImageList variant={"masonry"} cols={3} gap={10}>
        {itemData.map((item, index) => (
          <>
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
                className={cls.image}
                onClick={() => handleOpen(index)}
              />
            </ImageListItem>
            <ImagesModal
              img={item.img}
              open={open && index === activeImg}
              handleClose={handleClose}
            />
          </>
        ))}
      </ImageList>
    </Box>
  );
};
