import { useForm } from 'react-hook-form';
import styles from './SignInForm.module.scss';
import { signInHandler } from '@utils/firebase.js';
import { useState } from 'react';

const SignUpForm = () => {
  const [signInMessage, setSignInMessage] = useState('');
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  return (
    <form
      onSubmit={handleSubmit((data) => {
        signInHandler(data, setSignInMessage);
      })}
    >
      <label className={styles.sign_in_form__label_sign_in}>
        <p>email</p>
        <input
          {...register('email', {
            required: { value: true, message: 'please enter your email' },
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'invalid email',
            },
          })}
          placeholder='Email'
        />
        <p type='error'>{errors?.email?.message}</p>
      </label>
      <label className={styles.sign_in_form__label_sign_in}>
        <p>password</p>
        <input
          {...register('password', {
            required: {
              value: true,
              message: 'please enter your password',
            },
          })}
          type='password'
          placeholder='Password'
        />
        <p type='error'>{errors?.password?.message}</p>
      </label>
      <p type='main-error'>{signInMessage}</p>
      <input type='submit' value={'Sign up'} />
    </form>
  );
};

export default SignUpForm;
