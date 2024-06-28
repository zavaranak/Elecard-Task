import Page from "./Page";
import {
  fetchCardAction,
  filterCard,
  selectCardsLength,
  selectStatus,
  sortCard,
  sortOrderCard,
} from "../../store/cardSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Pagination, Skeleton, Box, Typography } from "@mui/material";
import { Check } from "@mui/icons-material";
import TaskBar from "../TaskBar";
//component
const CardView = ({ setView }) => {
  //state and action logic
  const cardsLength = useSelector(selectCardsLength);
  const [showAlert, setShowAlert] = useState(false);
  const [localStorageEmpty, setLocalStorageEmpty] = useState(true);
  const [imagePerPage, setImagePerPage] = useState(6);
  const [currentPage, setPage] = useState(1);
  const [sortOption, setSortOption] = useState("default");
  const [filterOption, setFilterOption] = useState("");
  const pageCount = Math.round(cardsLength / imagePerPage);
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const sortHandler = (value) => {
    setSortOption(value);
    dispatch(sortCard(value));
  };
  const filterHandler = (value) => {
    setFilterOption(value);
    dispatch(filterCard(value));
  };
  const orderHandler = (value) => {
    dispatch(sortOrderCard(value));
    if(sortOption!=="default")sortHandler(sortOption);
  };
  const cardRecover = () => {
    localStorage.deletedCards = [];
    setLocalStorageEmpty(true);
    dispatch(fetchCardAction());
  };
  const showValue = [sortOption, filterOption];
  //Slider Handler with debouncing to optimize performance
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
  ///useEffect
  useEffect(() => {
    const checkLocalStorage = localStorage.deletedCards ? true : false;
    setLocalStorageEmpty(!checkLocalStorage);
  }, [cardsLength]);
  useEffect(() => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
    dispatch(fetchCardAction());
  }, [dispatch]);
  useEffect(() => {
    setPage(1);
    if (status === "good") {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    }
  }, [status]);
  useEffect(() => {
    if (currentPage > pageCount) setPage(pageCount);
  }, [pageCount]);
  //return JSX
  return (
    <Box className="cardView">
      <Box style={{ marginBottom: "10px" }}>
        {/* <button onClick={() => dispatch(fetchCardAction())}>Fetch Cards</button> */}
        {/* <Button onClick={() => dispatch(removeAllCard())}>Remove All Cards</Button> */}
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
      {showAlert && (
        <Typography
          variant="caption"
          className="app__success-message "
          icon={<Check fontSize="inherit" />}
          severity="success"
        >
          Get images successful.
        </Typography>
      )}
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

      <Page
        pageNumb={currentPage}
        showValue={showValue}
        imagePerPage={imagePerPage}
      />
      <Pagination
        className="cardView__pagination"
        count={pageCount}
        onChange={(event, page) => setPage(page)}
        showFirstButton
        showLastButton
      />
      {/* Pagination without MUI
      {currentPage < pageCount && (
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
      {cardsLength > 0 && currentPage !== pageCount && (
        <button onClick={() => setPage(pageCount)}>Last Page</button>
      )} */}
    </Box>
  );
};
//export component
export default CardView;
