import Card from "./Card/Card";
import { useSelector } from "react-redux";
import { Box, Grid } from "@mui/material";
import { selectCardsInRange } from "../../store/cardSlice";

const Page = ({ pageNumb, imagePerPage }) => {
  const startIndex = imagePerPage * (pageNumb - 1);
  const endIndex = startIndex + imagePerPage;
  const cardSelector = selectCardsInRange(startIndex, endIndex);
  const cards = useSelector(cardSelector);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 1, md: 2 }}
        columns={{ xs: 2, sm: 8, md: 12 }}
      >
        {cards.length > 0 &&
          cards.map((card, index) => (
            <Card key={index + card.filesize} cardInfo={card} />
          ))}
      </Grid>
    </Box>
  );
};
export default Page;
