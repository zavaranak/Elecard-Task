import { useDispatch } from "react-redux";
import { deleteCard } from "../../slices/cardSlice";
import { Box, Grid, Divider, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FullSizeItem from "../FullSizeItem";
import { useState } from "react";
//component
const Card = ({ cardInfo, showValue }) => {
  const [displayFSI, setDisplayFSI] = useState(false);
  const dispatch = useDispatch();
  const { url, name } = cardInfo;
  let showInfo;
  let value;
  switch (showValue) {
    case "timestamp": {
      showInfo = true;
      value = new Date(cardInfo[showValue]).toLocaleDateString();
      showValue = "Date";
      break;
    }
    case "name": {
      value = cardInfo[showValue];
      showValue = "Name";
      showInfo = true;
      break;
    }
    case "filesize": {
      value = cardInfo[showValue];
      showValue = "Size";
      showInfo = true;
      break;
    }
    case "category": {
      value = cardInfo[showValue];
      showValue = "Category";
      showInfo = true;
      break;
    }
    default: {
      showInfo = false;
    }
  }
  //return JSX
  return (
    <Grid item xs={2} sm={4} md={4}>
      <Box className="card" onClick={() => setDisplayFSI((prev) => !prev)}>
        <img className="card__img" src={url} alt={url} />
        {showInfo && (
          <div className="card__info">
            <Divider> {showValue} </Divider>
            <Typography variant="subtitle1">{value}</Typography>
          </div>
        )}
        <Box className="card__delButton ">
          <IconButton
            onClick={(e) => {
              if (!displayFSI) dispatch(deleteCard(name));
              e.stopPropagation();
            }}
            color="primary"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      <div>
        {displayFSI && (
          <FullSizeItem url={url} setDisplay={setDisplayFSI} />
        )}
      </div>
    </Grid>
  );
};
//export component
export default Card;
