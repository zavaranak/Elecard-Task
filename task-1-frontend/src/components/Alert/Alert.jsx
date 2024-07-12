import { Box, Typography } from '@mui/material';
import styles from './Alert.module.scss';
import clsx from 'clsx';
const Alert = ({ status }) => {
  const goodStatus = status === 'good';
  const badStatus = status === 'bad';
  const message = goodStatus
    ? 'Images loading successful'
    : badStatus
    ? 'Images loading failed'
    : '';
  const messageClass = clsx(
    styles.alert__message,
    goodStatus && styles.alert__message_good,
    badStatus && styles.alert__message_bad
  );
  return (
    <Box className={styles.alert}>
      <Typography variant='button' className={messageClass}>
        <b>{message}</b>
      </Typography>
    </Box>
  );
};
export default Alert;
