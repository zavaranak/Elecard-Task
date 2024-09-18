import styles from './Content.module.scss';
import ChatPanel from '@content/ChatPanel/ChatPanel';
import { useSelector } from 'react-redux';
import Loading from '@components/Loading/Loading';
import { useEffect, useState } from 'react';
import { selectUserData } from '@store/userSlice';
const Content = () => {
  // const fetching = useSelector(selectFetchingUser);
  const [fetchingUser, setFetchingUser] = useState(true);
  const userData = useSelector(selectUserData);
  useEffect(() => {
    if (userData.email) {
      setFetchingUser(false);
    }
  }, [userData]);
  return (
    <div data-testid='content' className={styles.content}>
      {(fetchingUser && <Loading size='large' />) || <ChatPanel />}
    </div>
  );
};

export default Content;
