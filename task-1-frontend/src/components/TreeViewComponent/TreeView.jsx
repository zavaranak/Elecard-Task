import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTreeItemAction,
  selectNestedBranches,
  selectTreeStatus,
} from "../../slices/treeSlice";
import BranchHeader from "./BranchHeader";
import TaskBar from "../TaskBar";
import { Typography,Box } from "@mui/material";
//component
const TreeView = ({ setView }) => {
  //state and action logic
  const [showAlert, setShowAlert] = useState("false");
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
        <Typography
          variant="caption"
          className="app__success-message"
        >
          Get images successful.
        </Typography>
      )}
      <br />
      {nestBranches.length > 0
        ? nestBranches.map((branch, index) => (
            <BranchHeader key={index} branchName={branch} />
          ))
        : "No data"}
    </Box>
  );
};
//export component
export default TreeView;
