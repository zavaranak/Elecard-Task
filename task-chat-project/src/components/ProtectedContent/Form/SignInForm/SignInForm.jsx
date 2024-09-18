import { useForm } from 'react-hook-form';
import styles from './SignInForm.module.scss';
import { signInHandler } from '@utils/firebase.js';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Loading from '@components/Loading/Loading';
import { useTranslation } from 'react-i18next';

const SignUpForm = () => {
  const { t } = useTranslation();
  const [signInMessage, setSignInMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [displayPassword, setDisplayPassword] = useState(false);
  const { register, handleSubmit, formState, setFocus } = useForm();
  const { errors } = formState;
  const handleVisibilityPassword = (e) => {
    e.stopPropagation();
    setDisplayPassword((prev) => !prev);
  };
  const customHandleSubmit = async (data) => {
    setIsLoading(true);
    await signInHandler(data).then((error) => {
      setIsLoading(false);
      if (error) {
        setSignInMessage(t('form.errors.signIn.default'));
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
        <p>{t('form.email.text')}</p>
        <input
          {...register('email', {
            required: {
              value: true,
              message: t('form.email.validationRequire'),
            },
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: t('form.email.validationPattern'),
            },
          })}
          placeholder={t('form.email.text')}
        />
        <p type='error'>{errors?.email?.message}</p>
      </label>
      <label className={styles.sign_in_form__label_sign_in}>
        <p>{t('form.password.text')}</p>
        <div className={styles.sign_in_form__password}>
          <input
            data-testid='sign-in-input-password'
            {...register('password', {
              required: {
                value: true,
                message: t('form.password.validationRequire'),
              },
            })}
            type={displayPassword ? 'text' : 'password'}
            placeholder={t('form.password.text')}
          />
          <div
            className={styles['sign_in_form__visibility-icon']}
            onClick={handleVisibilityPassword}
          >
            {(displayPassword && <Visibility />) || <VisibilityOff />}
          </div>
        </div>
        <p type='error'>{errors?.password?.message}</p>
      </label>
      <p type='main-error'>{signInMessage}</p>
      <input
        disabled={isLoading}
        type='submit'
        value={t('form.buttons.signIn')}
      />
      {isLoading && <Loading size='medium' />}
    </form>
  );
};

export default SignUpForm;
