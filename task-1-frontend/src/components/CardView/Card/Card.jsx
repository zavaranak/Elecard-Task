import { useDispatch, useSelector } from "react-redux";
import { deleteCard,selectOrder } from "../../../store/cardSlice"
import { Box, Grid, Divider, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "../../Modal/Modal";
import { useState,useRef } from "react";
//component
const Card = ({ cardInfo, showValue }) => {
  const [displayCard, setDisplayCard] = useState (true)
  const [displayModal, setdisplayModal] = useState(false);
  const dispatch = useDispatch();
  const { url, name } = cardInfo;
  const cardRef = useRef()
  const handleDelete = (e) => {
    setDisplayCard(false);
    e.stopPropagation();
    setTimeout(()=>{dispatch(deleteCard(name));setDisplayCard(true)},300);
  };
  const order = '[' + useSelector(selectOrder) + ' order] '
  let showInfo = false
  let sortBy = ''
  let category
  if(showValue[1] && showValue[1]!=='default') {category = 'Category: ' + showValue[1]; showInfo=true}
  switch (showValue[0]) {
    case "timestamp": {
      showInfo = true;
      let sort = new Date(cardInfo[showValue[0]]).toLocaleDateString();
      sortBy = order + " Date: " + sort.toString();
      break;
    }
    case "name": {
      sortBy = order + " Name: " + cardInfo[showValue[0]];
      showInfo = true;
      break;
    }
    case "filesize": {
      sortBy =  order + " Size: " + cardInfo[showValue[0]];
      showInfo = true;
      break;
    }
  }
  //return JSX
  return (
    <Grid   item xs={2} sm={4} md={4}>
      <Box ref={cardRef} className={`card ${displayCard ? '' : 'card--deleted'}`}>
        <img onClick={() => setdisplayModal((prev) => !prev)} className="card__img" src={url} alt={url} />
        {showInfo && (
          <div className="card__info">
            <Divider />
            <Typography variant="overline">{sortBy}</Typography>
            <Typography variant="overline">{category}</Typography>
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
        {displayModal && (
          <Modal url={url} setDisplay={setdisplayModal} />
        )}
      </div>
    </Grid>
  );
};
//export component
export default Card;
