import { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { LanguageContext } from '@utils/textContext';
import styles from './SignUpForm.module.scss';
import { signUpHandler, ERROR_EMAIL, ERROR } from '@utils/firebase.js';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const SignUpForm = () => {
  const { register, handleSubmit, watch, formState, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const { errors } = formState;
  const [patronymToggle, setPatronymToggle] = useState(true);
  const [displayPassword, setDisplayPassword] = useState(false);
  const [displayPassword2, setDisplayPassword2] = useState(false);
  const [signUpMessage, setSignUpMessage] = useState('');
  const languageContextTextForm = useContext(LanguageContext).text.form;
  const checkPassword = (confirmedPassword) => {
    if (watch('password') !== confirmedPassword)
      return languageContextTextForm.passwordConfirm.validationMatch;
  };
  useEffect(() => {
    reset();
  }, [languageContextTextForm, reset]);

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
      if (error)
        if (error === ERROR_EMAIL)
          setSignUpMessage(languageContextTextForm.errors.signUp.errorEmail);
        else if (error == ERROR)
          setSignUpMessage(languageContextTextForm.errors.signUp.default);
      setLoading(false);
    });
  };
  return (
    <form
      data-testid='sign-up-form'
      onSubmit={handleSubmit(customHandleSubmit)}
    >
      <label>
        <p>{languageContextTextForm.firstName.text}</p>
        <input
          {...register('firstName', {
            required: {
              value: true,
              message: languageContextTextForm.firstName.validationRequire,
            },
            pattern: {
              value: /[A-Za-zЁёА-я]+$/g,
              message: languageContextTextForm.firstName.validationPattern,
            },
          })}
          placeholder={languageContextTextForm.firstName.text}
        />
        <p type='error'>{errors?.firstName?.message}</p>
      </label>
      <label>
        <p>{languageContextTextForm.lastName.text}</p>
        <input
          {...register('lastName', {
            required: {
              value: true,
              message: languageContextTextForm.lastName.validationRequire,
            },
            pattern: {
              value: /[A-Za-zЁёА-я]+$/g,
              message: languageContextTextForm.lastName.validationPattern,
            },
          })}
          placeholder={languageContextTextForm.lastName.text}
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
          <p>{languageContextTextForm.patronym.text}</p>
          <input
            {...register('patronym', {
              disabled: !patronymToggle,
              required: {
                value: patronymToggle,
                message: languageContextTextForm.patronym.validationRequire,
              },
              pattern: {
                value: /[A-Za-zЁёА-я]+$/g,
                message: languageContextTextForm.patronym.validationPattern,
              },
            })}
            placeholder={languageContextTextForm.patronym.text}
          />
          <p type='error'>{!!patronymToggle && errors?.patronym?.message}</p>
        </label>
      </div>
      <label>
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
      <label>
        <p>{languageContextTextForm.password.text}</p>
        <div className={styles.sign_up_form__password}>
          <input
            data-testid='sign-up-input-password'
            {...register('password', {
              required: {
                value: true,
                message: languageContextTextForm.password.validationRequire,
              },
              minLength: {
                value: 6,
                message: languageContextTextForm.password.validationLength,
              },
            })}
            type={displayPassword ? 'text' : 'password'}
            placeholder={languageContextTextForm.password.text}
          />{' '}
          <div
            className={styles.sign_up_form__visibility_icon}
            onClick={handleVisibilityPassword}
          >
            {(displayPassword && <Visibility />) || <VisibilityOff />}
          </div>
        </div>

        <p type='error'>{errors?.password?.message}</p>
      </label>
      <label>
        <p>{languageContextTextForm.passwordConfirm.text}</p>
        <div className={styles.sign_up_form__password}>
          <input
            data-testid='sign-up-input-password-confirm'
            {...register('passwordConfirm', {
              required: {
                value: true,
                message:
                  languageContextTextForm.passwordConfirm.validationRequire,
              },
              validate: checkPassword,
            })}
            type={displayPassword2 ? 'text' : 'password'}
            placeholder={languageContextTextForm.passwordConfirm.text}
          />
          <div
            className={styles.sign_up_form__visibility_icon}
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
        value={languageContextTextForm.buttons.signUp}
      />
    </form>
  );
};

export default SignUpForm;
