import styles from './Alert.module.scss';
import clsx from 'clsx';
const Alert = ({ status }) => {
  let message = '';
  switch (status) {
    case 'good': {
      message = 'Images loading successful';
      break;
    }
    case 'bad': {
      message = 'Images loading failed';
      break;
    }
    case 'loading': {
      message = 'Loading images';
      break;
    }
    case 'download': {
      message = 'Start downloading';
      break;
    }
    case 'errorDownload': {
      message = 'Unable to download';
      break;
    }
    default: {
      message = 'Loading error';
      break;
    }
  }

  const alertClass = clsx(
    styles.alert,
    status === 'good' && styles.alert__message_good,
    (status === 'bad' || status === 'errorDownload') &&
      styles.alert__message_bad,
    (status === 'download' || status === 'errorDownload') &&
      styles.alert_download
  );
  return (
    <div className={alertClass} data-testid={'alert'}>
      <p data-testid={'alert-message'}>{message}</p>
    </div>
  );
};
export default Alert;
