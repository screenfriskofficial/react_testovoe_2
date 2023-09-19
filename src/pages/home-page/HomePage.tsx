import { Box, ImageList, ImageListItem } from "@mui/material";

import { ImageItemBar } from "~widgets/image-item-bar/ImageItemBar.tsx";
import { ImagesModal } from "~widgets/images-modal";
import React from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "~app/firebase.ts";

interface ImagesProps {
  photoURL: string;
  title: string;
  author: string;
  description: string;
}

const HomePage: React.FC = () => {
  const [activeImg, setActiveImg] = React.useState<number | null>(null);
  const [open, setOpen] = React.useState<boolean>(false);
  const [images, setImages] = React.useState<ImagesProps[]>([]);

  React.useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "images", "imageWall");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setImages(docSnap.data().allImages);
      }
    };
    getData();
  }, []);

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
        {images.map((image, index) => (
          <React.Fragment key={image.photoURL}>
            <ImageListItem>
              <img
                src={`${image.photoURL}?w=248&fit=crop&auto=format`}
                srcSet={`${image.photoURL}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt=""
                loading="lazy"
                className="image"
                onClick={() => handleOpen(index)}
              />
              <ImageItemBar title={image.title} author={image.author} />
            </ImageListItem>
            <ImagesModal
              img={image.photoURL}
              title={image.title}
              description={image.description}
              open={open && index === activeImg}
              handleClose={handleClose}
            />
          </React.Fragment>
        ))}
      </ImageList>
    </Box>
  );
};

export default HomePage;
