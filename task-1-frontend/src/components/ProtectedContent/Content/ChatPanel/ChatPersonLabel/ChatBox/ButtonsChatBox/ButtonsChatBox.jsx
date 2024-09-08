import { ArrowDownward, ArrowUpward, Close, Search } from '@mui/icons-material';
import { useContext, useEffect, useRef, useState } from 'react';
import styles from './ButtonsChatBox.module.scss';
import clsx from 'clsx';
import { findMessagesFireBase } from '@utils/firebase';
import { LanguageContext } from '@utils/textContext';
import Loading from '@components/Loading/Loading';

const ButtonsChatBox = ({ chatBoxId }) => {
  const searchRef = useRef(null);
  const LanguageContextContentText = useContext(LanguageContext).text;
  const [displaySearchBox, setDisplaySearchBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [currentMes, setCurrentMes] = useState();
  const searchBoxStyles = clsx(
    styles.buttons_chat_box__search_box,
    displaySearchBox && styles.buttons_chat_box__search_box_open
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
    setCurrentMes((prev) => {
      if (prev < searchResult.length) {
        return prev + 1;
      }
      return 1;
    });
  };
  const setPreviousMes = () => {
    setCurrentMes((prev) => {
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
        setCurrentMes(result.length);
      }
      setSearchResult(result);
      setIsLoading(false);
    }
  };
  const resetState = () => {
    setCurrentMes(null);
    setSearchResult(null);
  };

  useEffect(() => {
    let targetMessage;
    if (currentMes) {
      const messages = document.querySelector('#messages_box');
      const tempMessage = searchResult[currentMes - 1];
      targetMessage = messages.querySelector(
        `[id="${tempMessage.timestamp.toString() + tempMessage.sender}"]`
      );
      targetMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
      targetMessage.classList.add(styles.buttons_chat_box__marked_message);
      return () => {
        targetMessage.classList.remove(styles.buttons_chat_box__marked_message);
      };
    }
  }, [currentMes]);
  return (
    <div className={styles.buttons_chat_box}>
      <Search
        className={styles.buttons_chat_box__more_vert}
        onClick={handleOpenSearchBox}
      />
      <input
        ref={searchRef}
        className={searchBoxStyles}
        placeholder={LanguageContextContentText.chat.findMes}
        type='text'
        onKeyDown={findMessages}
        onChange={resetState}
      />
      {isLoading && (
        <div className={styles.buttons_chat_box__loading}>
          <Loading size='small' spinOnly={true} />
        </div>
      )}

      {(currentMes && (
        <div className={styles.buttons_chat_box__arrows}>
          <Close onClick={handleOpenSearchBox} />
          <ArrowUpward onClick={setPreviousMes} />
          <div className={styles.buttons_chat_box__arrows_text}>
            {currentMes}/{searchResult.length}
          </div>
          <ArrowDownward onClick={setNextMes} />
        </div>
      )) ||
        (searchResult && (
          <div className={styles.buttons_chat_box__arrows}>
            <div className={styles.buttons_chat_box__arrows_text}>
              {LanguageContextContentText.notFound}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ButtonsChatBox;
