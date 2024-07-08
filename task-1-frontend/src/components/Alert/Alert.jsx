import { Box } from '@mui/material';

const Alert = ({ status }) => {
  const message =
    status === 'good' ? 'Images loading successful' : 'Images loading failed';

  return (
    <Box className='alert'>
      <p
        className={`alert__message ${
          status === 'good' ? 'alert__message_good' : 'alert__message_bad'
        }`}
      >
        {message}
      </p>
    </Box>
  );
};
export default Alert;
