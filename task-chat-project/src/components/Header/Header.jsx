import styles from './Header.module.scss';
import Buttons from './Buttons/Buttons';
import { useTranslation } from 'react-i18next';

const Header = ({ toggleChat }) => {
  const { t } = useTranslation();
  return (
    <div data-testid='header' className={styles.header}>
      <div className={styles.header__title}>
        <p>
          <b>{t('header.text')}</b>
        </p>
      </div>
      <div className={styles.header__button}>
        <Buttons toggleChat={toggleChat} />
      </div>
    </div>
  );
};

export default Header;
