import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { useSelector } from 'react-redux';
import Branch from '../Branch';
import styles from '../Branch.module.scss';
import { LanguageContext, languageText } from '@utils/textContext';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));
jest.mock('@store/treeSlice', () => ({
  selectBranchItemsByBranchName: jest.fn(),
}));
jest.mock('@content/TreeView/Branch/Leaf/Leaf', () => {
  const Leaf = (item) => {
    return <div data-testid='leaf'>Leaf {item.url}</div>;
  };
  return Leaf;
});

const Wrapper = (props) => {
  return (
    <LanguageContext.Provider value={{ text: languageText.en }}>
      <Branch branchName={props.branchName} order={props.order} />
    </LanguageContext.Provider>
  );
};

describe('Branch component', () => {
  beforeEach(() => {
    useSelector.mockReturnValue([]);
  });
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  test('Render Branch with module scss', () => {
    render(<Wrapper branchName='branch test' order={1} />);
    expect(screen.queryByTestId('branch').classList).toContain(styles.branch);
  });
  test('Render Branch at "props===undefined"', () => {
    render(<Wrapper branchName={undefined} order={undefined} />);
    expect(screen.queryByText(/unknown branch/i)).toBeInTheDocument();
  });
  test('Open Branch with items', () => {
    useSelector.mockReturnValue([
      { name: 'item1', url: 'item1.example.com' },
      { name: 'item2', url: 'item2.example.com' },
      { name: 'item3', url: 'item3.example.com' },
      { name: 'item4', url: 'item4.example.com' },
      { name: 'item5', url: 'item5.example.com' },
    ]);
    render(<Wrapper branchName={'branch test'} order={1} />);
    fireEvent.click(screen.queryByTestId('branch-label'));
    const leaves = screen.queryAllByTestId('leaf');
    expect(leaves.length).toEqual(5);
  });
  test('Open empty Branch', () => {
    render(<Wrapper branchName={'branch test'} order={1} />);
    fireEvent.click(screen.queryByTestId('branch-label'));
    expect(screen.queryByTestId('leaf')).not.toBeInTheDocument();
  });
});
