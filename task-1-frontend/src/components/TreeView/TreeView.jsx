import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTreeItemAction, selectNestedBranches } from '@store/treeSlice';
import clsx from 'clsx';
import Branch from './Branch/Branch';
import TaskBar from '@components/TaskBar/TaskBar';
import ButtonToTop from '@components/ButtonToTop/ButtonToTop';
import ArrowUp from '@icons/ArrowUp.svg';
import ArrowDown from '@icons/ArrowDown.svg';
import { selectCardsData } from '@store/cardSlice';
import styles from './TreeView.module.scss';
const TreeView = ({ setView }) => {
  const [showBranches, setShowBranches] = useState(true);
  const dispatch = useDispatch();
  const nestBranches = useSelector(selectNestedBranches);
  const data = useSelector(selectCardsData);
  const rootTag = useRef();
  useEffect(() => {
    dispatch(fetchTreeItemAction(data));
  }, [dispatch, data]);

  const classRoot = clsx([
    styles.tree_view__root,
    showBranches && styles.tree_view__root_opened,
  ]);

  return (
    <div data-testid='tree-view' className={styles.tree_view}>
      <TaskBar setView={setView} currentView='tree' />

      <div data-testid='root' className={classRoot}>
        <div
          data-testid={'root-label'}
          ref={rootTag}
          className={styles.tree_view__label}
          onClick={() => setShowBranches((prev) => !prev)}
        >
          {!showBranches && <ArrowDown />}
          {showBranches && <ArrowUp />}
          <p>
            <b>ROOT</b>
          </p>
        </div>

        {nestBranches.length > 0
          ? showBranches &&
            nestBranches.map((branch, index) => (
              <Branch key={index} order={index + 1} branchName={branch} />
            ))
          : 'No data'}
      </div>
      <ButtonToTop order={0} main={true} />
    </div>
  );
};

export default TreeView;
