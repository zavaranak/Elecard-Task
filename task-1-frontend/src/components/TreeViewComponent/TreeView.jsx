import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTreeItemAction,
  selectNestedBranches,
  selectTreeStatus,
} from "../../store/treeSlice";
import BranchHeader from "./BranchHeader";
import TaskBar from "../TaskBar";
import { Typography, Box,IconButton } from "@mui/material";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
//component
const TreeView = ({ setView }) => {
  //state and action logic
  const [showAlert, setShowAlert] = useState("false");
  const [showBranches, setShowBranches] = useState("false");
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
      <TaskBar setView={setView} currentView="tree" />
      {showAlert && (
        <Typography variant="caption" className="app__success-message">
          Get images successful.
        </Typography>
      )}
      <Box className="treeView__root" >
        <Box className="treeView__rootLable" onClick={()=>setShowBranches(prev=>!prev)}>
        {!showBranches && (
            <IconButton color="success">
              <ArrowCircleDownIcon />
            </IconButton>
          )}
          {showBranches && (
            <IconButton color="warning">
              <ArrowCircleUpIcon />
            </IconButton>
          )}
          <Typography variant = "h6" align="center">Root</Typography>
        </Box>
      {nestBranches.length > 0 
        ? showBranches && nestBranches.map((branch, index) => (
            <BranchHeader key={index} branchName={branch} />
          ))
        : "No data"}
      </Box>
    </Box>
  );
};
//export component
export default TreeView;
