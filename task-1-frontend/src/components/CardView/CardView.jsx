import Page from "./Page";
import {
  selectCardsLength,
  sortOrderCard,
  sortAndFilterCard,
  restoreCards,
} from "../../store/cardSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Pagination, Skeleton, Box } from "@mui/material";
import TaskBar from "../TaskBar/TaskBar";

const CardView = ({ setView }) => {
  const cardsLength = useSelector(selectCardsLength);
  const [localStorageEmpty, setLocalStorageEmpty] = useState(true);
  const [imagePerPage, setImagePerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("default");
  const [filterOption, setFilterOption] = useState("default");
  const pageCount = Math.round(cardsLength / imagePerPage);
  const dispatch = useDispatch();

  const sortHandler = (value) => {
    setSortOption(value);
    dispatch(sortAndFilterCard([value, filterOption]));
  };
  const filterHandler = (value) => {
    setFilterOption(value);
    dispatch(sortAndFilterCard([sortOption, value]));
  };
  const orderHandler = (value) => {
    dispatch(sortOrderCard(value));
    dispatch(sortAndFilterCard([sortOption, filterOption]));
  };
  const cardRecover = () => {
    localStorage.deletedCards = [];
    setLocalStorageEmpty(true);
    dispatch(restoreCards());
    dispatch(sortAndFilterCard([sortOption, filterOption]));
  };
  //Slider handler with debouncing to optimize performance
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };
  const debouncedImagePerPageChange = debounce(
    (event, value) => setImagePerPage(value),
    500
  );
  useEffect(() => {
    const checkLocalStorage = localStorage.deletedCards ? true : false;
    setLocalStorageEmpty(!checkLocalStorage);
  }, [cardsLength]);
  useEffect(() => {
    setCurrentPage(1);
  }, []);
  useEffect(() => {
    if (pageCount === 0) setCurrentPage(1);
    else setCurrentPage(Math.min(currentPage, pageCount));
  }, [currentPage, pageCount]);
  return (
    <Box className="cardView">
      <Box style={{ marginBottom: "10px" }}>
        {cardsLength > 0 && (
          <TaskBar
            filterHandler={filterHandler}
            currentView="cards"
            sortHandler={sortHandler}
            orderHandler={orderHandler}
            cardRecover={cardRecover}
            debouncedImagePerPageChange={debouncedImagePerPageChange}
            localStorageEmpty={localStorageEmpty}
            setView={setView}
          />
        )}
        <></>
      </Box>
      {!(cardsLength > 0) && (
        <Box className="cardView__skeleton">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Box>
      )}

      <Page pageNumb={currentPage} imagePerPage={imagePerPage} />
      <Pagination
        className="cardView__pagination"
        color="primary"
        count={Math.max(1, pageCount)}
        page={currentPage}
        onChange={(event, page) => {
          setCurrentPage(page);
        }}
        showFirstButton
        showLastButton
      />
    </Box>
  );
};
export default CardView;
