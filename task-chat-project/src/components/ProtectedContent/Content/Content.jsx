import styles from './Content.module.scss';
import ChatPanel from '@content/ChatPanel/ChatPanel';

const Content = () => {
  return (
    <div data-testid='content' className={styles.content}>
      <ChatPanel />
    </div>
  );
};

export default Content;
