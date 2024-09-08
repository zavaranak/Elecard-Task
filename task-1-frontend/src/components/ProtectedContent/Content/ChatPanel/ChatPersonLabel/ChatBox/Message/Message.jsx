import clsx from 'clsx';
import styles from './Message.module.scss';
import MessageOption from '../MessageOption/MessageOption';
import { Done, DoneAll } from '@mui/icons-material';

const SENT = 'sent';
const READ = 'read';

const Message = ({
  message,
  type,
  customHandleDeleteMessage,
  handleEditMessage,
}) => {
  const classMessage = clsx(styles.message, styles[`message_${type}`]);

  return (
    <div className={classMessage}>
      <div className={styles[`message__content`]}>
        {type === 'send' && (
          <MessageOption
            type={type}
            customHandleDeleteMessage={customHandleDeleteMessage}
            handleEditMessage={handleEditMessage}
          />
        )}
        <p>{message.content}</p>
      </div>
      <div className={styles[`message__content_date`]}>
        {type === 'send' && message.status === SENT && <Done />}
        {type === 'send' && message.status === READ && <DoneAll />}

        <p>
          {new Date(message.timestamp).getHours().toString().padStart(2, '0') +
            ':' +
            new Date(message.timestamp)
              .getMinutes()
              .toString()
              .padStart(2, '0')}
        </p>
      </div>
    </div>
  );
};
export default Message;
