import styles from './Footer.module.scss';
const Footer = () => {
  return (
    <div data-testid='footer' className={styles.footer}>
      <p>
        <b>&copy; 2024 Frontend with React by Dang</b>
      </p>
    </div>
  );
};

export default Footer;
