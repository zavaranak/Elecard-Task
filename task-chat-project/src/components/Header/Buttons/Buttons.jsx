import { useState, useContext } from 'react';
import Sun from '@icons/Sun.svg';
import Moon from '@icons/Moon.svg';
import UserProfile from './UserProfile/UserProfile';
import styles from './Buttons.module.scss';
import { languageText, LanguageContext } from '@utils/textContext';
import { useSelector } from 'react-redux';
import { selectUserAuthState } from '@store/userSlice';

const Buttons = () => {
  const authState = useSelector(selectUserAuthState);
  const languageContextValue = useContext(LanguageContext);
  const [darktheme, setDarktheme] = useState(
    localStorage.darktheme ? JSON.parse(localStorage.darktheme) : false
  );
  const themeHandler = () => {
    document.documentElement.classList.toggle('dark-theme');
    localStorage.setItem('darktheme', !darktheme);
    setDarktheme((prev) => !prev);
  };
  const languageSwitchingHandler = () => {
    if (languageContextValue.text.value === 'en') {
      languageContextValue.setText(languageText.ru);
      localStorage.setItem('lang', 'ru');
    } else if (languageContextValue.text.value === 'ru') {
      languageContextValue.setText(languageText.en);
      localStorage.setItem('lang', 'en');
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
        {languageContextValue.text.value}
      </div>
    </div>
  );
};

export default Buttons;
