import { useEffect, useState } from 'react';
import styles from './ChatPersonLabel.module.scss';
import { useSelector } from 'react-redux';
import { selectUserData } from '@store/userSlice';
import { getLastMessage, NOT_FOUND } from '@utils/firebase';
import { getSocket } from '@utils/websocketService';
import { useTranslation } from 'react-i18next';

const ChatPersonLabel = ({ labelData, newChat, handleChatBoxBehavior }) => {
  const currentDate = new Date().toDateString();
  const { t } = useTranslation();
  const [lastMessage, setLastMessage] = useState('');
  const user = useSelector(selectUserData).email;
  const fetchLastMessage = async () => {
    const fetchedLastMessage = await getLastMessage(labelData.chatBoxId);
    setLastMessage(fetchedLastMessage);
  };
  const timestampParserToDate = (timestamp) => {
    const dateString = new Date(timestamp);
    const hour = dateString.getHours().toString().padStart(2, '0');
    const minute = dateString.getMinutes().toString().padStart(2, '0');
    const date = dateString.toLocaleDateString();
    if (currentDate === dateString.toDateString()) {
      return `${hour}:${minute}`;
    }
    return `${date}`;
  };
  const clickHandler = handleChatBoxBehavior.bind(null, labelData);
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
    if (labelData === NOT_FOUND)
      return (
        <div className={styles['chat-person-label_new']}>
          <div className={styles['chat-person-label__text_name_new']}>
            {t('chat.notFound')}
          </div>
        </div>
      );
    return (
      <div onClick={clickHandler}>
        <div className={styles['chat-person-label_new']}>
          <div className={styles['chat-person-label__text_name_new']}>
            {labelData.firstName} {labelData.patronym} {labelData.lastName}
          </div>
          <div className={styles['chat-person-label__text_email_new']}>
            {labelData.email}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div onClick={clickHandler}>
      <div key={labelData.email} className={styles['chat-person-label']}>
        <div className={styles['chat-person-label__info']}>
          <div className={styles['chat-person-label__text_name']}>
            {labelData.firstName} {labelData.patronym} {labelData.lastName}
          </div>
          <div className={styles['chat-person-label__text_date']}>
            {timestampParserToDate(lastMessage.timestamp)}
          </div>
        </div>
        <div className={styles['chat-person-label__text_email']}>
          {labelData.email}
        </div>
        <div className={styles['chat-person-label__last-message']}>
          <div className={styles['chat-person-label__last-message_content']}>
            {lastMessage.sender === user && t('chat.pronoun')}{' '}
            {lastMessage.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPersonLabel;
