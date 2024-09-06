import clsx from 'clsx';
import styles from './ChatBox.module.scss';
import { ArrowBack, Send } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import { fetchChatBox, handleMessage, createNewChatBox } from '@utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData, fetchChatBoxId } from '@store/userSlice';
import { getSocket } from '@utils/websocketService';
import ButtonsChatBox from './ButtonsChatBox/ButtonsChatBox';
// import { LanguageContext } from '@utils/textContext';

const NOT_READY = 'notReady';
const READY = 'ready';
const STARTING = 'starting';
const ChatBox = ({ targetUserData, handleDisplayChatBox }) => {
  // const languageContextTextChat = useContext(LanguageContext).text.chat;
  const dispatch = useDispatch();
  const user = useSelector(selectUserData).email;
  const [messages, setMessages] = useState();
  const [chatStatus, setChatStatus] = useState(NOT_READY);
  const [targetUser, setTargetUser] = useState(targetUserData);
  const [queue, setQueue] = useState([]);
  const messageEndRef = useRef(null);
  const inputRef = useRef(null);
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const updateChatBox = (id) => {
    const newTarget = { ...targetUser, chatBoxId: id };
    setChatStatus(READY);
    setTargetUser(newTarget);
    dispatch(fetchChatBoxId());
  };

  const handleSendingMessage = () => {
    const timestamp = new Date().getTime();
    const messagePackageCustom = {
      sender: user,
      timestamp: timestamp,
      content: inputRef.current.value,
      type: chatStatus === NOT_READY ? 'new_chat_request' : 'new_message',
    };
    setMessages((prev) => {
      return [...prev, messagePackageCustom];
    });
    inputRef.current.value = '';
    switch (chatStatus) {
      case READY: {
        handleMessage(
          messagePackageCustom,
          targetUser.chatBoxId,
          targetUser.email
        );
        break;
      }
      case NOT_READY: {
        setChatStatus(STARTING);
        const newId = timestamp.toString() + targetUser.email + user;
        createNewChatBox(targetUser.email, messagePackageCustom).then(() => {
          updateChatBox(newId);
        });
        break;
      }
      case STARTING: {
        setQueue((prev) => {
          if (prev.length > 0) {
            return [...prev, messagePackageCustom];
          }
          return [messagePackageCustom];
        });
        break;
      }
    }
  };
  const sendedMessageClass = clsx(
    styles.chat_box__message,
    styles.chat_box__message_send
  );
  const receivedMessageClass = clsx(
    styles.chat_box__message,
    styles.chat_box__message_receive
  );
  useEffect(() => {
    const socket = getSocket();
    const handleNewComingMessage = (event) => {
      const handleParsedMessages = (message) => {
        if (
          message.type === 'new_message' &&
          message.sender === targetUser.email
        ) {
          const { target, ...rest } = message;
          setMessages((prev) => [...prev, rest]);
        }
      };
      if (event.data instanceof Blob) {
        event.data.text().then((result) => {
          handleParsedMessages(JSON.parse(result));
        });
      } else handleParsedMessages(JSON.parse(event.data));
    };
    if (socket) {
      socket.addEventListener('message', handleNewComingMessage);
    }
    const fetchMessages = async () => {
      const messageFetched = await fetchChatBox(targetUser.chatBoxId);
      setMessages(messageFetched);
      setChatStatus(READY);
    };

    (!!targetUser.chatBoxId && fetchMessages()) || setMessages([]);

    return () => {
      if (socket) {
        socket.removeEventListener('message', handleNewComingMessage);
      }
    };
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    if (chatStatus === READY && queue.length > 0) {
      queue.forEach((mes) => {
        handleMessage(mes, targetUser.chatBoxId, targetUser.email);
      });
      setQueue([]);
    }
  }, [chatStatus]);
  return (
    <div className={styles.chat_box}>
      <div className={styles.chat_box__taskbar}>
        <ArrowBack onClick={handleDisplayChatBox} />
        <div className={styles.chat_box__name}>
          <p>
            {targetUser.firstName +
              ' ' +
              targetUser.patronym +
              ' ' +
              targetUser.lastName}
          </p>
        </div>
        <ButtonsChatBox chatBoxId={targetUser.chatBoxId} />
      </div>
      <div className={styles.chat_box__wrapper}>
        <div id='messages_box' className={styles.chat_box__content}>
          {Array.isArray(messages) &&
            messages.map((message) => {
              if (message.sender === user) {
                return (
                  <div
                    key={message.timestamp}
                    id={message.timestamp.toString() + message.sender}
                    className={sendedMessageClass}
                  >
                    <p>{message.content}</p>
                    <p type='date'>
                      {new Date(message.timestamp)
                        .getHours()
                        .toString()
                        .padStart(2, '0') +
                        ':' +
                        new Date(message.timestamp)
                          .getMinutes()
                          .toString()
                          .padStart(2, '0')}
                    </p>
                  </div>
                );
              }
              if (message.sender !== user) {
                return (
                  <div
                    key={message.timestamp}
                    id={message.timestamp.toString() + message.sender}
                    className={receivedMessageClass}
                  >
                    <p>{message.content}</p>
                    <p type='date'>
                      {new Date(message.timestamp)
                        .getHours()
                        .toString()
                        .padStart(2, '0') +
                        ':' +
                        new Date(message.timestamp)
                          .getMinutes()
                          .toString()
                          .padStart(2, '0')}
                    </p>
                  </div>
                );
              }
            })}
        </div>
        <div ref={messageEndRef}></div>
      </div>
      <div className={styles.chat_box__text_box}>
        <input
          ref={inputRef}
          type='text'
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.target.value !== '') {
              handleSendingMessage();
            }
          }}
        />
        <button onClick={handleSendingMessage}>
          <Send />
        </button>
      </div>
    </div>
  );
};
export default ChatBox;
