import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTreeItemAction,
  selectNestedBranches,
} from '../../store/treeSlice';
import clsx from 'clsx';
import { Typography, IconButton } from '@mui/material';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import Branch from './Branch/Branch';
import TaskBar from '../TaskBar/TaskBar';
import ButtonToTop from '../ButtonToTop/ButtonToTop';
import { selectCardsData } from '../../store/cardSlice';
import styles from './TreeView.module.scss';
const TreeView = ({ setView }) => {
  const [showBranches, setShowBranches] = useState(true);
  const dispatch = useDispatch();
  const nestBranches = useSelector(selectNestedBranches);
  const data = useSelector(selectCardsData);
  const rootTag = useRef();
  useEffect(() => {
    dispatch(fetchTreeItemAction(data));
  }, [dispatch]);

  const classRoot = clsx([
    styles.tree_view__root,
    showBranches && styles.tree_view__root_opened,
  ]);

  return (
    <div className={styles.tree_view}>
      <TaskBar setView={setView} currentView='tree' />

      <div className={classRoot}>
        <div
          ref={rootTag}
          className={styles.tree_view__lable}
          onClick={() => setShowBranches((prev) => !prev)}
        >
          {!showBranches && (
            <IconButton color='success'>
              <ArrowCircleDownIcon />
            </IconButton>
          )}
          {showBranches && (
            <IconButton color='primary' align='center'>
              <ArrowCircleUpIcon />
            </IconButton>
          )}
          <Typography sx={{ color: '#004dbb' }} variant='button' align='center'>
            <b>ROOT</b>
          </Typography>
        </div>

        {nestBranches.length > 0
          ? showBranches &&
            nestBranches.map((branch, index) => (
              <Branch key={index} order={index + 1} branchName={branch} />
            ))
          : 'No data'}
      </div>
      <ButtonToTop order={0} />
    </div>
  );
};

export default TreeView;
