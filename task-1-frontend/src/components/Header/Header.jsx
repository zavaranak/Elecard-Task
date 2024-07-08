import { Box, Typography } from '@mui/material';

const Header = () => {
  return (
    <Box className='header'>
      <div className='header__title'>
        <Typography variant='button'>
          <b>Challenge CW 2023 (frontend)</b>
        </Typography>
      </div>
    </Box>
  );
};

export default Header;
