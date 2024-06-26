import {
  Button,
  Select,
  MenuItem,
  Typography,
  Slider,
  FormControlLabel,
  Switch,
} from "@mui/material";

const TaskBar = (props) => {
  const {
    selectHandler,
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
  return (
    <div className="taskbar">
      {
      currentView === "cards" && <>
      <div className="taskbar__item">
        <Button
          variant="outlined"
          disabled={localStorageEmpty}
          onClick={() => cardRecover()}
        >
          Recover Delelted Cards
        </Button>
      </div>
      <div className="taskbar__item">
        <Select
          defaultValue={"default"}
          onChange={(event) => selectHandler(event.target.value)}
        >
          <MenuItem value="default">--Unsorted--</MenuItem>
          <MenuItem value="filesize">By Size</MenuItem>
          <MenuItem value="name">By Name</MenuItem>
          <MenuItem value="timestamp">By Date</MenuItem>
          <MenuItem value="category">By Category</MenuItem>
        </Select>
      </div>
      </>
      }
      <div
        className={`${
          currentView === "tree"
            ? "taskbar__switch--treeview"
            : "taskbar__switch"
        }`}
      >
        <FormControlLabel
          value="bottom"
          control={
            <Switch
              defaultChecked={currentView === "tree"}
              onChange={ViewChangeHandler}
            />
          }
          label="Tree view"
          labelPlacement="top"
        />
      </div>

      {currentView === "cards" && (
        <>
          <div className="taskbar__item">
            <Typography>Image Per Page</Typography>
            <Slider
              aria-label="ImagePerPage"
              defaultValue={6}
              valueLabelDisplay="auto"
              min={6}
              max={100}
              onChange={debouncedImagePerPageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default TaskBar;
