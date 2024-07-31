import { Slider, Switch } from '@mui/material';
import { selectCategories } from '@store/cardSlice';
import { useSelector } from 'react-redux';
import Moon from '@icons/Moon.svg';
import Sun from '@icons/Sun.svg';
import styles from './TaskBar.module.scss';
import clsx from 'clsx';
import { useState } from 'react';

const Taskbar = (props) => {
  const {
    filterHandler,
    sortHandler,
    orderHandler,
    cardRecover,
    debouncedImagePerPageChange,
    localStorageEmpty,
    setView,
    currentView,
  } = props;
  const [darktheme, setDarktheme] = useState(
    localStorage.darktheme ? JSON.parse(localStorage.darktheme) : false
  );
  const ViewChangeHandler = () => {
    if (setView)
      setTimeout(
        () => setView((prev) => (prev === 'cards' ? 'tree' : 'cards')),
        500
      );
  };
  const classByView = clsx(
    (currentView === 'tree' && styles.taskbar_tree_view) || styles.taskbar
  );

  const themeHandler = () => {
    document.documentElement.classList.toggle('dark-theme');
    localStorage.setItem('darktheme', !darktheme);
    setDarktheme((prev) => !prev);
  };

  const categories = useSelector(selectCategories);
  return (
    <div data-testid='taskbar' className={classByView}>
      {currentView === 'cards' && (
        <>
          {/* SORT and FILTER and Order */}
          <div className={styles.taskbar__selectors}>
            <div className={styles.taskbar__selector}>
              <label id='sortLabel'>
                <b>SORT</b>
              </label>
              <select
                data-testid='taskbar-sort'
                className={styles.taskbar__selector}
                defaultValue={'default'}
                onChange={(event) => {
                  if (sortHandler) sortHandler(event.target.value);
                }}
              >
                <option value='default'>default</option>
                <option value='filesize'>by size</option>
                <option value='name'>by name</option>
                <option value='timestamp'>by date</option>
              </select>
            </div>

            <div className={styles.taskbar__selector}>
              <label id='filterLabel'>
                <b>FILTER</b>
              </label>
              <select
                data-testid='taskbar-filter'
                className={styles.taskbar__selector}
                defaultValue={'default'}
                onChange={(event) => {
                  if (filterHandler) filterHandler(event.target.value);
                }}
              >
                <option value='default'>all</option>
                {categories.map((map, index) => (
                  <option key={index} value={map}>
                    {map}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.taskbar__selector}>
              <label id='orderLable'>
                <b>ORDER</b>
              </label>
              <select
                data-testid='taskbar-order'
                className={styles.taskbar__selector}
                defaultValue={'growing'}
                onChange={(event) => {
                  if (orderHandler) orderHandler(event.target.value);
                }}
              >
                <option value='growing'>growing</option>
                <option value='falling'>falling</option>
              </select>
            </div>
          </div>
        </>
      )}
      {/* Switch View */}
      <div className={styles.taskbar__center_item}>
        <button
          data-testid='taskbar-darkmode'
          className={styles.taskbar__dark_mode_button}
          onClick={themeHandler}
        >
          {(darktheme && (
            <Sun
              data-testid='taskbar-sun'
              className={styles.taskbar__dark_mode_button_clicked}
            />
          )) || <Moon className={styles.taskbar__dark_mode_button_clicked} />}
        </button>
        <div className={styles.taskbar__switch}>
          <p>
            <b>tree view</b>
          </p>
          <Switch
            data-testid='taskbar-switch-view'
            defaultChecked={currentView === 'tree'}
            onChange={ViewChangeHandler}
          />
        </div>
      </div>
      {/* Recover Images and Images per page */}
      {currentView === 'cards' && (
        <>
          <div className={styles.taskbar__item}>
            <p>
              <b>Images per page</b>
            </p>
            <Slider
              data-testid='taskbar-slider'
              aria-label='ImagePerPage'
              color='var(--text-main-color)'
              defaultValue={6}
              valueLabelDisplay='auto'
              min={6}
              max={100}
              onChange={(e) => {
                if (debouncedImagePerPageChange)
                  debouncedImagePerPageChange(e.target.value);
              }}
            />
          </div>
          <div className={styles.taskbar__item}>
            <button
              data-testid='taskbar-recover'
              className={styles.taskbar__recover_button}
              disabled={localStorageEmpty}
              onClick={() => {
                if (cardRecover) cardRecover();
              }}
            >
              Recover deleted cards
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Taskbar;
