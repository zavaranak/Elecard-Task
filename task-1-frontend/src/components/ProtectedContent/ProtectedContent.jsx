import { useEffect } from 'react';
import Content from '@components/ProtectedContent/Content/Content';
import Form from './Form/Form';
import styles from './ProtectedContent.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserAuthState } from '@store/userSlice';
import { listenToAuthState } from '@store/userSlice';

const ProtectedContent = ({ displayChat }) => {
  const authState = useSelector(selectUserAuthState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listenToAuthState());
  }, []);

  if (!authState)
    return (
      <div className={styles.protected_content}>
        <div className={styles.protected_content__loading}>Loading...</div>
      </div>
    );
  return (
    <div className={styles.protected_content}>
      {authState === 'notPassed' && <Form />}
      {authState === 'passed' && <Content displayChat={displayChat} />}
    </div>
  );
};
export default ProtectedContent;
