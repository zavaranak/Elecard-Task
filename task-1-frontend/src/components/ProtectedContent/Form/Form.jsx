import { useState, useContext } from 'react';
import styles from './Form.module.scss';
import clsx from 'clsx';
import SignUpForm from './SignUpForm/SignUpForm';
import SignInForm from './SignInForm/SignInForm';
import { LanguageContext } from '@utils/textContext';
const Form = () => {
  const [signinForm, setsigninForm] = useState(true);
  const languageContextTextFormButtons =
    useContext(LanguageContext).text.form.buttons;
  return (
    <div data-testid='form' className={styles.form}>
      <div className={styles.form__header}>
        <button
          data-testid='open-sign-in-form'
          className={clsx(signinForm && styles.form__button_active)}
          type='button'
          onClick={() => setsigninForm(true)}
        >
          <h2>{languageContextTextFormButtons.signIn}</h2>
        </button>
        <button
          data-testid='open-sign-up-form'
          className={clsx(signinForm || styles.form__button_active)}
          type='button'
          onClick={() => setsigninForm(false)}
        >
          <h2>{languageContextTextFormButtons.signUpShort}</h2>
        </button>
      </div>
      {(signinForm && <SignInForm />) || <SignUpForm />}
    </div>
  );
};

export default Form;
