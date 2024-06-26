import { useState } from "react";
import { Box, Typography } from "@mui/material";
import FullSizeItem from "../FullSizeItem";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
//component
const BranchItem = ({ item }) => {
  //State and logic
  const [displayFSI, setDisplayFSI] = useState(false); //FSI = Full Size Image
  const date = new Date(item.timestamp).toLocaleDateString();
  //return JSX
  return (
    <Box className="branchItem">
      <Box  onClick={() => setDisplayFSI(true)}>
        <ImageSearchIcon sx={{ padding: 2 }} color="primary" />
        <img className="branchItem__thumpnail" src={item.url} alt={item.name} />
      </Box>
      <Typography variant="overline"> {item.name}</Typography>
      <Typography variant="overline">Date: {date} </Typography>
      <Typography variant="overline">Size: {item.filesize}</Typography>
      <div>
        {displayFSI && (
          <FullSizeItem url={item.url} setDisplay={setDisplayFSI} />
        )}
      </div>
    </Box>
  );
};
//export component
export default BranchItem;
