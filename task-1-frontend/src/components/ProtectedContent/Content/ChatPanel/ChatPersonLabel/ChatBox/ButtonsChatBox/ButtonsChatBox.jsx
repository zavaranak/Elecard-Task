import { ArrowDownward, ArrowUpward, Close, Search } from '@mui/icons-material';
import { useContext, useEffect, useRef, useState } from 'react';
import styles from './ButtonsChatBox.module.scss';
import clsx from 'clsx';
import { findMessagesFireBase } from '@utils/firebase';
import { LanguageContext } from '@utils/textContext';

const ButtonsChatBox = ({ chatBoxId }) => {
  const searchRef = useRef(null);
  const LanguageContextContentText = useContext(LanguageContext).text;
  const [displaySearchBox, setDisplaySearchBox] = useState(false);
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
    if (e.key === 'Enter') {
      const queryParam = e.target.value;

      const result = await findMessagesFireBase(queryParam, chatBoxId);
      if (Array.isArray(result) && result.length > 0) {
        setCurrentMes(result.length);
      }
      setSearchResult(result);
    }
  };
  const resetState = () => {
    setCurrentMes(null);
    setSearchResult(null);
  };

  useEffect(() => {
    if (currentMes) {
      const messages = document.querySelector('#messages_box');
      const tempMessage = searchResult[currentMes - 1];
      const targetMessage = messages.querySelector(
        `[id="${tempMessage.timestamp.toString() + tempMessage.sender}"]`
      );
      targetMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
        type='text'
        onKeyDown={findMessages}
        onChange={resetState}
      />
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
