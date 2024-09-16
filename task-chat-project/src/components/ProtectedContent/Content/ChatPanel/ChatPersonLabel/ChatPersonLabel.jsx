import { useContext, useEffect, useState } from 'react';
import styles from './ChatPersonLabel.module.scss';
import { useSelector } from 'react-redux';
import { selectUserData } from '@store/userSlice';
import { LanguageContext } from '@utils/textContext';
import { getLastMessage, NOT_FOUND } from '@utils/firebase';
import { getSocket } from '@utils/websocketService';
const ChatPersonLabel = ({ labelData, newChat, handleChatBoxBehavior }) => {
  const [lastMessage, setLastMessage] = useState('');

  const user = useSelector(selectUserData).email;
  const languageContextTextChat = useContext(LanguageContext).text.chat;
  const fetchLastMessage = async () => {
    const fetchedLastMessage = await getLastMessage(labelData.chatBoxId);
    setLastMessage(fetchedLastMessage);
  };
  const timestampParserToDate = (timestamp) => {
    const dateString = new Date(timestamp);
    const hour = dateString.getHours().toString().padStart(2, '0');
    const minute = dateString.getMinutes().toString().padStart(2, '0');
    const date = dateString.toLocaleDateString();
    return `${hour}:${minute} - ${date}`;
  };

  useEffect(() => {
    newChat || fetchLastMessage();
  }, []);

  useEffect(() => {
    const handleParsedMessages = (parsedMessage) => {
      if (parsedMessage.sender === labelData.email) {
        if (parsedMessage.type === 'new_message') {
          setLastMessage(parsedMessage);
        } else {
          fetchLastMessage();
        }
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
    const clickHandler = handleChatBoxBehavior.bind(
      null,
      true,
      labelData,
      true
    );
    if (labelData === NOT_FOUND)
      return (
        <div className={styles.chat_person_label_new}>
          <div className={styles.chat_person_label__text_name_new}>
            {languageContextTextChat.notFound}
          </div>
        </div>
      );
    return (
      <div onClick={clickHandler}>
        <div className={styles.chat_person_label_new}>
          <div className={styles.chat_person_label__text_name_new}>
            {labelData.firstName} {labelData.patronym} {labelData.lastName}
          </div>
          <div className={styles.chat_person_label__text_email_new}>
            {labelData.email}
          </div>
        </div>
      </div>
    );
  }
  const clickHandler = handleChatBoxBehavior.bind(null, true, labelData);
  return (
    <div onClick={clickHandler}>
      <div key={labelData.email} className={styles.chat_person_label}>
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
            {timestampParserToDate(lastMessage.timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPersonLabel;
