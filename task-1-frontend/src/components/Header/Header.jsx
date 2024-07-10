import { Box, Typography } from '@mui/material';
import styles from './Header.module.scss';
const Header = () => {
  return (
    <Box className={styles.header}>
      <div className={styles.header__title}>
        <Typography variant='button'>
          <b>Challenge CW 2023 (frontend)</b>
        </Typography>
      </div>
    </Box>
  );
};

export default Header;
