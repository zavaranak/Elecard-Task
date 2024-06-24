import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTreeItemAction,
  selectTreeItems,
  selectNestedBranches,
} from "../../slices/treeSlice";
import BranchHeader from "./BranchHeader";
//component
const TreeView = () => {
  //state and action logic
  const dispatch = useDispatch();
  const nestBranches = useSelector(selectNestedBranches);
  const items = useSelector(selectTreeItems);
  useEffect(() => {
    dispatch(fetchTreeItemAction());
  }, [dispatch]);
  //return JSX
  return (
    <div>
      <h1>
        Tree From {nestBranches.length} Branches and {items.length} items
      </h1>
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
