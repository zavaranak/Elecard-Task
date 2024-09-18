import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { updateUserData } from '@utils/firebase';
import { selectUserData, updateUser } from '@store/userSlice';
import styles from './ProfileEditForm.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setAlertStatus } from '@store/appSlice';
import { useTranslation } from 'react-i18next';

const ProfileEditForm = ({ closeForm }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const { register, handleSubmit, formState } = useForm();
  const [patronymToggle, setPatronymToggle] = useState(!!userData.patronym);
  const { errors } = formState;
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
          {t('form.buttons.updateProfile')}
        </p>
        <form
          onSubmit={handleSubmit((data) => {
            submitHandler(data);
          })}
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
              defaultValue={userData.firstName}
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
              {t('form.patronym.text')}
            </p>
            <input
              data-testid='input-patronym'
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
              defaultValue={userData.patronym}
            />
            {patronymToggle && <p type='error'>{errors?.patronym?.message}</p>}
          </label>

          <input
            data-testid='button-submit-edit-form'
            type='submit'
            value={t('form.buttons.updateProfile')}
          />
          <input
            data-testid='button-close-edit-form'
            type='button'
            onClick={() => {
              closeForm(false);
            }}
            value={t('form.buttons.cancel')}
          />
        </form>
      </div>
    </div>
  );
};

export default ProfileEditForm;
