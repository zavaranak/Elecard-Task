import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import TreeView from '../TreeView';
import styles from '../TreeView.module.scss';
import { LanguageContext, languageText } from '@utils/textContext';

jest.mock('@components/TaskBar/TaskBar', () => {
  const TaskBar = (props) => {
    const { setView, currentView } = props;
    return (
      <div data-testid='taskbar' onClick={setView}>
        TaskBar at view: {currentView}
      </div>
    );
  };
  return TaskBar;
});
jest.mock('../Branch/Branch', () => {
  const Branch = (props) => {
    const { order, branchName } = props;
    return (
      <div>
        Branch: {branchName}
        Order: {order}
      </div>
    );
  };
  return Branch;
});
jest.mock('@store/treeSlice', () => ({
  fetchTreeItemAction: jest.fn(),
  selectNestedBranches: 'mockSelectBranches',
}));
jest.mock('@store/cardSlice', () => ({
  selectCardsData: 'mockSelectData',
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

let setView;

const Wrapper = (props) => {
  return (
    <LanguageContext.Provider value={{ text: languageText.en }}>
      <TreeView setView={props.setView} />
    </LanguageContext.Provider>
  );
};

describe('TreeView Component', () => {
  beforeEach(() => {
    setView = jest.fn();
    const mockuseDispatch = () => jest.fn();
    const mockUseSelector = jest.fn((selector) => {
      if (selector === 'mockSelectBranches') {
        return ['branch1', 'branch2', 'branch3'];
      }
      return true;
    });
    useSelector.mockImplementation(mockUseSelector);
    useDispatch.mockImplementation(mockuseDispatch);
  });
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  test('Render TreeView with module scss', () => {
    render(<Wrapper setView={setView} />);
    fireEvent.click(screen.queryByTestId('taskbar'));
    expect(screen.queryByTestId('tree-view').classList).toContain(
      styles.tree_view
    );
  });
  test('Render TreeView with undefined props', () => {
    render(<Wrapper setView={undefined} />);
    expect(screen.queryByTestId('taskbar')).toBeInTheDocument();
  });

  test('Branches are empty', () => {
    const mockUseSelector = jest.fn((selector) => {
      if (selector === 'mockSelectBranches') {
        return [];
      }
      return true;
    });
    useSelector.mockImplementation(mockUseSelector);
    render(<Wrapper setView={setView} />);
    const root = screen.queryByTestId('root');
    expect(root.childElementCount).toEqual(1);
  });
  test('Close branches', () => {
    render(<Wrapper setView={setView} />);
    const root = screen.queryByTestId('root');
    fireEvent.click(screen.queryByTestId('root-label'));
    expect(root.childElementCount).toEqual(1);
  });
});
