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
} from "@mui/material";
import { selectCategories } from "../slices/cardSlice";
import { useSelector } from "react-redux";
//component
const TaskBar = (props) => {
  const {
    filterHandler,
    sortHandler,
    cardRecover,
    debouncedImagePerPageChange,
    localStorageEmpty,
    setView,
    currentView,
  } = props;
  const ViewChangeHandler = () => {
    setTimeout(
      () => setView((prev) => (prev === "cards" ? "tree" : "cards")),
      400
    );
  };
  const categories = useSelector(selectCategories);
  return (
    <Box className="taskbar">
      {currentView === "cards" && (
        <>
          <Box className="taskbar__item">
            <Button
              variant="outlined"
              disabled={localStorageEmpty}
              onClick={() => cardRecover()}
            >
              Recover Delelted Cards
            </Button>
          </Box>
          <Box className="taskbar__itemSelect">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="sortLabel">SORT</InputLabel>
              <Select
                labelId="sortLabel"
                label="SORT"
                defaultValue={"default"}
                onChange={(event) => sortHandler(event.target.value)}
              >
                <MenuItem value="default">
                  <Typography variant="button">default</Typography>
                </MenuItem>
                <MenuItem value="filesize">
                  <Typography variant="button">by size </Typography>
                </MenuItem>
                <MenuItem value="name">
                  <Typography variant="button">by name</Typography>
                </MenuItem>
                <MenuItem value="timestamp">
                  <Typography variant="button">by date</Typography>
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="filterLabel">FILTER</InputLabel>
              <Select
                labelId="filterLabel"
                label="FILTER"
                defaultValue={"default"}
                onChange={(event) => filterHandler(event.target.value)}
              >
                <MenuItem value="default">All</MenuItem>
                {categories.map((map, index) => (
                  <MenuItem key={index} value={map}>
                    <Typography variant="button">{map}</Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </>
      )}
      <Box
        className={`${
          currentView === "tree"
            ? "taskbar__switch--treeview"
            : "taskbar__switch"
        }`}
      >
        <Typography variant="button">tree view</Typography>

        <Switch
          defaultChecked={currentView === "tree"}
          onChange={ViewChangeHandler}
        />
      </Box>

      {currentView === "cards" && (
        <>
          <Box className="taskbar__item">
            <Typography variant="button"> Images per Page</Typography>
            <Slider
              aria-label="ImagePerPage"
              defaultValue={6}
              valueLabelDisplay="auto"
              min={6}
              max={100}
              onChange={debouncedImagePerPageChange}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default TaskBar;
