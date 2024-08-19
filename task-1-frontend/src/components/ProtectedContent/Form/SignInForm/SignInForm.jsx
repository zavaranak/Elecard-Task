import { useForm } from 'react-hook-form';
import styles from './SignInForm.module.scss';
import { signInHandler } from '@utils/firebase.js';
import { useState, useContext } from 'react';
import { LanguageContext } from '@utils/textContext';

const SignUpForm = () => {
  const languageContextTextForm = useContext(LanguageContext).text.form;
  const [signInMessage, setSignInMessage] = useState('');
  const { register, handleSubmit, formState, setFocus } = useForm();
  const { errors } = formState;
  return (
    <form
      data-testid='sign-in-form'
      onSubmit={handleSubmit(async (data) => {
        await signInHandler(data).then((error) => {
          if (error)
            setSignInMessage(languageContextTextForm.errors.signIn.default);
          setFocus('email');
        });
      })}
    >
      <label className={styles.sign_in_form__label_sign_in}>
        <p>{languageContextTextForm.email.text}</p>
        <input
          {...register('email', {
            required: {
              value: true,
              message: languageContextTextForm.email.validationRequire,
            },
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: languageContextTextForm.email.validationPattern,
            },
          })}
          placeholder={languageContextTextForm.email.text}
        />
        <p type='error'>{errors?.email?.message}</p>
      </label>
      <label className={styles.sign_in_form__label_sign_in}>
        <p>{languageContextTextForm.password.text}</p>
        <input
          data-testid='sign-in-input-password'
          {...register('password', {
            required: {
              value: true,
              message: languageContextTextForm.password.validationRequire,
            },
          })}
          type='password'
          placeholder={languageContextTextForm.password.text}
        />
        <p type='error'>{errors?.password?.message}</p>
      </label>
      <p type='main-error'>{signInMessage}</p>
      <input type='submit' value={languageContextTextForm.buttons.signIn} />
    </form>
  );
};

export default SignUpForm;
