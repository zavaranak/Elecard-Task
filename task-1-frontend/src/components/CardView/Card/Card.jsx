import { useDispatch } from 'react-redux';
import { deleteCard } from '../../../store/cardSlice';
import CloseIcon from '../../SvgIcon/CloseIcon/CloseIcon';
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
    <div ref={cardRef} className={cardClass}>
      <div className={styles.card__image}>
        <img src={url} alt={url} />
        <p
          onClick={() => setdisplayModal((prev) => !prev)}
          className={styles.card__image_suggested}
        >
          See full image
        </p>
      </div>
      <div className={styles.card__info}>
        <div>
          <p>{date}</p>
        </div>
        <div>
          <p>
            <b>{category}</b>
          </p>
        </div>
        <div>
          <p>{size} MB</p>
        </div>
      </div>
      <div className={styles.card__name}>
        <p>{name}</p>
      </div>
      <div className={styles.card__del_button}>
        <div
          onClick={(e) => handleDelete(e)}
          style={{ color: 'var(--border-color)' }}
        >
          <CloseIcon size={30} />
        </div>
      </div>
      <div>
        {displayModal && <Modal url={url} setDisplay={setdisplayModal} />}
      </div>
    </div>
  );
};
export default Card;
