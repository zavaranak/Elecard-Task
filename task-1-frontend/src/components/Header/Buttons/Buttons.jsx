import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, signOutHandler } from '@utils/firebase';
import Sun from '@icons/Sun.svg';
import Moon from '@icons/Moon.svg';
import SignOut from '@icons/SignOut.svg';
import UserProfile from './UserProfile/UserProfile';
import styles from './Buttons.module.scss';

const ButtonDarkMode = () => {
  const [darktheme, setDarktheme] = useState(
    localStorage.darktheme ? JSON.parse(localStorage.darktheme) : false
  );
  const themeHandler = () => {
    document.documentElement.classList.toggle('dark-theme');
    localStorage.setItem('darktheme', !darktheme);
    setDarktheme((prev) => !prev);
  };
  const [userState, setUserState] = useState();

  useEffect(() => {
    setTimeout(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) setUserState(true);
        else setUserState(false);
      });
    }, 500);
  });
  return (
    <div className={styles.buttons}>
      {userState && (
        <>
          <UserProfile />
          <button
            data-testid='taskbar-darkmode'
            className={styles.buttons__item}
          >
            <SignOut onClick={signOutHandler} />
          </button>
        </>
      )}
      <button
        data-testid='taskbar-darkmode'
        className={styles.buttons__item}
        onClick={themeHandler}
      >
        {(darktheme && (
          <Sun
            data-testid='taskbar-sun'
            className={styles.buttons__item_clicked}
          />
        )) || <Moon className={styles.buttons__item_clicked} />}
      </button>
    </div>
  );
};

export default ButtonDarkMode;
