//import CloseIcon from '@mui/icons-material/Close';
import styles from './CloseIcon.module.scss';
const CloseIcon = ({ size }) => {
  const sizeStart = size * (30 / 100);
  const sizeEnd = size * (70 / 100);

  return (
    <svg
      width={size}
      height={size}
      className={styles.closeIcon}
      viewBox={`0 0 ${size} ${size}`}
      xmlns='http://www.w3.org/2000/svg'
    >
      <line
        x1={sizeStart}
        y1={sizeStart}
        x2={sizeEnd}
        y2={sizeEnd}
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
      />
      <line
        x1={sizeStart}
        y1={sizeEnd}
        x2={sizeEnd}
        y2={sizeStart}
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
      />
    </svg>
  );
};

export default CloseIcon;
