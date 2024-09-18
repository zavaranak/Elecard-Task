import { useState, useContext, useCallback, useEffect } from 'react';
import Sun from '@icons/Sun.svg';
import Moon from '@icons/Moon.svg';
import UserProfile from './UserProfile/UserProfile';
import styles from './Buttons.module.scss';
import { useSelector } from 'react-redux';
import { selectUserAuthState } from '@store/userSlice';
import { useTranslation } from 'react-i18next';
import '@utils/i18next';

const Buttons = () => {
  const { t, i18n } = useTranslation();
  const authState = useSelector(selectUserAuthState);
  const [darktheme, setDarktheme] = useState(
    localStorage.darktheme ? JSON.parse(localStorage.darktheme) : false
  );
  const themeHandler = () => {
    document.documentElement.classList.toggle('dark-theme');
    localStorage.setItem('darktheme', !darktheme);
    setDarktheme((prev) => !prev);
  };
  const languageSwitchingHandler = () => {
    if (t('value') === 'ru') {
      i18n.changeLanguage('en');
    } else if (t('value') === 'en') {
      i18n.changeLanguage('ru');
    }
  };

  return (
    <div className={styles.buttons} data-testid='buttons-header'>
      {authState === 'passed' && (
        <div className={styles.buttons__item}>
          <UserProfile />
        </div>
      )}
      <button
        data-testid='button-darkmode'
        className={styles.buttons__item}
        onClick={themeHandler}
      >
        {(darktheme && (
          <Sun
            data-testid='button-sun'
            className={styles.buttons__item_clicked}
          />
        )) || <Moon className={styles.buttons__item_clicked} />}
      </button>
      <div
        className={styles.buttons__lang_button}
        onClick={languageSwitchingHandler}
        data-testid='button-language'
      >
        {t('value')}
      </div>
    </div>
  );
};

export default Buttons;
