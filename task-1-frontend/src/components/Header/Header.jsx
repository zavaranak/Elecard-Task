import styles from './Header.module.scss';
import Buttons from './Buttons/Buttons';

const Header = () => {
  return (
    <div data-testid='header' className={styles.header}>
      <div className={styles.header__title}>
        <p>
          <b>Intern Task Summer 2024 - Elecard</b>
        </p>
      </div>
      <div className={styles.header__button}>
        <Buttons />
      </div>
    </div>
  );
};

export default Header;
