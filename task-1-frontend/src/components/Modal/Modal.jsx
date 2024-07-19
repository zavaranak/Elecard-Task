import { useEffect } from 'react';
import CloseIcon from '../SvgIcon/CloseIcon/CloseIcon';
import styles from './Modal.module.scss';

const Modal = ({ url, setDisplay }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  return (
    <div className={styles.modal}>
      <div className={styles.modal__content_box}>
        <img src={url} alt={url} />

        <button
          className={styles.modal__del_button}
          onClick={(e) => {
            setDisplay(false);
            e.stopPropagation;
          }}
        >
          <CloseIcon size={50} />
        </button>
      </div>
    </div>
  );
};

export default Modal;
