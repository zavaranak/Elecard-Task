import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './SignUpForm.module.scss';
import { signUpHandler } from '@utils/firebase.js';

const SignUpForm = () => {
  const { register, handleSubmit, watch, formState } = useForm();
  const { errors } = formState;
  const [patronymToggle, setPatronymToggle] = useState(true);
  const [signUpMessage, setSignUpMessage] = useState('');
  const checkPassword = (confirmedPassword) => {
    if (watch('password') !== confirmedPassword)
      return 'Passwords do not match';
  };
  return (
    <form
      onSubmit={handleSubmit((data) => {
        signUpHandler(data, setSignUpMessage);
      })}
    >
      <label>
        <p>first name</p>
        <input
          {...register('firstName', {
            required: { value: true, message: 'First name is required' },
            pattern: {
              value: /[A-Za-zЁёА-я]+$/g,
              message: 'First name can not include special characters',
            },
          })}
          placeholder='First name'
        />
        <p type='error'>{errors?.firstName?.message}</p>
      </label>
      <label>
        <p>last name</p>
        <input
          {...register('lastName', {
            required: { value: true, message: 'Last name is required' },
            pattern: {
              value: /[A-Za-zЁёА-я]+$/g,
              message: 'Last name can not include special characters',
            },
          })}
          placeholder='Last Name'
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
          <p>Patronym</p>
          <input
            {...register('patronym', {
              disabled: !patronymToggle,
              required: {
                value: patronymToggle,
                message: 'Patronym is required',
              },
              pattern: {
                value: /[A-Za-zЁёА-я]+$/g,
                message: 'Patronym can not include special characters',
              },
            })}
            placeholder='Patronym'
          />
          {patronymToggle && <p type='error'>{errors?.patronym?.message}</p>}
        </label>
      </div>
      <label>
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
      <label>
        <p>password</p>
        <input
          {...register('password', {
            required: { value: true, message: 'Password is required' },
            minLength: {
              value: 6,
              message: 'Password can not be less than 6 characters',
            },
          })}
          type='password'
          placeholder='password'
        />
        <p type='error'>{errors?.password?.message}</p>
      </label>
      <label>
        <p>confirm password </p>
        <input
          {...register('passwordConfirm', {
            required: {
              value: true,
              message: 'please confirm your password',
            },
            validate: checkPassword,
          })}
          type='password'
          placeholder='Confirm password'
        />
        <p type='error'>{errors?.passwordConfirm?.message}</p>
      </label>
      <p type='main-error'>{signUpMessage}</p>
      <input type='submit' value={'Sign up'} />
    </form>
  );
};

export default SignUpForm;
