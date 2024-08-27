import { useForm } from 'react-hook-form';
import styles from './SignInForm.module.scss';
import { signInHandler } from '@utils/firebase.js';
import { useState, useContext } from 'react';
import { LanguageContext } from '@utils/textContext';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const SignUpForm = () => {
  const languageContextTextForm = useContext(LanguageContext).text.form;
  const [signInMessage, setSignInMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [displayPassword, setDisplayPassword] = useState(false);
  const { register, handleSubmit, formState, setFocus } = useForm();
  const { errors } = formState;
  const handleVisibilityPassword = (e) => {
    e.stopPropagation();
    setDisplayPassword((prev) => !prev);
  };
  const customHandleSubmit = async (data) => {
    setLoading(true);
    await signInHandler(data).then((error) => {
      setLoading(false);
      if (error) {
        setSignInMessage(languageContextTextForm.errors.signIn.default);
        setFocus('email');
      }
    });
  };

  return (
    <form
      data-testid='sign-in-form'
      onSubmit={handleSubmit(customHandleSubmit)}
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
        <div className={styles.sign_in_form__password}>
          <input
            data-testid='sign-in-input-password'
            {...register('password', {
              required: {
                value: true,
                message: languageContextTextForm.password.validationRequire,
              },
            })}
            type={displayPassword ? 'text' : 'password'}
            placeholder={languageContextTextForm.password.text}
          />
          <div
            className={styles.sign_in_form__visibility_icon}
            onClick={handleVisibilityPassword}
          >
            {(displayPassword && <Visibility />) || <VisibilityOff />}
          </div>
        </div>
        <p type='error'>{errors?.password?.message}</p>
      </label>
      <p type='main-error'>{signInMessage}</p>
      <input
        disabled={loading}
        type='submit'
        value={languageContextTextForm.buttons.signIn}
      />
    </form>
  );
};

export default SignUpForm;
