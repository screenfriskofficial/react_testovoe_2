import { Box, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";

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
];
const HomePage = () => {
  return (
    <Box className={"pages"}>
      <ImageList variant="masonry" cols={3} gap={10}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
              className={"image"}
            />
            <ImageListItemBar
              title={item.title}
              className={"image_bar"}
              subtitle={<span>by: {item.author}</span>}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default HomePage;
