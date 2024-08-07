import { useEffect, useState } from 'react';
import { selectUserData } from '@utils/firebase';
import User from '@icons/User.svg';
import styles from './UserProfile.module.scss';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await selectUserData();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
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
  if (!user) return <div>Loading...</div>;
  return (
    <div className={styles.user_profile}>
      <p>{user.lastName}</p>
      <button
        onClick={(e) => {
          setShowMenu(true);
          e.stopPropagation();
        }}
      >
        <User />
        {showMenu && (
          <ul className={styles.user_profile__dropdown_menu}>
            <li
              onClick={(e) => {
                setShowMenu(false);
                e.stopPropagation();
              }}
            >
              Edit Profile
            </li>
          </ul>
        )}
      </button>
    </div>
  );
};

export default UserProfile;
