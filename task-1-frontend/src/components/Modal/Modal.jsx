import { Box, IconButton } from '@mui/material';
import { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import styles from './Modal.module.scss';

const Modal = ({ url, setDisplay }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  return (
    <Box className={styles.modal}>
      <Box className={styles.modal__content_box}>
        <img src={url} alt={url} />
        <Box className={styles.modal__del_button}>
          <IconButton
            size='small'
            color='error'
            onClick={(e) => {
              setDisplay(false);
              e.stopPropagation;
            }}
          >
            <CloseIcon fontSize='large' />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Modal;
