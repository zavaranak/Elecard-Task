import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectBranchItemsByBranchName } from '../../../store/treeSlice';
import ButtonToTop from '../../ButtonToTop/ButtonToTop';
import ArrowIcon from '../../SvgIcon/ArrowIcon/ArrowIcon';
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
        <p>
          {!listDisplay && (
            <div>
              <ArrowIcon />
            </div>
          )}
          {listDisplay && (
            <div>
              <ArrowIcon up={true} />
            </div>
          )}
        </p>
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
