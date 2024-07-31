import { useDispatch } from 'react-redux';
import { deleteCard } from '@store/cardSlice';
import { useState, useRef } from 'react';
import CloseIcon from '@icons/CloseIcon.svg';
import ButtonDownload from '@components/ButtonDownload/ButtonDownload';
import Modal from '@components/Modal/Modal';
import styles from './Card.module.scss';
import clsx from 'clsx';

const Card = ({ cardInfo }) => {
  const [displayCard, setDisplayCard] = useState(true);
  const [displayModal, setdisplayModal] = useState(false);
  const dispatch = useDispatch();
  const { url, name, filesize, category, timestamp } = cardInfo
    ? cardInfo
    : {
        url: undefined,
        filesize: 0,
        category: '',
        timestamp: '',
        name: 'Unable to load image',
      };
  const cardRef = useRef();

  const handleDelete = (e) => {
    setDisplayCard(false);
    e.stopPropagation();
    setTimeout(() => {
      dispatch(deleteCard(name));
    }, 500);
  };

  const date = new Date(timestamp).toLocaleDateString();
  const size = (filesize / (1024 * 1024)).toFixed(2);
  const cardClass = clsx(styles.card, displayCard || styles.card_deleted);
  const buttonDelete = clsx(styles.card__button, styles.card__button_delete);
  const buttonDownload = clsx(
    styles.card__button,
    styles.card__button_download
  );

  return (
    <div data-testid='card' ref={cardRef} className={cardClass}>
      <div data-testid='card-img' className={styles.card__image}>
        <img src={url} alt={url} />
        <p
          data-testid='card-suggestion'
          onClick={() => setdisplayModal((prev) => !prev)}
          className={styles.card__image_suggested}
        >
          See full image
        </p>
      </div>
      <div data-testid='card-info' className={styles.card__info}>
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
      <div data-testid='card-name' className={styles.card__name}>
        <p>{name}</p>
      </div>
      <div
        data-testid='card-delete'
        className={buttonDelete}
        onClick={(e) => handleDelete(e)}
      >
        <CloseIcon />
      </div>
      <div className={buttonDownload}>
        <ButtonDownload url={url} name={name} />
      </div>
      <div>
        {displayModal && <Modal url={url} setDisplay={setdisplayModal} />}
      </div>
    </div>
  );
};
export default Card;
