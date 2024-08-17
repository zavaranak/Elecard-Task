import { useForm } from 'react-hook-form';
import { useState, useContext, useEffect } from 'react';
import { updateUserData } from '@utils/firebase';
import styles from './ProfileEditForm.module.scss';
import { LanguageContext } from '@utils/textContext';

const ProfileEditForm = ({ user, handleUpdate, closeForm }) => {
  const { register, handleSubmit, formState } = useForm();
  const [patronymToggle, setPatronymToggle] = useState(
    user.patronym ? true : false
  );
  const { errors } = formState;
  const languageContextTextForm = useContext(LanguageContext).text.form;
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  });
  return (
    <div data-testid='edit-form' className={styles.profile_edit_form}>
      <div className={styles.profile_edit_form__form_box}>
        <p className={styles.profile_edit_form__header}>
          {languageContextTextForm.buttons.updateProfile}
        </p>
        <form
          onSubmit={handleSubmit((data) => {
            const processedData = {};
            let checkData = false;
            let patronymChange = false;
            Object.keys(data).forEach((key) => {
              if (data[key]) processedData[key] = data[key];
            });

            if (processedData.firstName !== user.firstName) checkData = true;
            else if (processedData.lastName !== user.lastName) checkData = true;
            else if (processedData.patronym !== user.patronym) {
              (checkData = true), (patronymChange = true);
            }
            if (checkData) {
              updateUserData(processedData, patronymChange);
              handleUpdate(data, true);
            } else {
              handleUpdate({}, false);
            }
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
              defaultValue={user.firstName}
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
              defaultValue={user.lastName}
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
              defaultValue={user.patronym}
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
