import styles from './Alert.module.scss';
import clsx from 'clsx';
const Alert = ({ status }) => {
  const goodStatus = status === 'good';
  const badStatus = status === 'bad';
  const loadingStatus = status === 'loading';
  const message = goodStatus
    ? 'Images loading successful'
    : badStatus
    ? 'Images loading failed'
    : loadingStatus
    ? 'Loading images'
    : '';
  const messageClass = clsx(
    styles.alert__message,
    goodStatus && styles.alert__message_good,
    badStatus && styles.alert__message_bad,
    loadingStatus && styles.alert__message_loading
  );
  return (
    <div className={styles.alert}>
      <p className={messageClass}>{message}</p>
    </div>
  );
};
export default Alert;
