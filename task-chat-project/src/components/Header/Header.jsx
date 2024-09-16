import styles from './Header.module.scss';
import Buttons from './Buttons/Buttons';
import { useContext } from 'react';
import { LanguageContext } from '@utils/textContext';

const Header = ({ toggleChat }) => {
  const languageContextTextHeader = useContext(LanguageContext).text.header;
  return (
    <div data-testid='header' className={styles.header}>
      <div className={styles.header__title}>
        <p>
          <b>{languageContextTextHeader.text}</b>
        </p>
      </div>
      <div className={styles.header__button}>
        <Buttons toggleChat={toggleChat} />
      </div>
    </div>
  );
};

export default Header;
