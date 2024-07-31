import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectBranchItemsByBranchName } from '@store/treeSlice';
import ButtonToTop from '@components/ButtonToTop/ButtonToTop';
import ArrowUp from '@icons/ArrowUp.svg';
import ArrowDown from '@icons/ArrowDown.svg';
import Leaf from './Leaf/Leaf';
import styles from './Branch.module.scss';

const Branch = ({ branchName, order }) => {
  const [listDisplay, setListDisplay] = useState(false);

  const selectItems = selectBranchItemsByBranchName(branchName);
  const leaves = useSelector(selectItems);

  const branchRef = useRef();
  return (
    <div ref={branchRef} className={styles.branch}>
      <div
        className={styles.branch__label}
        onClick={() => setListDisplay((prev) => !prev)}
      >
        <div>
          {!listDisplay && (
            <div>
              <ArrowDown />
            </div>
          )}
          {listDisplay && (
            <div>
              <ArrowUp />
            </div>
          )}
        </div>
        <p>
          <b> {branchName}</b>{' '}
        </p>
      </div>

      {listDisplay && (
        <div className={styles.branch__list}>
          {leaves.map((item, index) => (
            <Leaf key={index} item={item} />
          ))}
        </div>
      )}
      <ButtonToTop order={order * 7} rootTag={branchRef} name={branchName} />
    </div>
  );
};
export default Branch;
