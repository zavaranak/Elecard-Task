import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Modal from "../Modal";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
//component
const BranchItem = ({ item }) => {
  //State and logic
  const [displayModal, setdisplayModal] = useState(false); //FSI = Full Size Image
  const date = new Date(item.timestamp).toLocaleDateString();
  //return JSX
  return (
    <Box className="branchItem">
      <Box  onClick={() => setdisplayModal(true)}>
        <ImageSearchIcon sx={{ padding: 2 }} color="primary" />
        <img className="branchItem__thumpnail" src={item.url} alt={item.name} />
      </Box>
      <Typography variant="overline"> {item.name}</Typography>
      <Typography variant="overline">Date: {date} </Typography>
      <Typography variant="overline">Size: {item.filesize}</Typography>
      <div>
        {displayModal && (
          <Modal url={item.url} setDisplay={setdisplayModal} />
        )}
      </div>
    </Box>
  );
};
//export component
export default BranchItem;
