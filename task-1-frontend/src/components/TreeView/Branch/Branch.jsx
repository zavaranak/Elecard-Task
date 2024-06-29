import { useState } from "react";
import { useSelector } from "react-redux";
import {selectBranchItemsByBranchName} from "../../../store/treeSlice"
import { Box, Typography, IconButton } from "@mui/material";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import Leaf from "./Leaf/Leaf";
//component
const Branch = ({ branchName }) => {
  //state and logic
  const [listDisplay, setListDisplay] = useState(false);
  const leaves = useSelector((state)=>selectBranchItemsByBranchName(state,branchName))
  //return JSX
  return (
    <Box className="branch">
      <Box
        class="branch__toggleArea"
        onClick={() => setListDisplay((prev) => !prev)}
      >
        <Typography variant="button" className="branch__label">
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
        </Typography>
        <Typography variant="button">
          <b> {branchName}</b>{" "}
        </Typography>
      </Box>
      {listDisplay && <Box className='branch--open'>
        {leaves.map((item,index) => <Leaf key={index} item ={item} />)}
    </Box>}
    </Box>
  );
};
//export component
export default Branch;
