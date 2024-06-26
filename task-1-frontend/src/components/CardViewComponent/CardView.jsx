import Page from "./Page";
import {
  fetchCardAction,
  selectCardsLength,
  selectStatus,
} from "../../slices/cardSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { sortCard } from "../../slices/cardSlice";
import { Pagination, Skeleton, Alert } from "@mui/material";
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
  const [sortOption, setSortOption] = useState("");
  const pageCount = Math.round(cardsLength / imagePerPage);
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  function selectHandler(value) {
    if (value === "default") {
      setSortOption("");
      dispatch(fetchCardAction());
    } else {
      setSortOption(value);
      dispatch(sortCard(value));
    }
  }
  const cardRecover = () => {
    localStorage.deletedCards = [];
    setLocalStorageEmpty(true);
    dispatch(fetchCardAction());
  };
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
  ///
  useEffect(() => {
    setSortOption("");
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
    if (status === "good") {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 1000);
    }
  }, [status]);
  //return JSX
  return (
    <div className="cardView">
      <div style={{ marginBottom: "10px" }}>
        {/* <button onClick={() => dispatch(fetchCardAction())}>Fetch Cards</button> */}
        {/* <Button onClick={() => dispatch(removeAllCard())}>Remove All Cards</Button> */}
        {cardsLength > 0 && (
          <TaskBar
            currentView="cards"
            selectHandler={selectHandler}
            cardRecover={cardRecover}
            debouncedImagePerPageChange={debouncedImagePerPageChange}
            localStorageEmpty={localStorageEmpty}
            setView={setView}
          />
        )}
        <></>
      </div>
      {showAlert && (
        <Alert
          className="app__alert "
          icon={<Check fontSize="inherit" />}
          severity="success"
        >
          Get images successful.
        </Alert>
      )}
      {!(cardsLength > 0) && (
        <div className="cardView__skeleton">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      )}

      <Page
        pageNumb={currentPage}
        showValue={sortOption}
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
    </div>
  );
};
//export component
export default CardView;
