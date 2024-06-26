import Card from "./Card";
import { useSelector } from "react-redux";
import { Box,Grid } from "@mui/material";
//component
const Page = ({ pageNumb, showValue,imagePerPage }) => {
  const startIndex = imagePerPage * (pageNumb - 1);
  const endIndex = startIndex + imagePerPage;
  const cards = useSelector((state) =>
    state.cards.cardsData.slice(startIndex, endIndex)
  );
  //return JSX
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
      {cards.length > 0 &&
        cards.map((card, index) => <Card key={index} cardInfo={card} showValue={showValue}/>)}
      </Grid>
    </Box>
  );
};
//export component
export default Page;
