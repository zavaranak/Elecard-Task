import { useDispatch } from "react-redux";
import { deleteCard } from "../../slices/cardSlice";
import { Box, Grid, Divider, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FullSizeItem from "../FullSizeItem";
import { useState,useRef } from "react";
//component
const Card = ({ cardInfo, showValue }) => {
  const [displayCard, setDisplayCard] = useState (true)
  const [displayFSI, setDisplayFSI] = useState(false);
  const dispatch = useDispatch();
  const { url, name } = cardInfo;
  const cardRef = useRef()
  const handleDelete = (e) => {
    setDisplayCard(false);
    e.stopPropagation();
    setTimeout(()=>{dispatch(deleteCard(name));setDisplayCard(true)},500);
  };
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
    <Grid   item xs={2} sm={4} md={4}>
      <Box ref={cardRef} className={`card ${displayCard ? '' : 'card--deleted'}`}  onClick={() => setDisplayFSI((prev) => !prev)}>
        <img className="card__img" src={url} alt={url} />
        {showInfo && (
          <div className="card__info">
            <Divider> {showValue} </Divider>
            <Typography variant="subtitle1">{value}</Typography>
          </div>
        )}
        <Box className="card__delButton ">
          <IconButton
            onClick={(e) => handleDelete(e)}
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
