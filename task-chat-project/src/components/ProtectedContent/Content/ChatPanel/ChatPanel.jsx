import { useDispatch, useSelector } from 'react-redux';
import styles from './ChatPanel.module.scss';
import clsx from 'clsx';
import { useState, useEffect, useRef } from 'react';
import { Close, Search } from '@mui/icons-material';
import { searchPeople, NOT_FOUND } from '@utils/firebase';
import {
  selectUserChatBoxId,
  fetchChatBoxId,
  fetchChatList,
  selectUserChatList,
} from '@store/userSlice';
import { getSocket } from '@utils/websocketService';
import { setAlertStatus } from '@store/appSlice';
import ChatPersonLabel from './ChatPersonLabel/ChatPersonLabel';
import Loading from '@components/Loading/Loading';
import ChatBox from './ChatBox/ChatBox';
import { useTranslation } from 'react-i18next';

const ChatPanel = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [searchResult, setSearchResult] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [chatBoxData, setChatBoxData] = useState();
  const [displayChatBox, setDisplayChatBox] = useState(false);
  const chatList = useSelector(selectUserChatList);
  const chatIdArray = useSelector(selectUserChatBoxId);
  const searchRef = useRef(null);
  const searchAsync = async (data) => {
    const result = await searchPeople(data);
    setIsSearching(false);
    const chatIdLibrary = {};
    chatIdArray.forEach((item) => {
      Object.assign(chatIdLibrary, item);
    });

    if (Array.isArray(result)) {
      const parsedResult = result.map((item) => {
        if (chatIdLibrary[item.email]) {
          const newItem = { ...item };
          newItem.chatBoxId = chatIdLibrary[item.email];
          return newItem;
        }
        return item;
      });
      setSearchResult(parsedResult);
    } else setSearchResult(NOT_FOUND);
  };
  const searchHandler = () => {
    if (searchRef.current.value !== '') {
      setIsSearching(true);
      setSearchResult(null);
      if (searchRef.current.value !== '') {
        if (chatIdArray.length === chatList.length) {
          searchAsync(searchRef.current.value);
        }
      }
    }
  };

  const handleChatBoxBehavior = (data) => {
    setDisplayChatBox(true);
    if (typeof data === 'object') {
      setChatBoxData(data);
    }
  };
  const resetSearch = () => {
    setSearchResult(null);
    if (searchRef) {
      searchRef.current.value = '';
    }
  };

  const classChatPanel = clsx(styles['chat-panel'], styles['chat-panel_open']);

  useEffect(() => {
    dispatch(fetchChatList(chatIdArray));
  }, [chatIdArray, dispatch]);

  if (chatIdArray > 0) return <Loading size='large' />;

  return (
    <div className={classChatPanel}>
      <div className={styles['chat-panel__header']}>
        <div className={styles['chat-panel__search-box']}>
          <input
            ref={searchRef}
            onChange={() => {
              setSearchResult(undefined);
            }}
            type='text'
            placeholder={t('chat.find')}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                searchHandler();
              }
            }}
          />
          {!searchResult && <Search onClick={searchHandler} />}
          {searchResult && <Close onClick={resetSearch} />}
          {isSearching && <Loading spinOnly={true} size='small' />}
        </div>
      </div>

      <div className={styles['chat-panel__wrapper']}>
        <div className={styles['chat-panel__list']}>
          {Array.isArray(searchResult) &&
            searchResult.map((item) => (
              <ChatPersonLabel
                key={`search${item.email}`}
                labelData={item}
                newChat={true}
                handleChatBoxBehavior={handleChatBoxBehavior}
              />
            ))}
          {searchResult === NOT_FOUND && (
            <ChatPersonLabel
              labelData={searchResult}
              newChat={true}
              handleChatBoxBehavior={handleChatBoxBehavior}
            />
          )}
          {chatIdArray.length > 0 && chatList.length === 0 && (
            <div className={styles['chat-panel__list_loading']}>
              <Loading spinOnly={true} size='medium' />
            </div>
          )}
          {chatList.map((item) => (
            <ChatPersonLabel
              key={item.email}
              labelData={item}
              handleChatBoxBehavior={handleChatBoxBehavior}
            />
          ))}
        </div>
        <div className={styles['chat-panel__box']}>
          {displayChatBox && (
            <ChatBox
              targetUserData={chatBoxData}
              closeChatBox={() => {
                setDisplayChatBox(false);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
