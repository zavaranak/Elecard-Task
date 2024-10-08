import { useContext, useState, useEffect } from 'react';
import { signOutHandler } from '@utils/firebase';
import ProfileEditForm from './ProfileEditForm/ProfileEditForm';
import User from '@icons/User.svg';
import SignOut from '@icons/SignOut.svg';
import styles from './UserProfile.module.scss';
import { LanguageContext } from '@utils/textContext';
import { Edit } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData, resetUserData } from '@store/userSlice';
import Loading from '@components/Loading/Loading';

const UserProfile = () => {
  const dispatch = useDispatch();
  const editProfileText = useContext(LanguageContext).text.header;
  const [showMenu, setShowMenu] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const userData = useSelector(selectUserData);

  const signOutHandlerCustom = () => {
    dispatch(resetUserData());
    signOutHandler();
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

  if (!userData?.lastName) {
    return (
      <div>
        <Loading size='small' spinOnly={true} />
      </div>
    );
  }
  return (
    <div data-testid='user-profile' className={styles.user_profile}>
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
              <li data-testid='button-sign-out' onClick={signOutHandlerCustom}>
                <SignOut />
                {editProfileText.signOut}
              </li>
            </ul>
          </div>
        )}
      </button>
      {showEditForm && <ProfileEditForm closeForm={setShowEditForm} />}
    </div>
  );
};

export default UserProfile;
