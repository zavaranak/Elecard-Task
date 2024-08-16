import { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { LanguageContext } from '@utils/textContext';
import styles from './SignUpForm.module.scss';
import { signUpHandler } from '@utils/firebase.js';

const SignUpForm = () => {
  const { register, handleSubmit, watch, formState, reset } = useForm();
  const { errors } = formState;
  const [patronymToggle, setPatronymToggle] = useState(true);
  const [signUpMessage, setSignUpMessage] = useState('');
  const languageContextTextForm = useContext(LanguageContext).text.form;
  const checkPassword = (confirmedPassword) => {
    if (watch('password') !== confirmedPassword)
      return languageContextTextForm.passwordConfirm.validationMatch;
  };
  useEffect(() => {
    reset();
  }, [languageContextTextForm, reset]);
  return (
    <form
      data-testid='sign-up-form'
      onSubmit={handleSubmit((data) => {
        const error = signUpHandler(data);
        if (error)
          if (error === 'erroremail')
            setSignUpMessage(languageContextTextForm.errors.signUp.errorEmail);
          else if (error == 'error')
            setSignUpMessage(languageContextTextForm.errors.signUp.default);
      })}
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
          {patronymToggle && <p type='error'>{errors?.patronym?.message}</p>}
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
          type='password'
          placeholder={languageContextTextForm.password.text}
        />
        <p type='error'>{errors?.password?.message}</p>
      </label>
      <label>
        <p>{languageContextTextForm.passwordConfirm.text}</p>
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
          type='password'
          placeholder={languageContextTextForm.passwordConfirm.text}
        />
        <p type='error'>{errors?.passwordConfirm?.message}</p>
      </label>
      <p type='main-error'>{signUpMessage}</p>
      <input type='submit' value={languageContextTextForm.buttons.signUp} />
    </form>
  );
};

export default SignUpForm;
