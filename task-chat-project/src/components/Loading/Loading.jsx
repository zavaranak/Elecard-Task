import { useTranslation } from 'react-i18next';
import styles from './Loading.module.scss';
import clsx from 'clsx';

const Loading = ({ size, spinOnly }) => {
  const { t } = useTranslation();
  const classLoading = clsx(styles.loading, styles[`loading_${size}`]);
  return (
    <div data-testid='loading' className={classLoading}>
      <div className={styles.loading_spin}></div>
      {spinOnly || <div className={styles.loading_text}>{t('loading')}</div>}
    </div>
  );
};

export default Loading;
