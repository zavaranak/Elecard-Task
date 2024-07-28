import styles from './Alert.module.scss';
import clsx from 'clsx';
const Alert = ({ status }) => {
  const goodStatus = status === 'good';
  const badStatus = status === 'bad';
  const loadingStatus = status === 'loading';
  const downloadStatus = status === 'download';
  const errorDownloadStatus = status === 'errorDownload';
  const message = goodStatus
    ? 'Images loading successful'
    : badStatus
    ? 'Images loading failed'
    : loadingStatus
    ? 'Loading images'
    : downloadStatus
    ? 'Start downloading'
    : errorDownloadStatus
    ? 'Unable to download'
    : 'Loading error';
  const messageClass = clsx(
    styles.alert__message,
    goodStatus && styles.alert__message_good,
    (badStatus || errorDownloadStatus) && styles.alert__message_bad
  );
  const alertClass = clsx(
    styles.alert,
    (downloadStatus || errorDownloadStatus) && styles.alert_download
  );
  return (
    <div className={alertClass} data-testid={'alert'}>
      <p data-testid={'alert-message'} className={messageClass}>
        {message}
      </p>
    </div>
  );
};
export default Alert;
