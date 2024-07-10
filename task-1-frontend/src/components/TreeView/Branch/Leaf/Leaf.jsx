import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Modal from '../../../Modal/Modal';
import styles from './Leaf.module.scss';

const Leaf = ({ item }) => {
  const [displayModal, setdisplayModal] = useState(false);
  const date = new Date(item.timestamp).toLocaleDateString();
  const size = item.filesize / (1024 * 1024);
  return (
    <Box className={styles.leaf}>
      <Box
        className={styles.leaf__image}
        onClick={() => {
          setdisplayModal(true);
        }}
      >
        <img
          className={styles.leaf__thumpnail}
          src={item.url}
          alt={item.name}
        />
      </Box>
      <Box className={styles.leaf__name}>
        <Typography sx={{ color: '#004dbb' }} variant='subtitile2'>
          {item.name}
        </Typography>
      </Box>

      <Box className={styles.leaf__info}>
        <Typography variant='caption'>Date: {date} </Typography>
        <Typography variant='caption'>Size: {size.toFixed(2)}MB</Typography>
      </Box>
      <div>
        {displayModal && <Modal url={item.url} setDisplay={setdisplayModal} />}
      </div>
    </Box>
  );
};

export default Leaf;
