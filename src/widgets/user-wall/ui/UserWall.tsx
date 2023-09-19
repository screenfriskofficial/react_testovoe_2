import { Box, ImageList, ImageListItem, Typography } from "@mui/material";
import cls from "./UserWall.module.scss";
import React from "react";
import { ImagesModal } from "~widgets/images-modal";
import { ImageItemBar } from "~widgets/image-item-bar/ImageItemBar.tsx";

const imageData = [
  {
    img: "/women1.jfif",
    title: "Bed",
    author: "@Mark",
  },
  {
    img: "/women2.jfif",
    title: "Books",
    author: "@Mark",
  },
  {
    img: "/women3.jfif",
    title: "Sink",
    author: "@Mark",
  },
  {
    img: "/women4.jfif",
    title: "Kitchen",
    author: "@Mark",
  },
  {
    img: "/women5.jfif",
    title: "Blinds",
    author: "@Mark",
  },
  {
    img: "/women6.jfif",
    title: "Chairs",
    author: "@Mark",
  },
];

export const UserWall = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState<null | number>(null);

  const handleOpen = (index: number) => {
    setSelected(index);
    setOpen(true);
  };
  const handleClose = () => {
    setSelected(null);
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
        {imageData.map((image, index) => (
          <React.Fragment key={image.img}>
            <ImageListItem>
              <img
                src={`${image.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${image.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={image.title}
                loading="lazy"
                className={cls.image}
                onClick={() => handleOpen(index)}
              />
              <ImageItemBar title={image.title} author={image.author} />
            </ImageListItem>
            <ImagesModal
              img={image.img}
              title={image.title}
              description={image.description}
              open={open && index === selected}
              handleClose={handleClose}
            />
          </React.Fragment>
        ))}
      </ImageList>
    </Box>
  );
};
