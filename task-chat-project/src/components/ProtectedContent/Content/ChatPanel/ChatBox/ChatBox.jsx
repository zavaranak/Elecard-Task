import styles from './ChatBox.module.scss';
import { ArrowBack, Send } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import {
  fetchChatBox,
  handleMessage,
  createNewChatBox,
  handleDeleteMessage,
  handleUpdateMessage,
  updateReadMessage,
  markAllMessagesAsRead,
  NEW_MES,
  DEL_MES,
  UPD_MES,
  NEW_REQ,
  READ_MES,
  READ_ALL,
} from '@utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData, fetchChatBoxId } from '@store/userSlice';
import { getSocket } from '@utils/websocketService';
import ButtonsChatBox from './ButtonsChatBox/ButtonsChatBox';
import Loading from '@components/Loading/Loading';
import Message from './Message/Message';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

const NOT_READY = 'notReady';
const READY = 'ready';
const STARTING = 'starting';
const EDIT_MESSAGE = 'edit';
const SEND = 'send';
const RECEIVE = 'receive';
const ChatBox = ({ targetUserData, closeChatBox }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(selectUserData).email;
  const [messages, setMessages] = useState();
  const [firstTime, setFirstTime] = useState(true);
  const [chatStatus, setChatStatus] = useState(NOT_READY);
  const [targetUser, setTargetUser] = useState(targetUserData);
  const [editMessage, setEditMessage] = useState(null);
  const [queue, setQueue] = useState([]);
  const messageEndRef = useRef(null);
  const messagesRef = useRef(null);
  const inputRef = useRef(null);

  const updateChatBox = (id) => {
    const newTarget = { ...targetUser, chatBoxId: id };
    setChatStatus(READY);
    setTargetUser(newTarget);
    dispatch(fetchChatBoxId());
  };

  const frontendDeleteMessage = (index) => {
    setMessages((prev) => {
      let temp = prev.slice(0);
      temp.splice(index, 1);
      return temp;
    });
  };
  const frontendEditMessage = (message, index) => {
    setEditMessage(null);
    setMessages((prev) => {
      message.status = prev[index].status;
      const temp = [...prev];
      temp.splice(index, 1, message);
      return temp;
    });
  };
  const customHandleDeleteMessage = (index, messageId) => {
    handleDeleteMessage(targetUser.chatBoxId, messageId, targetUser.email);
    frontendDeleteMessage(index);
  };

  const handleEditMessage = (index, message) => {
    setChatStatus(EDIT_MESSAGE);
    const messageId = message.timestamp.toString() + message.sender;
    setEditMessage([index, messageId]);
    inputRef.current.value = message.content;
    inputRef.current.focus();
  };

  const updateMesReadState = (messageId) => {
    const queryMessage = messagesRef.current.querySelector(
      `[id='${messageId}']`
    );
    const indexMessage = queryMessage.getAttribute('index');
    setMessages((prev) => {
      const temp = prev.slice(0);
      const tempMes = prev[indexMessage];
      tempMes.status = 'read';
      temp.splice(indexMessage, 1, tempMes);
      return temp;
    });
  };

  const handleSendingMessage = () => {
    if (Array.isArray(messages)) {
      const timestamp = new Date().getTime();
      const messagePackageCustom = {
        sender: user,
        content: inputRef.current.value,
        type:
          chatStatus === NOT_READY
            ? NEW_REQ
            : chatStatus === EDIT_MESSAGE
            ? UPD_MES
            : NEW_MES,
        status: 'sending',
      };
      chatStatus !== EDIT_MESSAGE &&
        (messagePackageCustom.timestamp = timestamp) &&
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
        case EDIT_MESSAGE: {
          if (
            messagePackageCustom.content !== messages[editMessage[0]].content
          ) {
            messagePackageCustom.timestamp = messages[editMessage[0]].timestamp;
            frontendEditMessage(messagePackageCustom, editMessage[0]);
            handleUpdateMessage(
              targetUser.chatBoxId,
              editMessage[1],
              messagePackageCustom,
              targetUser.email
            );
          }

          setChatStatus(READY);
        }
      }
    }
  };
  useEffect(() => {
    setFirstTime(true);
    setTargetUser(targetUserData);
    setMessages(null);
    setChatStatus(NOT_READY);
    setQueue([]);
    const socket = getSocket();
    const handleNewComingMessage = (event) => {
      const handleParsedMessages = (message) => {
        if (message.type === NEW_MES && message.sender === targetUser.email) {
          message.status = 'read';
          const { target, ...rest } = message;
          setMessages((prev) => [...prev, rest]);
          const messageId = message.timestamp.toString() + message.sender;
          updateReadMessage(targetUser.chatBoxId, targetUser.email, messageId);
        }
        if (message.type === DEL_MES && message.sender === targetUser.email) {
          const queryMessage = messagesRef.current.querySelector(
            `[id='${message.messageId}']`
          );
          frontendDeleteMessage(queryMessage.getAttribute('index'));
        }
        if (message.type === UPD_MES && message.sender === targetUser.email) {
          const queryMessage = messagesRef.current.querySelector(
            `[id='${message.messageId}']`
          );
          const index = queryMessage.getAttribute('index');

          frontendEditMessage(message, index);
        }
        if (message.type === READ_MES && message.sender === targetUser.email) {
          updateMesReadState(message.messageId);
        }
        if (message.type === READ_ALL && message.sender === targetUser.email) {
          setMessages((prev) => {
            return prev.map((mes) => {
              mes.status !== READ_MES && (mes.status = 'read');
              return mes;
            });
          });
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
      const messageFetched = await fetchChatBox(targetUserData.chatBoxId);
      setMessages(messageFetched);
      setChatStatus(READY);
      setTimeout(() => {
        setFirstTime(false);
      }, 1);
    };

    if (!!targetUserData.chatBoxId) {
      fetchMessages();
      markAllMessagesAsRead(targetUserData.chatBoxId, targetUserData.email);
    } else {
      setMessages([]);
    }

    return () => {
      if (socket) {
        socket.removeEventListener('message', handleNewComingMessage);
      }
    };
  }, [targetUserData]);
  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesRef.current) {
        const { scrollHeight, clientHeight, scrollTop } = messagesRef.current;
        const maxScrollTop = scrollHeight - clientHeight;
        const isNearBottom = maxScrollTop - scrollTop < 400;
        if (isNearBottom || firstTime) {
          messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
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
    <div className={styles['chat-box']}>
      <div className={styles['chat-box__taskbar']}>
        <ArrowBack onClick={closeChatBox} />
        <div className={styles['chat-box__name']}>
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
      <div ref={messagesRef} className={styles['chat-box__wrapper']}>
        <div id='messages_box' className={styles['chat-box__content']}>
          {chatStatus === NOT_READY && Array.isArray(messages) && (
            <div className={styles['chat-box__suggest']}>
              {t('chat.suggest')}
            </div>
          )}
          {(Array.isArray(messages) &&
            messages.map((message, index) => {
              return (
                <div
                  key={index}
                  index={index}
                  id={message.timestamp.toString() + message.sender}
                >
                  <Message
                    handleEditMessage={() => {
                      handleEditMessage(index, message);
                    }}
                    customHandleDeleteMessage={() => {
                      customHandleDeleteMessage(
                        index,
                        message.timestamp.toString() + message.sender,
                        targetUser.email
                      );
                    }}
                    setMessages={setMessages}
                    chatBoxId={targetUser.chatBoxId}
                    message={message}
                    type={message.sender === user ? SEND : RECEIVE}
                  />
                </div>
              );
            })) || (
            <div className={styles['chat-box__wrapper_loading']}>
              <Loading size='medium'></Loading>
            </div>
          )}
        </div>
        <div ref={messageEndRef}></div>
      </div>
      <div
        className={clsx(
          styles['chat-box__text-box'],
          chatStatus === EDIT_MESSAGE && styles['chat-box__text-box_edit']
        )}
      >
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
