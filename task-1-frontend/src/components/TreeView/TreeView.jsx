import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTreeItemAction,
  selectNestedBranches,
  selectTreeStatus,
} from "../../store/treeSlice";
import { Typography, IconButton } from "@mui/material";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import Branch from "./Branch/Branch";
import Alert from "../Alert/Alert";
import TaskBar from "../TaskBar/TaskBar";
import ButtonToTop from "../ButtonToTop/ButtonToTop";

const TreeView = ({ setView }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [showBranches, setShowBranches] = useState(true);
  const dispatch = useDispatch();
  const status = useSelector(selectTreeStatus);
  const nestBranches = useSelector(selectNestedBranches);
  const rootTag = useRef();

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
    <div className={"tree_view"}>
      <TaskBar setView={setView} currentView="tree" />

      {showAlert && <Alert />}

      <div
        className={`${
          showBranches
            ? "tree_view__root tree_view__root_opened"
            : "tree_view__root"
        }`}
      >
        <div
          ref={rootTag}
          className="tree_view__lable"
          onClick={() => setShowBranches((prev) => !prev)}
        >
          {!showBranches && (
            <IconButton color="success">
              <ArrowCircleDownIcon />
            </IconButton>
          )}
          {showBranches && (
            <IconButton color="primary" align="center">
              <ArrowCircleUpIcon />
            </IconButton>
          )}
          <Typography sx={{color:"#004dbb"}} variant="button" align="center">
            <b>ROOT</b>
          </Typography>
        </div>

        {nestBranches.length > 0
          ? showBranches &&
            nestBranches.map((branch, index) => (
              <Branch key={index} order={index+1} branchName={branch} />
            ))
          : "No data"}
      </div>
      <ButtonToTop order={0} />
      {/* <ButtonToTop order={15} rootTag={rootTag} /> */}
    </div>
  );
};

export default TreeView;
