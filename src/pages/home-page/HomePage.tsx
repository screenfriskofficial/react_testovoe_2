import { Box, ImageList, ImageListItem } from "@mui/material";

import { ImageItemBar } from "~widgets/image-item-bar/ImageItemBar.tsx";
import { ImagesModal } from "~widgets/images-modal";
import React from "react";

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
const HomePage = () => {
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
    <Box className={"home"}>
      <ImageList variant="masonry" cols={3} gap={10}>
        {itemData.map((item, index) => (
          <>
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
                className={"image"}
                onClick={() => handleOpen(index)}
              />
              <ImageItemBar title={item.title} author={item.author} />
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

export default HomePage;
