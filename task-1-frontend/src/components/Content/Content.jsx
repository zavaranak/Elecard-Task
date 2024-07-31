import { useState, useEffect } from 'react';
import CardView from '@components/CardView/CardView';
import TreeView from '@components/TreeView/TreeView';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCardAction, selectStatus } from '@store/cardSlice';
import Alert from '@components/Alert/Alert';
import styles from './Content.module.scss';

const Content = () => {
  const [view, setView] = useState('cards');
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  useEffect(() => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  }, [status]);
  useEffect(() => {
    dispatch(fetchCardAction());
  }, [dispatch]);

  return (
    <div className={styles.content}>
      {showAlert && <Alert status={status} />}
      {view === 'cards' && <CardView setView={setView} />}
      {view === 'tree' && <TreeView setView={setView} />}
    </div>
  );
};

export default Content;
