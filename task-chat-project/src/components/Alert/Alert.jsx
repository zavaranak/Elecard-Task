import styles from './Alert.module.scss';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
const Alert = ({ status }) => {
  const { t } = useTranslation();
  let message = '';
  let successfulStatus = ['good', 'download', 'updateUser'];
  let failedStatus = ['bad', 'errorDownload'];
  switch (status) {
    case 'good': {
      message = t('alert.success.load');
      break;
    }
    case 'bad': {
      message = t('alert.failure.load');
      break;
    }
    case 'loading': {
      message = t('alert.loading');
      break;
    }
    case 'updateUser': {
      message = t('alert.success.updateProfile');
      break;
    }
    case 'notUpdateUser': {
      message = t('alert.failure.updateProfile');
      break;
    }
    case 'newMessage': {
      message = t('alert.message.new');
      break;
    }
    default: {
      message = t('alert.loading');
      break;
    }
  }

  const alertClass = clsx(
    styles.alert,
    styles.alert_slide_in,
    successfulStatus.includes(status) && styles.alert__message_good,
    failedStatus.includes(status) && styles.alert__message_bad,
    (status === 'download' || status === 'errorDownload') &&
      styles.alert_download,
    status === 'newMessage' && styles.alert__new_message
  );
  return (
    <div className={alertClass} data-testid={'alert'}>
      <p data-testid={'alert-message'}>{message}</p>
    </div>
  );
};
export default Alert;
