import styles from './Skeleton.module.scss';

const Skeleton = () => {
  return (
    <div data-testid='skeleton'>
      <div className={styles.skeleton}></div>
      <div className={styles.skeleton}></div>
      <div className={styles.skeleton}></div>
      <div className={styles.skeleton}></div>
      <div className={styles.skeleton}></div>
    </div>
  );
};

export default Skeleton;
