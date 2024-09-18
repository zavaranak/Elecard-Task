import { useEffect } from 'react';
import Content from '@components/ProtectedContent/Content/Content';
import Form from './Form/Form';
import styles from './ProtectedContent.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserAuthState } from '@store/userSlice';
import { listenToAuthState } from '@store/userSlice';
import Loading from '@components/Loading/Loading';

const ProtectedContent = () => {
  const authState = useSelector(selectUserAuthState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listenToAuthState());
  }, []);

  if (!authState) {
    return (
      <div className={styles.protected_content__loading}>
        <Loading size='large' />
      </div>
    );
  }
  return (
    <div className={styles.protected_content}>
      {authState === 'notPassed' && <Form />}
      {authState === 'passed' && <Content />}
    </div>
  );
};
export default ProtectedContent;
