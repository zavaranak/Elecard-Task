import Page from './Page/Page';
import {
  selectCardsLength,
  sortOrderCard,
  sortAndFilterCard,
  restoreCards,
} from '@store/cardSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';
import Skeleton from './Skeleton/Skeleton';
import TaskBar from '@components/TaskBar/TaskBar';
import styles from './CardView.module.scss';

const CardView = ({ setView }) => {
  const cardsLength = useSelector(selectCardsLength);
  const [localStorageEmpty, setLocalStorageEmpty] = useState(true);
  const [imagePerPage, setImagePerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(
    Math.round(cardsLength / imagePerPage)
  );
  const [sortOption, setSortOption] = useState('default');
  const [filterOption, setFilterOption] = useState('default');
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
    localStorage.setItem('deletedCards', []);
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
  const debouncedImagePerPageChange = debounce((value) => {
    setImagePerPage(value);
  }, 500);
  useEffect(() => {
    const checkLocalStorage = localStorage.getItem('deletedCards')
      ? true
      : false;
    setLocalStorageEmpty(!checkLocalStorage);
  }, [cardsLength]);
  useEffect(() => {
    setCurrentPage(1);
  }, []);
  useEffect(() => {
    if (pageCount === 0) setCurrentPage(1);
    else {
      setCurrentPage(Math.min(currentPage, pageCount));
    }
    setPageCount(Math.round(cardsLength / imagePerPage));
  }, [currentPage, pageCount, imagePerPage, cardsLength]);
  return (
    <div data-testid='card-view' className={styles.card_view}>
      <div>
        {cardsLength > 0 && setView && (
          <TaskBar
            filterHandler={filterHandler}
            currentView='cards'
            sortHandler={sortHandler}
            orderHandler={orderHandler}
            cardRecover={cardRecover}
            debouncedImagePerPageChange={debouncedImagePerPageChange}
            localStorageEmpty={localStorageEmpty}
            setView={setView}
          />
        )}
        <></>
      </div>
      {!(cardsLength > 0) && <Skeleton />}

      <Page pageNumb={currentPage} imagePerPage={imagePerPage} />
      <Pagination
        data-testid='pagination'
        className={styles.card_view__pagination}
        count={Math.max(1, pageCount)}
        page={currentPage}
        onChange={(event, page) => {
          setCurrentPage(page);
        }}
        showFirstButton
        showLastButton
      />
    </div>
  );
};
export default CardView;
