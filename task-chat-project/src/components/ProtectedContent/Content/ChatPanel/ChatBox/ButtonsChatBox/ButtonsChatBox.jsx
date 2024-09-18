import { ArrowDownward, ArrowUpward, Close, Search } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import styles from './ButtonsChatBox.module.scss';
import clsx from 'clsx';
import { findMessagesFireBase } from '@utils/firebase';
import Loading from '@components/Loading/Loading';
import { useTranslation } from 'react-i18next';

const ButtonsChatBox = ({ chatBoxId }) => {
  const { t } = useTranslation();
  const searchRef = useRef(null);
  const [displaySearchBox, setDisplaySearchBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [currentMessage, setcurrentMessage] = useState();
  const searchBoxStyles = clsx(
    styles['buttons-chat-box__search-box'],
    displaySearchBox && styles['buttons-chat-box__search-box_open']
  );
  const handleOpenSearchBox = () => {
    setDisplaySearchBox((prev) => {
      if (!prev) {
        searchRef.current.focus();
      } else {
        searchRef.current.value = '';
        resetState();
      }
      return !prev;
    });
  };

  const setNextMes = () => {
    setcurrentMessage((prev) => {
      if (prev < searchResult.length) {
        return prev + 1;
      }
      return 1;
    });
  };
  const setPreviousMes = () => {
    setcurrentMessage((prev) => {
      if (prev > 1) {
        return prev - 1;
      }
      return searchResult.length;
    });
  };

  const findMessages = async (e) => {
    const queryParam = e.target.value;
    if (e.key === 'Enter' && queryParam !== '') {
      setIsLoading(true);
      const result = await findMessagesFireBase(queryParam, chatBoxId);
      if (Array.isArray(result) && result.length > 0) {
        setcurrentMessage(result.length);
      }
      setSearchResult(result);
      setIsLoading(false);
    }
  };
  const resetState = () => {
    setcurrentMessage(null);
    setSearchResult(null);
  };

  useEffect(() => {
    let targetMessage;
    if (currentMessage) {
      const messages = document.querySelector('#messages_box');
      const tempMessage = searchResult[currentMessage - 1];
      targetMessage = messages.querySelector(
        `[id="${tempMessage.timestamp.toString() + tempMessage.sender}"]`
      );
      targetMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
      targetMessage.classList.add(styles['buttons-chat-box__marked-message']);
      return () => {
        targetMessage.classList.remove(
          styles['buttons-chat-box__marked-message']
        );
      };
    }
  }, [currentMessage]);
  return (
    <div className={styles['buttons-chat-box']}>
      <div className={styles['buttons-chat-box__search']}>
        <Search onClick={handleOpenSearchBox} />
      </div>
      <input
        ref={searchRef}
        className={searchBoxStyles}
        placeholder={t('chat.findMes')}
        type='text'
        onKeyDown={findMessages}
        onChange={resetState}
      />
      {isLoading && (
        <div className={styles['buttons-chat-box__loading']}>
          <Loading size='small' spinOnly={true} />
        </div>
      )}

      {(currentMessage && (
        <div className={styles['buttons-chat-box__arrows']}>
          <Close onClick={handleOpenSearchBox} />
          <ArrowUpward onClick={setPreviousMes} />
          <div className={styles['buttons-chat-box__arrows_text']}>
            {currentMessage}/{searchResult.length}
          </div>
          <ArrowDownward onClick={setNextMes} />
        </div>
      )) ||
        (searchResult && (
          <div className={styles['buttons-chat-box__arrows']}>
            <div className={styles['buttons-chat-box__arrows_text']}>
              {t('notFound')}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ButtonsChatBox;
