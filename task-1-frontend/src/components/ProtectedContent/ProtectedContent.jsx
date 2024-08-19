import { useEffect } from 'react';
import Content from '@components/ProtectedContent/Content/Content';
import Form from './Form/Form';
import styles from './ProtectedContent.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserAuthState } from '@store/userSlice';
import { listenToAuthState } from '@store/userSlice';

const ProtectedContent = () => {
  const authState = useSelector(selectUserAuthState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listenToAuthState());
  });
  return (
    <div className={styles.protected_content}>
      {authState === 'notPassed' && <Form />}
      {authState === 'passed' && <Content />}
    </div>
  );
};
export default ProtectedContent;
