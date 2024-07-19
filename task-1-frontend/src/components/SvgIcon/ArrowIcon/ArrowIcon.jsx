import styles from './ArrowIcon.module.scss';
import clsx from 'clsx';
const ArrowIcon = ({ up }) => {
  const size = 20;
  const xStart = size * (30 / 100);
  const xMiddle = size * (50 / 100);
  const xEnd = size * (70 / 100);
  const yHigh = up ? size * (30 / 100) : size * (70 / 100);
  const yLow = up ? size * (70 / 100) : size * (30 / 100);

  const arrowClass = clsx(
    styles.arrowIcon,
    (up && styles.arrowIcon_up) || styles.arrowIcon_down
  );
  return (
    <svg
      width={size}
      height={size}
      className={arrowClass}
      viewBox={`0 0 ${size} ${size}`}
      xmlns='http://www.w3.org/2000/svg'
    >
      <line
        x1={xStart}
        y1={yLow}
        x2={xMiddle}
        y2={yHigh}
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
      />
      <line
        x1={xMiddle}
        y1={yHigh}
        x2={xEnd}
        y2={yLow}
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
      />
    </svg>
  );
};

export default ArrowIcon;
