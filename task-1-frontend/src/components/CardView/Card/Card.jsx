import { useDispatch } from 'react-redux';
import { deleteCard } from '../../../store/cardSlice';
import { Box, Grid, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '../../Modal/Modal';
import { useState, useRef } from 'react';
import styles from './Card.module.scss';
import clsx from 'clsx';

const Card = ({ cardInfo }) => {
  const [displayCard, setDisplayCard] = useState(true);
  const [displayModal, setdisplayModal] = useState(false);
  const dispatch = useDispatch();
  const { url, name, filesize, category, timestamp } = cardInfo;
  const cardRef = useRef();
  const handleDelete = (e) => {
    setDisplayCard(false);
    e.stopPropagation();
    setTimeout(() => {
      dispatch(deleteCard(name));
      setDisplayCard(true);
    }, 500);
  };
  const date = new Date(timestamp).toLocaleDateString();
  const size = (filesize / (1024 * 1024)).toFixed(2);
  const cardClass = clsx(styles.card, displayCard || styles.card_deleted);
  return (
    <Grid item xs={1.9} sm={3.9} md={3.9}>
      <div ref={cardRef} className={cardClass}>
        <div className={styles.card__image}>
          <img src={url} alt={url} />
          <Typography
            variant='button'
            onClick={() => setdisplayModal((prev) => !prev)}
            className={styles.card__image_suggested}
          >
            See full image
          </Typography>
        </div>
        <div className={styles.card__info}>
          <div>
            <Typography variant='caption'>{date}</Typography>
          </div>
          <div>
            <Typography variant='caption'>
              <b>{category}</b>
            </Typography>
          </div>
          <div>
            <Typography variant='caption'>{size} MB</Typography>
          </div>
          <div className={styles.card__break}></div>
          <div className={styles.card__name}>
            <Typography color='primary' align='center' variant='button'>
              {name}
            </Typography>
          </div>
        </div>
        <Box className={styles.card__del_button}>
          <IconButton
            onClick={(e) => handleDelete(e)}
            sx={{ color: '#00b0b0' }}
          >
            <CloseIcon fontSize='small' />
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
