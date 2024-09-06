import { useContext, useEffect, useState } from 'react';
import styles from './ChatPersonLabel.module.scss';
import { useSelector } from 'react-redux';
import { selectUserData } from '@store/userSlice';
import { LanguageContext } from '@utils/textContext';
import { getLastMessage } from '@utils/firebase';
import ChatBox from './ChatBox/ChatBox';
import { NOT_FOUND } from '@utils/firebase';
import { getSocket } from '@utils/websocketService';

const ChatPersonLabel = ({ labelData, newChat, closeNewChat }) => {
  const [displayChatBox, setDisplayChatBox] = useState(false);
  const [lastMessage, setLastMessage] = useState('');
  const user = useSelector(selectUserData).email;
  const languageContextTextChat = useContext(LanguageContext).text.chat;
  const handleDisplayChatBox = () => {
    setDisplayChatBox(true);
  };
  useEffect(() => {
    const fetchLastMessage = async () => {
      const fetchedLastMessage = await getLastMessage(labelData.chatBoxId);
      setLastMessage(fetchedLastMessage);
    };
    const handleParsedMessages = (parsedMessage) => {
      if (
        parsedMessage.sender === labelData.email &&
        parsedMessage.type === 'new_message'
      ) {
        fetchLastMessage();
      }
    };
    const newMessageHandler = (event) => {
      if (event.data instanceof Blob) {
        event.data.text().then((result) => {
          handleParsedMessages(JSON.parse(result));
        });
      } else handleParsedMessages(JSON.parse(event.data));
    };

    const socket = getSocket();
    if (socket) {
      socket.addEventListener('message', newMessageHandler);
    }

    if (!newChat) fetchLastMessage();
    return () => {
      if (socket) {
        socket.removeEventListener('message', newMessageHandler);
      }
    };
  }, [labelData]);
  if (newChat) {
    if (labelData === NOT_FOUND)
      return (
        <div className={styles.chat_person_label_new}>
          <div className={styles.chat_person_label__text_name_new}>
            {languageContextTextChat.notFound}
          </div>
        </div>
      );
    return (
      <div>
        <div
          className={styles.chat_person_label_new}
          onClick={handleDisplayChatBox}
        >
          <div className={styles.chat_person_label__text_name_new}>
            {labelData.firstName} {labelData.patronym} {labelData.lastName}
          </div>
          <div className={styles.chat_person_label__text_email_new}>
            {labelData.email}
          </div>
        </div>
        {displayChatBox && (
          <ChatBox
            targetUserData={labelData}
            handleDisplayChatBox={() => {
              setDisplayChatBox(false);
              closeNewChat();
            }}
          />
        )}
      </div>
    );
  }
  return (
    <div>
      <div
        onClick={handleDisplayChatBox}
        key={labelData.email}
        className={styles.chat_person_label}
      >
        <div className={styles.chat_person_label__text_name}>
          {labelData.firstName} {labelData.patronym} {labelData.lastName}
        </div>
        <div className={styles.chat_person_label__text_email}>
          {labelData.email}
        </div>
        <div className={styles.chat_person_label__text_last_message}>
          <div className={styles.chat_person_label__text_last_message_content}>
            {lastMessage.sender === user && languageContextTextChat.pronoun}{' '}
            {lastMessage.content}
          </div>
          <div className={styles.chat_person_label__text_last_message_date}>
            {new Date(lastMessage.timestamp)
              .getHours()
              .toString()
              .padStart(2, '0')}
            :
            {new Date(lastMessage.timestamp)
              .getMinutes()
              .toString()
              .padStart(2, '0')}{' '}
            {new Date(lastMessage.timestamp).toLocaleDateString()}
          </div>
        </div>
      </div>

      {displayChatBox && (
        <ChatBox
          targetUserData={labelData}
          handleDisplayChatBox={() => setDisplayChatBox(false)}
        />
      )}
    </div>
  );
};

export default ChatPersonLabel;
