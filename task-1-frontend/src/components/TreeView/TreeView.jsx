import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTreeItemAction,
  selectNestedBranches,
  selectTreeStatus,
} from "../../store/treeSlice";
import { Typography, Box, IconButton } from "@mui/material";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import Branch from "./Branch/Branch"
import Alert from "../Alert/Alert";
import TaskBar from "../TaskBar/TaskBar";

//component
const TreeView = ({ setView }) => {
  //state and action logic
  const [showAlert, setShowAlert] = useState(false);
  const [showBranches, setShowBranches] = useState(false);
  const dispatch = useDispatch();
  const status = useSelector(selectTreeStatus);
  const nestBranches = useSelector(selectNestedBranches);
  useEffect(() => {
    dispatch(fetchTreeItemAction());
  }, [dispatch]);

  useEffect(() => {
    if (status === "good") {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    }
  }, [status]);

  //return JSX
  return (
    <Box className="treeView">
      {/* taskbar */}
      <TaskBar setView={setView} currentView="tree" />
      {showAlert && <Alert />}
      {/* Root */}
      <Box className={`${showBranches?"treeView__root treeView__root--opened":"treeView__root"}`}>
        <Box
          className="treeView__rootLable"
          onClick={() => setShowBranches((prev) => !prev)}
        >
          {!showBranches && (
            <IconButton color="success">
              <ArrowCircleDownIcon />
            </IconButton>
          )}
          {showBranches && (
            <IconButton color="warning" align="center">
              <ArrowCircleUpIcon />
            </IconButton>
          )}
          <Typography variant="button" align="center">
            <b>ROOT</b>
          </Typography>
        </Box>
 
        {nestBranches.length > 0
          ? showBranches &&
            nestBranches.map((branch, index) => (
              <Branch key={index} branchName={branch} />
            ))
          : "No data"}
      </Box>
    </Box>
  );
};
//export component
export default TreeView;


