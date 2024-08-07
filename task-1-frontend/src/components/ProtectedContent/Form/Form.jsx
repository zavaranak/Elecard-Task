import { useState } from 'react';
import styles from './Form.module.scss';
import clsx from 'clsx';
import SignUpForm from './SignUpForm/SignUpForm';
import SignInForm from './SignInForm/SignInForm';
const Form = () => {
  const [signinForm, setsigninForm] = useState(true);

  return (
    <div className={styles.form}>
      <div className={styles.form__header}>
        <button
          className={clsx(signinForm && styles.form__button_active)}
          type='button'
          onClick={() => setsigninForm(true)}
        >
          <h2>Sign in</h2>
        </button>
        <button
          className={clsx(signinForm || styles.form__button_active)}
          type='button'
          onClick={() => setsigninForm(false)}
        >
          <h2>Sign up</h2>
        </button>
      </div>
      {(signinForm && <SignInForm />) || <SignUpForm />}
    </div>
  );
};

export default Form;
