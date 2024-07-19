import styles from './Header.module.scss';
const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header__title}>
        <p>
          <b>Challenge CW 2023 (frontend)</b>
        </p>
      </div>
    </div>
  );
};

export default Header;
