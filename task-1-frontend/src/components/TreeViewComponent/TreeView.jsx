import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTreeItemAction,
  selectNestedBranches,
  selectTreeStatus,
} from "../../slices/treeSlice";
import BranchHeader from "./BranchHeader";
import TaskBar from "../TaskBar";
import { Alert } from "@mui/material";
import { Check } from "@mui/icons-material";
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
      setTimeout(() => setShowAlert(false), 1000);
    }
  }, [status]);
  //return JSX
  return (
    <div className="treeView">
      <TaskBar setView={setView} currentView="tree" />
      {showAlert && (
        <Alert className='app__alert' icon={<Check fontSize="inherit" />} severity="success">
          Get images successful.
        </Alert>
      )}
      <br />
      {nestBranches.length > 0
        ? nestBranches.map((branch, index) => (
            <BranchHeader key={index} branchName={branch} />
          ))
        : "No data"}
    </div>
  );
};
//export component
export default TreeView;
