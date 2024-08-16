import { useContext, useEffect, useState } from 'react';
import { selectUserData } from '@utils/firebase';
import Alert from '@components/Alert/Alert';
import ProfileEditForm from './ProfileEditForm/ProfileEditForm';
import User from '@icons/User.svg';
import styles from './UserProfile.module.scss';
import { LanguageContext } from '@utils/textContext';

const UserProfile = () => {
  const editProfileText = useContext(LanguageContext).text.header.editButton;
  const [user, setUser] = useState();
  const [alertStatus, setAlertStatus] = useState();
  const [showMenu, setShowMenu] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [alertTimeout, setAlertTimeout] = useState(null);

  const handleUpdateUser = (data, checkData) => {
    if (checkData) {
      setUser((prev) => ({ email: prev.email, ...data }));
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
    const fetchUser = async () => {
      try {
        const userData = await selectUserData();
        setUser(userData);
      } catch (error) {
        console.log('Error fetching user data');
      }
    };
    document.addEventListener('click', () => {
      setShowMenu(false);
    });
    fetchUser();
    return () => {
      document.removeEventListener('click', () => {
        setShowMenu(false);
      });
    };
  }, []);
  if (!user) {
    return <div>...</div>;
  }
  return (
    <div data-testid='user-profile' className={styles.user_profile}>
      {showAlert && <Alert status={alertStatus} />}
      <p className={styles.user_profile__label}>{user.lastName}</p>
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
                  {user.firstName} {user?.patronym} {user.lastName}
                </p>
                <p>{user.email}</p>
              </div>
              <li
                data-testid='button-open-update-form'
                onClick={(e) => {
                  setShowMenu(false);
                  setShowEditForm(true);
                  e.stopPropagation();
                }}
              >
                {editProfileText}
              </li>
            </ul>
          </div>
        )}
      </button>
      {showEditForm && (
        <ProfileEditForm
          user={user}
          handleUpdate={handleUpdateUser}
          closeForm={setShowEditForm}
        />
      )}
    </div>
  );
};

export default UserProfile;
