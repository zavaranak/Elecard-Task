import { useDispatch, useSelector } from 'react-redux';
import styles from './ChatPanel.module.scss';
import clsx from 'clsx';
import { useState, useEffect, useContext, useRef } from 'react';
import { Search } from '@mui/icons-material';
import { searchPeople } from '@utils/firebase';
import {
  selectUserChatBoxId,
  fetchChatBoxId,
  fetchChatList,
  selectUserChatList,
} from '@store/userSlice';
import { getSocket } from '@utils/websocketService';
import { setAlertStatus } from '@store/appSlice';
import { LanguageContext } from '@utils/textContext';
import ChatPersonLabel from './ChatPersonLabel/ChatPersonLabel';
import Loading from '@components/Loading/Loading';

const ChatPanel = ({ displayChat }) => {
  const dispatch = useDispatch();

  const languageContextTextChat = useContext(LanguageContext).text.chat;
  const [searchResult, setSearchResult] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const chatList = useSelector(selectUserChatList);
  const chatIdArray = useSelector(selectUserChatBoxId);
  const searchRef = useRef(null);
  const searchAsync = async (data) => {
    if (data !== '') {
      const result = await searchPeople(data);
      if (result.email && Array.isArray(chatIdArray)) {
        chatIdArray.map((item) => {
          if (Object.keys(item)[0] === result.email) {
            result.chatBoxId = Object.values(item)[0];
          }
        });
      }
      setIsSearching(false);
      setSearchResult(result);
    }
  };
  const searchHandler = () => {
    if (searchRef.current.value !== '') {
      setIsSearching(true);
      setSearchResult(null);
      searchAsync(searchRef.current.value);
    }
  };
  const closeNewChat = () => {
    setSearchResult(null);
    searchRef.current.value = '';
  };
  const classChatPanel = clsx(
    styles.chat_panel,
    displayChat && styles.chat_panel_open
  );
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
        if (message.type === 'new_message') {
          dispatch(setAlertStatus('newMessage'));
        }
        if (message.type === 'new_chat_request') {
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
      <div className={styles.chat_panel__label}>
        {languageContextTextChat.label}
      </div>
      <div className={styles.chat_panel__task_bar}>
        <div className={styles.chat_panel__search_box}>
          <input
            ref={searchRef}
            onChange={() => {
              setSearchResult(undefined);
            }}
            type='text'
            placeholder={languageContextTextChat.find}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                searchHandler();
              }
            }}
          />
          <Search onClick={searchHandler} />
          {isSearching && <Loading spinOnly={true} size='small' />}
        </div>
      </div>
      {searchResult && (
        <ChatPersonLabel
          labelData={searchResult}
          newChat={true}
          closeNewChat={closeNewChat}
        />
      )}

      <div className={styles.chat_panel__list}>
        {chatList.map((item) => (
          <ChatPersonLabel key={item.email} labelData={item} />
        ))}
      </div>
    </div>
  );
};

export default ChatPanel;
