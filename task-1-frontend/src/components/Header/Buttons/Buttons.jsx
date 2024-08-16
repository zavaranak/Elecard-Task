import { useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, signOutHandler } from '@utils/firebase';
import Sun from '@icons/Sun.svg';
import Moon from '@icons/Moon.svg';
import SignOut from '@icons/SignOut.svg';
import UserProfile from './UserProfile/UserProfile';
import styles from './Buttons.module.scss';
import { languageText, LanguageContext } from '@utils/textContext';

const Buttons = () => {
  const languageContextValue = useContext(LanguageContext);
  const [darktheme, setDarktheme] = useState(
    localStorage.darktheme ? JSON.parse(localStorage.darktheme) : false
  );
  const themeHandler = () => {
    document.documentElement.classList.toggle('dark-theme');
    localStorage.setItem('darktheme', !darktheme);
    setDarktheme((prev) => !prev);
  };
  const [userState, setUserState] = useState();
  const customSignOut = () => {
    signOutHandler();
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

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserState(true);
      } else setUserState(false);
    });
  });
  return (
    <div className={styles.buttons} data-testid='buttons-header'>
      {userState && (
        <>
          <UserProfile />
          <button
            data-testid='button-sign-out'
            onClick={customSignOut}
            className={styles.buttons__item}
          >
            <SignOut />
          </button>
        </>
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
