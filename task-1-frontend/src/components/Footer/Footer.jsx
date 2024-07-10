import { Box, Typography } from '@mui/material';
import styles from './Footer.module.scss';
const Footer = () => {
  return (
    <Box className={styles.footer}>
      <Box>
        <Typography variant='button' align='center'>
          <b>&copy; 2024 Frontend with React by Dang</b>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
