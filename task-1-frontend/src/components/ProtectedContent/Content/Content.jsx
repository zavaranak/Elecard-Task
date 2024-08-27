import { useState, useEffect } from 'react';
import CardView from '@content/CardView/CardView';
import TreeView from '@content/TreeView/TreeView';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCardAction, selectStatus } from '@store/cardSlice';
import { setAlertStatus } from '@store/appSlice';
import styles from './Content.module.scss';
import ChatPanel from '@content/ChatPanel/ChatPanel';

const Content = ({ displayChat }) => {
  const [view, setView] = useState('cards');
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  useEffect(() => {
    dispatch(setAlertStatus(status));
  }, [status, dispatch]);
  useEffect(() => {
    dispatch(fetchCardAction());
  }, [dispatch]);

  return (
    <div data-testid='content' className={styles.content}>
      {view === 'cards' && <CardView setView={setView} />}
      {view === 'tree' && <TreeView setView={setView} />}
      <ChatPanel displayChat={displayChat} />
    </div>
  );
};

export default Content;
