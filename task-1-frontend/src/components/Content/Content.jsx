import { useState, useEffect } from 'react';
import CardView from '../CardView/CardView';
import TreeView from '../TreeView/TreeView';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCardAction, selectStatus } from '../../store/cardSlice';
import Alert from '../Alert/Alert';
import styles from './Content.module.scss';

const Content = () => {
  const [view, setView] = useState('cards');
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  useEffect(() => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  }, [status]);
  useEffect(() => {
    dispatch(fetchCardAction());
  }, [dispatch]);

  return (
    <Box className={styles.content} maxWidth='xl'>
      {showAlert && <Alert status={status} />}
      {view === 'cards' && <CardView setView={setView} />}
      {view === 'tree' && <TreeView setView={setView} />}
    </Box>
  );
};

export default Content;
