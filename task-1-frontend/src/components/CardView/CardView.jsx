import Page from "./Page";
import {
  fetchCardAction,
  selectCardsLength,
  selectStatus,
  sortOrderCard,
  sortAndFilterCard,
} from "../../store/cardSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Pagination, Skeleton, Box } from "@mui/material";
import Alert from "../Alert/Alert";
import TaskBar from "../TaskBar/TaskBar";
//component
const CardView = ({ setView }) => {
  //state and action logic
  const cardsLength = useSelector(selectCardsLength);
  const [showAlert, setShowAlert] = useState(false);
  const [localStorageEmpty, setLocalStorageEmpty] = useState(true);
  const [imagePerPage, setImagePerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("default");
  const [filterOption, setFilterOption] = useState("default");
  const pageCount = Math.round(cardsLength / imagePerPage);
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);

  const sortHandler = (value) => {
    setSortOption(value);
    dispatch(sortAndFilterCard([value,filterOption]))
  };
  const filterHandler = (value) => {
    setFilterOption(value);
    dispatch(sortAndFilterCard([sortOption,value]))
  };
  const orderHandler = (value) => {
    dispatch(sortOrderCard(value));
    dispatch(sortAndFilterCard([sortOption,filterOption]))
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
    setCurrentPage(1);
    if (status === "good") {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    }
  }, [status]);
  useEffect(() => {
    if(pageCount===0)setCurrentPage(1);
    else setCurrentPage(Math.min(currentPage, pageCount));
  }, [currentPage, pageCount]);
  //return JSX
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
      {showAlert && <Alert />}
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
      color="primary"
      count={Math.max(1, pageCount)}
      page={currentPage}
      onChange={(event, page) => {
           setCurrentPage(page);
      }}
      showFirstButton
      showLastButton
    />
      {/* Pagination without MUI
      {currentPage < pageCount && (
        <button onClick={() => setCurrentPage((prev) => prev + 1)}>Next Page</button>
      )}
      {currentPage > 1 && cardsLength > 0 && (
        <button onClick={() => setCurrentPage((prev) => prev - 1)}>
          Previous Page
        </button>
      )}
      {cardsLength > 0 && currentPage !== 1 && (
        <button onClick={() => setCurrentPage(1)}>First Page</button>
      )}
      {cardsLength > 0 && currentPage !== pageCount && (
        <button onClick={() => setCurrentPage(pageCount)}>Last Page</button>
      )} */}
    </Box>
  );
};
//export component
export default CardView;
