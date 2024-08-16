import { Slider, Switch } from '@mui/material';
import { selectCategories } from '@store/cardSlice';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import styles from './TaskBar.module.scss';
import clsx from 'clsx';
import { LanguageContext } from '@utils/textContext';

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
  const languageContextTextTaskBar = useContext(LanguageContext).text.taskbar;
  const categories = useSelector(selectCategories);
  if (currentView === 'tree')
    return (
      <div data-testid='taskbar' className={classByView}>
        <div className={styles.taskbar__center_item}>
          <div className={styles.taskbar__switch}>
            <p>{languageContextTextTaskBar.treeview}</p>
            <Switch
              data-testid='taskbar-switch-view'
              defaultChecked={currentView === 'tree'}
              onChange={ViewChangeHandler}
            />
          </div>
        </div>
      </div>
    );
  if (currentView === 'cards')
    return (
      <div data-testid='taskbar' className={classByView}>
        <div className={styles.taskbar__selectors}>
          <div className={styles.taskbar__selector}>
            <label id='sortLabel'>
              {languageContextTextTaskBar.selector.sort.text}
            </label>
            <select
              data-testid='taskbar-sort'
              className={styles.taskbar__selector}
              defaultValue={'default'}
              onChange={(event) => {
                sortHandler(event.target.value);
              }}
            >
              <option value='default'>
                {languageContextTextTaskBar.selector.sort.default}
              </option>
              <option value='filesize'>
                {languageContextTextTaskBar.selector.sort.size}
              </option>
              <option value='name'>
                {languageContextTextTaskBar.selector.sort.name}
              </option>
              <option value='timestamp'>
                {languageContextTextTaskBar.selector.sort.date}
              </option>
            </select>
          </div>

          <div className={styles.taskbar__selector}>
            <label id='filterLabel'>
              {languageContextTextTaskBar.selector.filter.text}
            </label>
            <select
              data-testid='taskbar-filter'
              className={styles.taskbar__selector}
              defaultValue={'default'}
              onChange={(event) => {
                filterHandler(event.target.value);
              }}
            >
              <option value='default'>
                {languageContextTextTaskBar.selector.filter.all}
              </option>
              {categories.map((map, index) => (
                <option key={index} value={map}>
                  {map}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.taskbar__selector}>
            <label id='orderLable'>
              {languageContextTextTaskBar.selector.order.text}
            </label>
            <select
              data-testid='taskbar-order'
              className={styles.taskbar__selector}
              defaultValue={'growing'}
              onChange={(event) => {
                orderHandler(event.target.value);
              }}
            >
              <option value='growing'>
                {languageContextTextTaskBar.selector.order.grow}
              </option>
              <option value='falling'>
                {languageContextTextTaskBar.selector.order.fall}
              </option>
            </select>
          </div>
        </div>

        <div className={styles.taskbar__center_item}>
          <div className={styles.taskbar__switch}>
            <p>{languageContextTextTaskBar.treeview}</p>
            <Switch
              data-testid='taskbar-switch-view'
              defaultChecked={currentView === 'tree'}
              onChange={ViewChangeHandler}
            />
          </div>
        </div>

        <div
          className={clsx(styles.taskbar__item, styles.taskbar__item_slider)}
        >
          <label>{languageContextTextTaskBar.slider}</label>
          <Slider
            data-testid='taskbar-slider'
            defaultValue={6}
            valueLabelDisplay='auto'
            min={6}
            max={100}
            onChange={(e) => {
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
              cardRecover();
            }}
          >
            {languageContextTextTaskBar.recover}
          </button>
        </div>
      </div>
    );
};

export default Taskbar;
