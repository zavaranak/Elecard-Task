import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTreeItemAction,
  selectNestedBranches,
} from "../../slices/treeSlice";
import BranchHeader from "./BranchHeader";
import TaskBar from "../TaskBar";
//component
const TreeView = ({setView}) => {
  //state and action logic
  const dispatch = useDispatch();
  const nestBranches = useSelector(selectNestedBranches);
  useEffect(() => {
    dispatch(fetchTreeItemAction());
  }, [dispatch]);
  //return JSX
  return (
    <div className="treeView">
      <TaskBar setView={setView} currentView='tree'/>
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
