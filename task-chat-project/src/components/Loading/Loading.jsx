import { useContext } from 'react';
import { LanguageContext } from '@utils/textContext';
import styles from './Loading.module.scss';
import clsx from 'clsx';

const Loading = ({ size, spinOnly }) => {
  const languageContextProtedtedContent = useContext(LanguageContext).text;
  const classLoading = clsx(styles.loading, styles[`loading_${size}`]);
  return (
    <div data-testid='loading' className={classLoading}>
      <div className={styles.loading_spin}></div>
      {spinOnly || (
        <div className={styles.loading_text}>
          {languageContextProtedtedContent.loading}
        </div>
      )}
    </div>
  );
};

export default Loading;
