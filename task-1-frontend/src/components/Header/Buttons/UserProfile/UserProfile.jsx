import { useContext, useState, useEffect } from 'react';
import { signOutHandler } from '@utils/firebase';
import Alert from '@components/Alert/Alert';
import ProfileEditForm from './ProfileEditForm/ProfileEditForm';
import User from '@icons/User.svg';
import SignOut from '@icons/SignOut.svg';
import styles from './UserProfile.module.scss';
import { LanguageContext } from '@utils/textContext';
import { Edit } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { selectUserData } from '@store/userSlice';
selectUserData;
const UserProfile = () => {
  const editProfileText = useContext(LanguageContext).text.header;

  const [alertStatus, setAlertStatus] = useState();
  const [showMenu, setShowMenu] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [alertTimeout, setAlertTimeout] = useState(null);

  const handleUpdateUser = (data, checkData) => {
    if (checkData) {
      setAlertStatus('updateUser');
      setShowAlert(true);
      setShowEditForm(false);
    } else {
      setAlertStatus('notUpdateUser');
      setShowAlert(true);
    }

    if (alertTimeout) {
      clearTimeout(alertTimeout);
    }
    const newTimeout = setTimeout(() => {
      setShowAlert(false);
      setAlertTimeout(null);
    }, 1000);

    setAlertTimeout(newTimeout);
  };

  useEffect(() => {
    document.addEventListener('click', () => {
      setShowMenu(false);
    });
    return () => {
      document.removeEventListener('click', () => {
        setShowMenu(false);
      });
    };
  }, []);
  const userData = useSelector(selectUserData);

  if (!userData) {
    return <div>...</div>;
  }
  return (
    <div data-testid='user-profile' className={styles.user_profile}>
      {showAlert && <Alert status={alertStatus} />}
      <p className={styles.user_profile__label}>{userData.lastName}</p>
      <button
        data-testid='button-dropdown-menu'
        onClick={(e) => {
          setShowMenu((prev) => !prev);
          e.stopPropagation();
        }}
      >
        <User />
        {showMenu && (
          <div
            data-testid='dropdown-menu'
            className={styles.user_profile__dropdown}
          >
            <ul>
              <div>
                <p>
                  {userData.firstName} {userData?.patronym} {userData.lastName}
                </p>
                <p>{userData.email}</p>
              </div>
              <li
                data-testid='button-open-update-form'
                onClick={(e) => {
                  setShowMenu(false);
                  setShowEditForm(true);
                  e.stopPropagation();
                }}
              >
                <Edit></Edit>
                {editProfileText.editButton}
              </li>
              <li onClick={signOutHandler}>
                <SignOut />
                {editProfileText.signOut}
              </li>
            </ul>
          </div>
        )}
      </button>
      {showEditForm && (
        <ProfileEditForm
          user={userData}
          handleUpdate={handleUpdateUser}
          closeForm={setShowEditForm}
        />
      )}
    </div>
  );
};

export default UserProfile;
