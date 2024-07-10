import { Button } from '@mui/material';
import ArrowCircleUp from '@mui/icons-material/ArrowCircleUp';
import { useEffect, useState, useCallback } from 'react';
import styles from './ButtonToTop.module.scss';
import clsx from 'clsx';

const ButtonToTop = ({ rootTag, order, name }) => {
  const [buttonDisplay, setButtonDisplay] = useState(false);
  const buttonClass = clsx(
    styles.button_to_top,
    (buttonDisplay && styles.button_to_top_active) ||
      styles.button_to_top_unactive
  );
  const updateButtonVisibility = useCallback(() => {
    if (rootTag && rootTag.current) {
      setButtonDisplay(window.scrollY > rootTag.current.offsetTop);
    } else {
      setButtonDisplay(window.scrollY > 100);
    }
  }, [rootTag]);

  useEffect(() => {
    window.addEventListener('scroll', updateButtonVisibility);
    window.addEventListener('resize', updateButtonVisibility);

    const observer = new MutationObserver(updateButtonVisibility);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('scroll', updateButtonVisibility);
      window.removeEventListener('resize', updateButtonVisibility);
      observer.disconnect();
    };
  }, [updateButtonVisibility]);

  const ScrollTop = () => {
    if (rootTag && rootTag.current) {
      const yOffset = rootTag.current.offsetTop;
      window.scrollTo({
        top: yOffset,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div style={{ bottom: `${order + 7}%` }} className={buttonClass}>
      <Button
        sx={{
          width: '180px',
          fontWeight: 700,
          backgroundColor: `${rootTag ? '#00B0B0' : '#004dbb'}`,
        }}
        onClick={ScrollTop}
        variant='contained'
        startIcon={<ArrowCircleUp />}
      >
        {rootTag ? `To ${name}` : 'Back to top'}
      </Button>
    </div>
  );
};

export default ButtonToTop;
