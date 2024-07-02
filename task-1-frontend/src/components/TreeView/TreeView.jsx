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
import Branch from "./Branch/Branch";
import Alert from "../Alert/Alert";
import TaskBar from "../TaskBar/TaskBar";

const TreeView = ({ setView }) => {
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

  return (
    <Box
      className={'treeView'}
    >
      <TaskBar setView={setView} currentView="tree" />
      {showAlert && <Alert />}

      <Box
        className={`${
          showBranches
            ? "treeView__root treeView__root_opened"
            : "treeView__root"
        }`}
      >
        <Box
          className="treeView__root_lable"
          onClick={() => setShowBranches((prev) => !prev)}
        >
          {!showBranches && (
            <IconButton sx={{color:"white"}}>
              <ArrowCircleDownIcon />
            </IconButton>
          )}
          {showBranches && (
            <IconButton sx={{color:"white"}} align="center">
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

export default TreeView;
