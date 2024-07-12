import {
  Button,
  Select,
  MenuItem,
  Typography,
  Slider,
  Switch,
  Box,
  FormControl,
  InputLabel,
  IconButton,
} from '@mui/material';
import { selectCategories } from '../../store/cardSlice';
import { useSelector } from 'react-redux';
import { DarkMode, LightMode } from '@mui/icons-material';
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
    console.log(darktheme);
    localStorage.setItem('darktheme', !darktheme);
    setDarktheme((prev) => !prev);
  };

  const categories = useSelector(selectCategories);
  return (
    <Box className={classByView}>
      {currentView === 'cards' && (
        <>
          {/* SORT and FILTER and Order */}
          <Box className={styles.taskbar__selectors}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id='sortLabel'>
                <b>SORT</b>
              </InputLabel>
              <Select
                className={styles.taskbar__selector}
                labelId='sortLabel'
                label='SORT'
                defaultValue={'default'}
                onChange={(event) => sortHandler(event.target.value)}
              >
                <MenuItem value='default'>
                  <Typography variant='button'>default</Typography>
                </MenuItem>
                <MenuItem value='filesize'>
                  <Typography variant='button'>by size</Typography>
                </MenuItem>
                <MenuItem value='name'>
                  <Typography variant='button'>by name</Typography>
                </MenuItem>
                <MenuItem value='timestamp'>
                  <Typography variant='button'>by date</Typography>
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id='filterLabel'>
                <b>FILTER</b>
              </InputLabel>
              <Select
                className={styles.taskbar__selector}
                labelId='filterLabel'
                label='FILTER'
                defaultValue={'default'}
                onChange={(event) => filterHandler(event.target.value)}
              >
                <MenuItem value='default'>All</MenuItem>
                {categories.map((map, index) => (
                  <MenuItem key={index} value={map}>
                    <Typography variant='button'>{map}</Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id='orderLable'>
                <b>ORDER</b>
              </InputLabel>
              <Select
                className={styles.taskbar__selector}
                labelId='orderlabel'
                label='ORDER'
                defaultValue={'growing'}
                onChange={(event) => orderHandler(event.target.value)}
              >
                <MenuItem value='growing'>Growing</MenuItem>
                <MenuItem value='falling'>Falling</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </>
      )}
      {/* Switch View */}
      <Box className={styles.taskbar__center_item}>
        <IconButton
          className={styles.taskbar__dark_mode_button}
          onClick={themeHandler}
        >
          {(darktheme && (
            <LightMode
              className={styles.taskbar__dark_mode_button_clicked}
              style={{ color: 'var(--text-main-color)' }}
            />
          )) || (
            <DarkMode
              className={styles.taskbar__dark_mode_button_clicked}
              style={{ color: 'var(--text-main-color)' }}
            />
          )}
        </IconButton>
        <Box className={styles.taskbar__switch}>
          <Typography variant='button'>
            <b>tree view</b>
          </Typography>
          <Switch
            defaultChecked={currentView === 'tree'}
            onChange={ViewChangeHandler}
          />
        </Box>
      </Box>
      {/* Recover Images and Images per page */}
      {currentView === 'cards' && (
        <>
          <Box className={styles.taskbar__item}>
            <Typography variant='button'>
              <b>Images per Page</b>
            </Typography>
            <Slider
              aria-label='ImagePerPage'
              color='var(--text-main-color)'
              defaultValue={6}
              valueLabelDisplay='auto'
              min={6}
              max={100}
              onChange={debouncedImagePerPageChange}
            />
          </Box>
          <Box className={styles.taskbar__item}>
            <Button
              variant='contained'
              sx={{
                fontWeight: '600',
                color: 'var(--text-main-color)',
                background: 'var(--background-color)',
                ':disabled': {
                  opacity: 1,
                  color: 'var(--disabled-color)',
                  cursor: 'not-allowed',
                },
              }}
              disabled={localStorageEmpty}
              onClick={() => cardRecover()}
            >
              Recover Delelted Cards
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Taskbar;
