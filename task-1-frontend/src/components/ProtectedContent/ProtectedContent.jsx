import { useEffect, useState } from 'react';
import { auth } from '@utils/firebase';
import Content from '@components/Content/Content';
import Form from './Form/Form';
import styles from './ProtectedContent.module.scss';
import { onAuthStateChanged } from 'firebase/auth';

const ProtectedContent = () => {
  const [showForm, setShowForm] = useState();
  const [showContent, setShowContent] = useState();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('Authorization passed');
        setShowForm(false);
        setShowContent(true);
      } else {
        setShowForm(true);
        setShowContent(false);
      }
    });
  });
  return (
    <div className={styles.protected_content}>
      {showForm && <Form />}
      {showContent && <Content />}
    </div>
  );
};
export default ProtectedContent;
