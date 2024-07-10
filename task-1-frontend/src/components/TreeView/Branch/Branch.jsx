import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectBranchItemsByBranchName } from '../../../store/treeSlice';
import { Typography, IconButton } from '@mui/material';
import ButtonToTop from '../../ButtonToTop/ButtonToTop';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
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
        <Typography variant='button'>
          {!listDisplay && (
            <IconButton color='success'>
              <ArrowCircleDownIcon />
            </IconButton>
          )}
          {listDisplay && (
            <IconButton sx={{ color: '#00B0B0' }}>
              <ArrowCircleUpIcon />
            </IconButton>
          )}
        </Typography>
        <Typography variant='button'>
          <b> {branchName}</b>{' '}
        </Typography>
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
