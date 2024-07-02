import { useDispatch,  } from "react-redux";
import { deleteCard,  } from "../../../store/cardSlice";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "../../Modal/Modal";
import { useState, useRef } from "react";

const Card = ({ cardInfo }) => {
  const [displayCard, setDisplayCard] = useState(true);
  const [displayModal, setdisplayModal] = useState(false);
  const dispatch = useDispatch();
  const { url, name, filesize,category,timestamp } = cardInfo;
  const cardRef = useRef();
  const handleDelete = (e) => {
    setDisplayCard(false);
    e.stopPropagation();
    setTimeout(() => {
      dispatch(deleteCard(name));
      setDisplayCard(true);
    }, 500);
  };
  const date = new Date(timestamp).toLocaleDateString()
  const size = (filesize / (1024*1024)).toFixed(2)
  return (
    <Grid item xs={2} sm={4} md={4}>
      <div
        ref={cardRef}
        className={`card ${displayCard ? "" : "card_deleted"}`}
      >
        <img
          onClick={() => setdisplayModal((prev) => !prev)}
          className="card__image"
          src={url}
          alt={url}
        />
        <div className="card__info">
          <div><Typography variant="caption">{date}</Typography></div>
          <div><Typography variant="caption"><b>{category}</b></Typography></div>
          <div><Typography variant="caption">{size} MB</Typography></div>
          <div className="card__break"></div>
          <div className="card__name"><Typography color="primary" align="center" variant="caption">{name}</Typography></div>
        </div>
        <Box className="card__del_button ">
          <IconButton onClick={(e) => handleDelete(e)} color="primary">
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </div>
      <div>
        {displayModal && <Modal url={url} setDisplay={setdisplayModal} />}
      </div>
    </Grid>
  );
};
export default Card;
