import Card from "./Card";
import { useSelector } from "react-redux";
//component
const Page = ({ pageNumb, showValue }) => {
  const imagePerPage = 8;
  const startIndex = imagePerPage * (pageNumb - 1);
  const endIndex = startIndex + imagePerPage;
  const cards = useSelector((state) =>
    state.cards.cardsData.slice(startIndex, endIndex)
  );
  //return JSX
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
      {cards.length > 0 &&
        cards.map((card, index) => <Card key={index} cardInfo={card} showValue={showValue}/>)}
    </div>
  );
};
//export component
export default Page;
