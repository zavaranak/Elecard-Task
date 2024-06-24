import Page from "./Page";
import { fetchCardAction, selectCardsLength,removeAllCard } from "../../slices/cardSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { sortCard } from "../../slices/cardSlice";
//component
const CardView = () => {
  //state and action logic
  const cardsLength = useSelector(selectCardsLength);
  const [currentPage, setPage] = useState(1);
  const [sortOption, setSortOption] = useState("");
  const lastPage = Math.round(cardsLength / 8);
  const dispatch = useDispatch();
  function selectHandler(selectedOption) {
    setSortOption(selectedOption);
    dispatch(sortCard(selectedOption));
  }
  const cardRecover = () =>{
    localStorage.deletedCards = []
    dispatch(fetchCardAction())
  }
  useEffect(()=>{dispatch(fetchCardAction())},[dispatch])
  useEffect(() => {
    setPage(1);
    setSortOption('')
  }, [cardsLength]);
  //return JSX
  return (
    <div>
      <div>
        {/* <button onClick={() => dispatch(fetchCardAction())}>Fetch Cards</button> */}
        <button onClick={() => dispatch(removeAllCard())}>Remove All Cards</button>
        <button onClick={() => cardRecover()}>Recover Delelted Cards</button>
      </div>
      { cardsLength > 0 &&
      <select name="sortoption">
        <option value="" onClick={() => {setSortOption('');dispatch(fetchCardAction())}}>
          --Unsorted--
        </option>
        <option value="filesize" onClick={() => selectHandler("filesize")}>
          Sort By Size
        </option>
        <option value="name" onClick={() => selectHandler("name")}>
          Sort By Name
        </option>
        <option value="timestamp" onClick={() => selectHandler("timestamp")}>
          Sort By Date
        </option>
        <option value="category" onClick={() => selectHandler("category")}>
          Sort By Category
        </option>
      </select>}
      <Page pageNumb={currentPage} showValue={sortOption} />
      {currentPage < lastPage && (
        <button onClick={() => setPage((prev) => prev + 1)}>Next Page</button>
      )}
      {currentPage > 1 && cardsLength > 0 && (
        <button onClick={() => setPage((prev) => prev - 1)}>
          Previous Page
        </button>
      )}
      {cardsLength > 0 && currentPage !== 1 && (
        <button onClick={() => setPage(1)}>First Page</button>
      )}
      {cardsLength > 0 && currentPage !== lastPage && (
        <button onClick={() => setPage(lastPage)}>Last Page</button>
      )}
    </div>
  );
};
//export component
export default CardView;
