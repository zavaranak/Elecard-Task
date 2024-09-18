import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './SignUpForm.module.scss';
import { signUpHandler, ERROR_EMAIL, ERROR } from '@utils/firebase.js';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const SignUpForm = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, watch, formState, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const { errors } = formState;
  const [patronymToggle, setPatronymToggle] = useState(true);
  const [displayPassword, setDisplayPassword] = useState(false);
  const [displayPassword2, setDisplayPassword2] = useState(false);
  const [signUpMessage, setSignUpMessage] = useState('');
  const checkPassword = (confirmedPassword) => {
    if (watch('password') !== confirmedPassword)
      return t('form.passwordConfirm.validationMatch');
  };
  useEffect(() => {
    reset();
  }, [t('value'), reset]);
  const handleVisibilityPassword = (e) => {
    e.stopPropagation();
    setDisplayPassword((prev) => !prev);
  };
  const handleVisibilityPassword2 = (e) => {
    e.stopPropagation();
    setDisplayPassword2((prev) => !prev);
  };
  const customHandleSubmit = async (data) => {
    setLoading(true);
    signUpHandler(data).then((error) => {
      console.log(error);
      if (error) {
        if (error === ERROR_EMAIL) {
          setSignUpMessage(languageContextTextForm.errors.signUp.errorEmail);
        } else if (error == ERROR) {
          setSignUpMessage(languageContextTextForm.errors.signUp.default);
        }
      }
      setLoading(false);
    });
  };
  return (
    <form
      data-testid='sign-up-form'
      onSubmit={handleSubmit(customHandleSubmit)}
    >
      <label>
        <p>{t('form.firstName.text')}</p>
        <input
          {...register('firstName', {
            required: {
              value: true,
              message: t('form.firstName.validationRequire'),
            },
            pattern: {
              value: /[A-Za-zЁёА-я]+$/g,
              message: t('form.firstName.validationPattern'),
            },
          })}
          placeholder={t('form.firstName.text')}
        />
        <p type='error'>{errors?.firstName?.message}</p>
      </label>
      <label>
        <p>{t('form.lastName.text')}</p>
        <input
          {...register('lastName', {
            required: {
              value: true,
              message: t('form.lastName.validationRequire'),
            },
            pattern: {
              value: /[A-Za-zЁёА-я]+$/g,
              message: t('form.lastName.validationPattern'),
            },
          })}
          placeholder={t('form.lastName.text')}
        />
        <p type='error'>{errors?.lastName?.message}</p>
      </label>
      <div className={styles.sign_up_form__patronym}>
        <input
          type='checkbox'
          onChange={() => setPatronymToggle((prev) => !prev)}
          checked={patronymToggle}
        />
        <label>
          <p>{t('form.patronym.text')}</p>
          <input
            {...register('patronym', {
              disabled: !patronymToggle,
              required: {
                value: patronymToggle,
                message: t('form.patronym.validationRequire'),
              },
              pattern: {
                value: /[A-Za-zЁёА-я]+$/g,
                message: t('form.patronym.validationPattern'),
              },
            })}
            placeholder={t('form.patronym.text')}
          />
          <p type='error'>{!!patronymToggle && errors?.patronym?.message}</p>
        </label>
      </div>
      <label>
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
      <label>
        <p>{t('form.password.text')}</p>
        <div className={styles.sign_up_form__password}>
          <input
            data-testid='sign-up-input-password'
            {...register('password', {
              required: {
                value: true,
                message: t('form.password.validationRequire'),
              },
              minLength: {
                value: 6,
                message: t('form.password.validationLength'),
              },
            })}
            type={displayPassword ? 'text' : 'password'}
            placeholder={t('form.password.text')}
          />{' '}
          <div
            className={styles['sign_up_form__visibility-icon']}
            onClick={handleVisibilityPassword}
          >
            {(displayPassword && <Visibility />) || <VisibilityOff />}
          </div>
        </div>

        <p type='error'>{errors?.password?.message}</p>
      </label>
      <label>
        <p>{t('form.passwordConfirm.text')}</p>
        <div className={styles.sign_up_form__password}>
          <input
            data-testid='sign-up-input-password-confirm'
            {...register('passwordConfirm', {
              required: {
                value: true,
                message: t('form.passwordConfirm.validationRequire'),
              },
              validate: checkPassword,
            })}
            type={displayPassword2 ? 'text' : 'password'}
            placeholder={t('form.passwordConfirm.text')}
          />
          <div
            className={styles['sign_up_form__visibility-icon']}
            onClick={handleVisibilityPassword2}
          >
            {(displayPassword2 && <Visibility />) || <VisibilityOff />}
          </div>
        </div>
        <p type='error'>{errors?.passwordConfirm?.message}</p>
      </label>
      <p type='main-error'>{signUpMessage}</p>
      <input
        disabled={loading}
        type='submit'
        value={t('form.buttons.signUp')}
      />
    </form>
  );
};

export default SignUpForm;
