import { useEffect } from 'react';
import CloseIcon from '@icons/CloseIcon.svg';
import styles from './Modal.module.scss';

const Modal = ({ url, setDisplay }) => {
  useEffect(() => {
    const keyDownHandler = (e) => {
      if (e.key === 'Escape') {
        if (setDisplay) setDisplay(false);
      }
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', keyDownHandler);
    };
  });
  const closeHandler = (e) => {
    if (setDisplay) setDisplay(false);
    e.stopPropagation;
  };
  return (
    <div
      className={styles.modal}
      data-testid={'modal'}
      onKeyDown={closeHandler}
    >
      <div className={styles.modal__content_box} data-testid={'modal-content'}>
        <img src={url} alt={url ? url : 'Invalid image source'} />

        <button
          data-testid={'modal-close-button'}
          className={styles.modal__close_button}
          onClick={closeHandler}
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

export default Modal;
