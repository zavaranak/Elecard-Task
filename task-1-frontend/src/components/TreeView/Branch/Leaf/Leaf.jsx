import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Modal from "../../../Modal/Modal";

const Leaf = ({ item }) => {
  const [displayModal, setdisplayModal] = useState(false);
  const date = new Date(item.timestamp).toLocaleDateString();
  const size = item.filesize / (1024 * 1024);
  return (
    <Box className="leaf">
      <Box className="leaf__image" onClick={() => {setdisplayModal(true)}}>
        <img className="leaf__thumpnail" src={item.url} alt={item.name} />
      </Box>
      <Box className="leaf__name"><Typography variant="subtitile2">
        <b>{item.name}</b>
      </Typography></Box>
      
      <Box className="leaf__info">
        <Typography variant="caption">Date: {date} </Typography>
        <Typography variant="caption">Size: {size.toFixed(2)}MB</Typography>
      </Box>
      <div>
        {displayModal && <Modal url={item.url} setDisplay={setdisplayModal}/>}
      </div>
    </Box>
  );
};

export default Leaf;
