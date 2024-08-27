import { useContext } from 'react';
import styles from './Alert.module.scss';
import clsx from 'clsx';
import { LanguageContext } from '@utils/textContext';
const Alert = ({ status }) => {
  const languageContextTextAlert = useContext(LanguageContext).text.alert;
  let message = '';
  let successfulStatus = ['good', 'download', 'updateUser'];
  let failedStatus = ['bad', 'errorDownload'];
  switch (status) {
    case 'good': {
      message = languageContextTextAlert.success.load;
      break;
    }
    case 'bad': {
      message = languageContextTextAlert.failure.load;
      break;
    }
    case 'loading': {
      message = languageContextTextAlert.loading;
      break;
    }
    case 'download': {
      message = languageContextTextAlert.success.download;
      break;
    }
    case 'errorDownload': {
      message = languageContextTextAlert.failure.download;
      break;
    }
    case 'updateUser': {
      message = languageContextTextAlert.success.updateProfile;
      break;
    }
    case 'notUpdateUser': {
      message = languageContextTextAlert.failure.updateProfile;
      break;
    }
    default: {
      message = languageContextTextAlert.loading;
      break;
    }
  }

  const alertClass = clsx(
    styles.alert,
    styles.alert_slide_in,
    successfulStatus.includes(status) && styles.alert__message_good,
    failedStatus.includes(status) && styles.alert__message_bad,
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
