import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
//component
const FullSizeItem = ({ url,setDisplay }) => {
  return (
    <Box className="fullSizeItem">
      <img src={url} alt={url} />
      <Box className="fullSizeItem__itemInfo">
        <IconButton size="large" color="error" onClick={(e)=>{setDisplay(false);e.stopPropagation}}>
          <CloseIcon fontSize="large"/>
        </IconButton>
      </Box>
    </Box>
  );
};
//export component
export default FullSizeItem;
