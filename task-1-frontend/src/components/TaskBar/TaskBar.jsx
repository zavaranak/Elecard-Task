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
} from '@mui/material';
import { selectCategories } from '../../store/cardSlice';
import { useSelector } from 'react-redux';
import { DarkMode } from '@mui/icons-material';

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
    setTimeout(
      () => setView((prev) => (prev === 'cards' ? 'tree' : 'cards')),
      400
    );
  };
  const categories = useSelector(selectCategories);
  return (
    <Box
      className={`${currentView === 'tree' ? 'taskbar_tree_view' : 'taskbar'}`}
    >
      {currentView === 'cards' && (
        <>
          {/* SORT and FILTER and Order */}
          <Box className='taskbar__selectors'>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id='sortLabel'>
                <b>SORT</b>
              </InputLabel>
              <Select
                labelId='sortLabel'
                label='SORT'
                defaultValue={'default'}
                onChange={(event) => sortHandler(event.target.value)}
              >
                <MenuItem value='default'>
                  <Typography variant='button'>default</Typography>
                </MenuItem>
                <MenuItem value='filesize'>
                  <Typography variant='button'>by size </Typography>
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
      <Box className='taskbar__center_item'>
        <Button startIcon={<DarkMode />} />
        <Box className='taskbar__switch'>
          <Typography sx={{ color: '#004dbb' }} variant='button'>
            <b>tree view</b>
          </Typography>
          <Switch
            defaultChecked={currentView === 'tree'}
            color='success'
            onChange={ViewChangeHandler}
          />
        </Box>
      </Box>
      {/* Recover Images and Images per page */}
      {currentView === 'cards' && (
        <>
          <Box className='taskbar__item'>
            <Typography sx={{ color: '#004dbb' }} variant='button'>
              <b>Images per Page</b>
            </Typography>
            <Slider
              aria-label='ImagePerPage'
              defaultValue={6}
              valueLabelDisplay='auto'
              min={6}
              max={100}
              sx={{ color: '#004dbb' }}
              onChange={debouncedImagePerPageChange}
            />
          </Box>
          <Box className='taskbar__item'>
            <Button
              variant='outlined'
              disabled={localStorageEmpty}
              onClick={() => cardRecover()}
            >
              <b>Recover Delelted Cards</b>
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Taskbar;
