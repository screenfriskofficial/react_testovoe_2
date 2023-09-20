import { Box, ImageList } from "@mui/material";

import React from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "~app/firebase.ts";
import { Spinner } from "~shared/ui/spinner";
import { ImageCard } from "~widgets/image-card/ui/ImageCard.tsx";

interface CardsProps {
  id: string;
  photoURL: string;
  title: string;
  author: string;
  description: string;
}

const HomePage: React.FC = () => {
  const [images, setImages] = React.useState<CardsProps[]>([]);
  const [value, setValue] = React.useState<string>("");
  const [loader, setLoader] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    setLoader(true);
    const getData = async () => {
      const docRef = doc(db, "images", "imageWall");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setImages(docSnap.data().allImages);
      }
    };
    getData()
      .then(() => setLoader(false))
      .catch((error) => {
        const result = error as Error;
        setError(result.message);
      })
      .finally(() => setLoader(false));
  }, []);

  const filteredImages = React.useMemo(() => {
    return images.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase()),
    );
  }, [value, images]);

  return (
    <Box className={"home"}>
      {loader ? (
        <Spinner />
      ) : (
        <>
          <input
            placeholder={"Search Images"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <ImageList variant="masonry" cols={3} gap={10}>
            {filteredImages.map((card, index) => (
              <ImageCard
                key={card.id}
                index={index}
                error={error}
                card={card}
              />
            ))}
          </ImageList>
        </>
      )}
    </Box>
  );
};

export default HomePage;
