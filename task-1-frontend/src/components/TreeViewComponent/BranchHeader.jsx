import { useState } from "react";
import BranchList from "./BranchList";
//component
const BranchHeader = ({ branchName }) => {
  //state and logic
  const [listDisplay, setListDisplay] = useState(false);
  //return JSX
  return (
    <div>
      <h3 onClick={() => setListDisplay((prev) => !prev)}>Nested branch of category: {branchName}</h3>
      {listDisplay && <BranchList branchName={branchName} />}
    </div>
  );
};
//export component
export default BranchHeader;
