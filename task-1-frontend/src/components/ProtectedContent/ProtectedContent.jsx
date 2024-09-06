import { useContext, useEffect } from 'react';
import Content from '@components/ProtectedContent/Content/Content';
import Form from './Form/Form';
import styles from './ProtectedContent.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserAuthState } from '@store/userSlice';
import { listenToAuthState } from '@store/userSlice';
import { LanguageContext } from '@utils/textContext';

const ProtectedContent = ({ displayChat }) => {
  const authState = useSelector(selectUserAuthState);
  const languageContextProtedtedContent = useContext(LanguageContext).text;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listenToAuthState());
  }, []);

  if (!authState)
    return (
      <div className={styles.protected_content}>
        <div className={styles.protected_content__loading}>
          <div className={styles.protected_content__loading_spin}></div>
          <div className={styles.protected_content__loading_text}>
            {languageContextProtedtedContent.loading}
          </div>
        </div>
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
