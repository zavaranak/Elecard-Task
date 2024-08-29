import { useDispatch, useSelector } from 'react-redux';
import styles from './ChatPanel.module.scss';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { ArrowBack, Search } from '@mui/icons-material';
import { searchPeople } from '@utils/firebase';
import {
  selectUserChatBoxId,
  fetchChatBoxId,
  fetchChatList,
  selectUserChatList,
} from '@store/userSlice';
import ChatBox from './ChatBox/ChatBox';
import { getSocket } from '@utils/websocketService';
import { setAlertStatus } from '@store/appSlice';

const ChatPanel = ({ displayChat }) => {
  const dispatch = useDispatch();
  const [displayChatBoxData, setDisplayChatBoxData] = useState(undefined);
  const [searchResult, setSearchResult] = useState('');
  const chatList = useSelector(selectUserChatList);
  const chatIdArray = useSelector(selectUserChatBoxId);
  const searchAsync = async (data) => {
    if (data !== '') {
      const result = await searchPeople(data);
      setSearchResult(result);
    }
  };
  const searchHandler = (data) => {
    setSearchResult('Searching...');
    searchAsync(data);
  };

  const handleNewChatBox = () => {
    setDisplayChatBoxData(searchResult);
    setSearchResult(undefined);
  };

  const classChatPanel = clsx(
    styles.chat_panel,
    displayChat && styles.chat_panel_open
  );
  const handleDisplayChatBox = (data) => {
    setSearchResult(undefined);
    setDisplayChatBoxData(data);
  };
  useEffect(() => {
    (displayChat && (document.body.style.overflow = 'hidden')) ||
      (document.body.style.overflow = 'unset');
  }, [displayChat]);

  useEffect(() => {
    dispatch(fetchChatList(chatIdArray));
  }, [chatIdArray, dispatch]);

  useEffect(() => {
    const socket = getSocket();

    const handleNewComingMessage = (event) => {
      const handleParsedMessages = (message) => {
        if (
          message.type === 'new_message' &&
          message.sender !== setDisplayChatBoxData.email
        ) {
          dispatch(fetchChatBoxId());
          dispatch(setAlertStatus('newMessage'));
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
    return () => {
      if (socket) {
        socket.removeEventListener('message', handleNewComingMessage);
      }
    };
  }, []);

  return (
    <div className={classChatPanel}>
      <div className={styles.chat_panel__label}>Messenger</div>
      <div className={styles.chat_panel__task_bar}>
        <div
          onClick={() => {
            setDisplayChatBoxData(undefined);
          }}
        >
          <ArrowBack />
        </div>
        {(!!displayChatBoxData && (
          <div className={styles.chat_panel__text_target_chat}>
            {displayChatBoxData.firstName +
              ' ' +
              displayChatBoxData.patronym +
              ' ' +
              displayChatBoxData.lastName}
          </div>
        )) || (
          <div className={styles.chat_panel__search_box}>
            <input
              onChange={(event) => {
                if (event.target.value === '') setSearchResult(undefined);
              }}
              type='text'
              placeholder='Find people'
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.target.value !== '' &&
                    searchHandler(event.target.value);
                }
              }}
            />
            <Search onClick={searchHandler} />
          </div>
        )}
      </div>
      {searchResult && (
        <div className={styles.chat_panel__search_result}>
          {(typeof searchResult === 'object' && (
            <div onClick={handleNewChatBox}>
              {searchResult.firstName +
                ' ' +
                searchResult.patronym +
                ' ' +
                searchResult.lastName}
              <div>{searchResult.email}</div>
            </div>
          )) || <>{searchResult}</>}
        </div>
      )}

      {!!displayChatBoxData || (
        <div className={styles.chat_panel__list}>
          {chatList.map((item) => (
            <div
              onClick={() => handleDisplayChatBox(item)}
              key={item.email}
              className={styles.chat_panel__list_item}
            >
              <div className={styles.chat_panel__text_name}>
                {item.firstName} {item.patronym} {item.lastName}
              </div>
              <div className={styles.chat_panel__text_email}>{item.email}</div>
              <div className={styles.chat_panel__text_email}>
                {item.lastMessage}
              </div>
            </div>
          ))}
        </div>
      )}
      {!!displayChatBoxData && (
        <ChatBox
          targetUser={displayChatBoxData}
          setTargetUser={setDisplayChatBoxData}
        />
      )}
    </div>
  );
};

export default ChatPanel;
