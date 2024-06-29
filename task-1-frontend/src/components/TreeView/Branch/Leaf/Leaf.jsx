import { useState } from "react";
import { Box, Typography } from "@mui/material";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import Modal from "../../../Modal/Modal";
//component
const Leaf = ({ item }) => {
  //State and logic
  const [displayModal, setdisplayModal] = useState(false); //FSI = Full Size Image
  const date = new Date(item.timestamp).toLocaleDateString();
  //return JSX
  return (
    <Box className="leaf">
      <Box  className="leaf__image" onClick={() => setdisplayModal(true)}>
        <ImageSearchIcon sx={{ padding: 2 }} color="primary" />
        <img className="leaf__thumpnail" src={item.url} alt={item.name} />
      </Box>
      <Box className="leaf__info">
      <Typography variant="overline"><b>{item.name}</b> </Typography>
      <Typography variant="overline">Date: {date} </Typography>
      <Typography variant="overline">Size: {item.filesize}</Typography>
      </Box>
      <div>
        {displayModal && (
          <Modal url={item.url} setDisplay={setdisplayModal} />
        )}
      </div>
    </Box>
  );
};
//export component
export default Leaf;
