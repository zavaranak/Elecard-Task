import { MoreVert } from '@mui/icons-material';
import styles from './MessageOption.module.scss';
import clsx from 'clsx';
import { useEffect, useState, useRef } from 'react';

const MessageOption = ({
  type,
  customHandleDeleteMessage,
  handleEditMessage,
}) => {
  const classOption = clsx(
    styles['message-option'],
    styles[`message-option_${type}`]
  );
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const toggleDropdown = () => {
    setDisplayDropdown((prev) => !prev);
  };

  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOnDocument = (e) => {
      if (!dropdownRef.current.contains(e.target)) {
        setDisplayDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOnDocument);
    return () => {
      document.removeEventListener('click', handleClickOnDocument);
    };
  }, []);
  return (
    <div className={classOption}>
      <MoreVert ref={dropdownRef} onClick={toggleDropdown} />
      {displayDropdown && (
        <div className={styles['message-option__dropdown']}>
          <ul>
            <li onClick={handleEditMessage}>Edit</li>
            <li onClick={customHandleDeleteMessage}>Delete</li>
          </ul>
        </div>
      )}
    </div>
  );
};
export default MessageOption;
