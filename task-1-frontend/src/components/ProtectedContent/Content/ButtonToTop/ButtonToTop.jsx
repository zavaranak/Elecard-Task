import { useEffect, useState, useCallback, useContext } from 'react';
import styles from './ButtonToTop.module.scss';
import clsx from 'clsx';
import { LanguageContext } from '@utils/textContext';

const ButtonToTop = ({ main, rootTag, order, name }) => {
  const [buttonDisplay, setButtonDisplay] = useState(false);
  const buttonClass = clsx(
    styles.button_to_top,
    (buttonDisplay && styles.button_to_top_active) ||
      styles.button_to_top_unactive,
    main && styles.button_to_top_main
  );
  const languageContextTextButtonToTop =
    useContext(LanguageContext).text.tree.buttonToTop;
  const updateButtonVisibility = useCallback(() => {
    if (rootTag && rootTag.current) {
      setButtonDisplay(window.scrollY > rootTag.current.offsetTop);
    } else {
      setButtonDisplay(window.scrollY > 100);
    }
  }, [rootTag]);
  const buttonOrder = order === undefined ? -1 : order;
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
    <button
      data-testid={'button-to-top'}
      className={buttonClass}
      onClick={ScrollTop}
      data-order={buttonOrder}
    >
      {rootTag
        ? languageContextTextButtonToTop.element + ' ' + name
        : languageContextTextButtonToTop.root}
    </button>
  );
};

export default ButtonToTop;
