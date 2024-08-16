import { useContext } from 'react';
import styles from './Footer.module.scss';
import { LanguageContext } from '../../utils/textContext';
const Footer = () => {
  const languageContextTextFooter = useContext(LanguageContext).text.footer;
  return (
    <div data-testid='footer' className={styles.footer}>
      <p>
        <b>{languageContextTextFooter.text}</b>
      </p>
    </div>
  );
};

export default Footer;
