import { useForm } from 'react-hook-form';
import { useState, useContext, useEffect } from 'react';
import { updateUserData } from '@utils/firebase';
import { selectUserData, updateUser } from '@store/userSlice';
import styles from './ProfileEditForm.module.scss';
import { LanguageContext } from '@utils/textContext';
import { useSelector, useDispatch } from 'react-redux';
import { setAlertStatus } from '@store/appSlice';

const ProfileEditForm = ({ closeForm }) => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const { register, handleSubmit, formState } = useForm();
  const [patronymToggle, setPatronymToggle] = useState(!!userData.patronym);
  const { errors } = formState;
  const languageContextTextForm = useContext(LanguageContext).text.form;
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  });
  const submitHandler = (data) => {
    const processedData = {};
    let checkData = false;
    let patronymChange = false;
    Object.keys(data).forEach((key) => {
      (data[key] && (processedData[key] = data[key])) ||
        (processedData[key] = '');
    });

    if (processedData.firstName !== userData.firstName) checkData = true;
    else if (processedData.lastName !== userData.lastName) checkData = true;
    else if (
      processedData.patronym !== userData.patronym &&
      userData.patronym !== ''
    ) {
      checkData = true;
      patronymChange = true;
    }
    if (checkData) {
      dispatch(setAlertStatus('updateUser'));
      dispatch(updateUser(processedData));
      updateUserData(processedData, patronymChange);
      closeForm(false);
    } else {
      dispatch(setAlertStatus('notUpdateUser'));
    }
  };
  return (
    <div data-testid='edit-form' className={styles.profile_edit_form}>
      <div className={styles.profile_edit_form__form_box}>
        <p className={styles.profile_edit_form__header}>
          {languageContextTextForm.buttons.updateProfile}
        </p>
        <form
          onSubmit={handleSubmit((data) => {
            submitHandler(data);
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
              defaultValue={userData.firstName}
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
              defaultValue={userData.lastName}
            />
            <p type='error'>{errors?.lastName?.message}</p>
          </label>

          <label>
            <p>
              {' '}
              <input
                type='checkbox'
                onChange={() => setPatronymToggle((prev) => !prev)}
                checked={patronymToggle}
              />
              {languageContextTextForm.patronym.text}
            </p>
            <input
              data-testid='input-patronym'
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
              defaultValue={userData.patronym}
            />
            {patronymToggle && <p type='error'>{errors?.patronym?.message}</p>}
          </label>

          <input
            data-testid='button-submit-edit-form'
            type='submit'
            value={languageContextTextForm.buttons.updateProfile}
          />
          <input
            data-testid='button-close-edit-form'
            type='button'
            onClick={() => {
              closeForm(false);
            }}
            value={languageContextTextForm.buttons.cancel}
          />
        </form>
      </div>
    </div>
  );
};

export default ProfileEditForm;
