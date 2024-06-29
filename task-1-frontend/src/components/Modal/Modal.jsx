import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
//component
const Modal = ({ url, setDisplay }) => {
  return (
    <Box className="modal">
      <Box className="modal__contentBox">
        <img src={url} alt={url} />
        <Box className="modal__delButton">
          <IconButton
            size="large"
            color="error"
            onClick={(e) => {
              setDisplay(false);
              e.stopPropagation;
            }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
//export component
export default Modal;
