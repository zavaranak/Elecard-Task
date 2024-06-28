import { useState } from "react";
import BranchList from "./BranchList";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
//component
const BranchHeader = ({ branchName }) => {
  //state and logic
  const [listDisplay, setListDisplay] = useState(false);
  //return JSX
  return (
    <Box className="branchHeader">
      <Box
        class="branchHeader__toggleList"
        onClick={() => setListDisplay((prev) => !prev)}
      >
        <Typography variant="button" className="branchHeader__label">
          {!listDisplay && (
            <IconButton color="success">
              <ArrowCircleDownIcon />
            </IconButton>
          )}
          {listDisplay && (
            <IconButton color="warning">
              <ArrowCircleUpIcon />
            </IconButton>
          )}
          Nested branch of category:
        </Typography>
        <Typography variant="overline">
          <b> {branchName}</b>{" "}
        </Typography>
      </Box>
      {listDisplay && <BranchList branchName={branchName} />}
    </Box>
  );
};
//export component
export default BranchHeader;
