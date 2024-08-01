import {
  render,
  screen,
  cleanup,
  fireEvent,
  within,
} from '@testing-library/react';
import CardView from '../CardView';
import styles from '../CardView.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { act } from 'react';
let setView;
//mock store, redux, Page component, TaskBar component
jest.mock('@store/cardSlice', () => ({
  selectCardsLength: 'selectCard',
  sortOrderCard: jest.fn(),
  sortAndFilterCard: jest.fn(),
  restoreCards: jest.fn(),
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('../Page/Page', () => {
  const Page = ({ pageNumb, imagePerPage }) => {
    return (
      <div>
        Page {pageNumb} with {imagePerPage} images
      </div>
    );
  };
  return Page;
});
jest.mock('@components/TaskBar/TaskBar', () => {
  function TaskBar(props) {
    const {
      filterHandler,
      sortHandler,
      orderHandler,
      cardRecover,
      debouncedImagePerPageChange,
      localStorageEmpty,
      setView,
      currentView,
    } = props;
    const handleClick = () => {
      filterHandler(), sortHandler();
      orderHandler();
      cardRecover();
      debouncedImagePerPageChange(10);
      setView();
    };
    return (
      <div data-testid='taskbar' onClick={handleClick}>
        TaskBar at {currentView} view and{' '}
        {localStorageEmpty === true ? 'disabled' : 'active'} Recover button{' '}
      </div>
    );
  }
  return TaskBar;
});
jest.mock('../Skeleton/Skeleton', () => {
  const Skeleton = () => {
    return <div data-testid='skeleton'>Skeleton</div>;
  };
  return Skeleton;
});

describe('CardView Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    setView = jest.fn();
    const mockDispatch = jest.fn();
    const mockSelector = jest.fn((selector) => {
      if (selector === 'selectCard') return 10;
    });
    useSelector.mockImplementation(mockSelector);
    useDispatch.mockReturnValue(mockDispatch);
  });
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
    jest.useRealTimers();
  });
  test('Render cardView with module scss', () => {
    render(<CardView setView={setView} />);
    const cardView = screen.getByTestId('card-view');
    expect(cardView.classList).toContain(styles.card_view);
  });
  test('Render cardView at "setView===undefined"', () => {
    render(<CardView setView={undefined} />);
    const taskbar = screen.queryByTestId('taskbar');
    expect(taskbar).not.toBeInTheDocument();
  });
  test('Functions are passed down to TaskBar and called correctly', () => {
    render(<CardView setView={setView} />);
    const taskbar = screen.queryByTestId('taskbar');
    act(() => {
      fireEvent.click(taskbar);
      jest.advanceTimersByTime(500);
    });
    expect(setView).toHaveBeenCalledTimes(1);
  });
  test('Functions are passed down to TaskBar and called correctly', () => {
    render(<CardView setView={setView} />);
    const pagination = screen.queryByTestId('pagination');
    const buttonPage = within(pagination).getByText('1');
    fireEvent.click(buttonPage);
  });
  test('Render Skeleton at "useSelector(selectCard())=== 0"', () => {
    const mockSelector = jest.fn((selector) => {
      if (selector === 'selectCard') return 0;
    });
    useSelector.mockImplementation(mockSelector);
    render(<CardView setView={setView} />);
    const skeleton = screen.queryByTestId('skeleton');
    expect(skeleton).toBeInTheDocument();
  });
  test('Recover card base on LocalStorage', () => {
    const mockGetItem = jest
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation(() => ({ value: jest.fn() }));
    const mockSetItem = jest.spyOn(Storage.prototype, 'setItem');
    mockGetItem.mockReturnValue(true);
    render(<CardView setView={setView} />);
    expect(mockGetItem).toHaveBeenCalledTimes(1);
    const taskbar = screen.queryByTestId('taskbar');
    act(() => {
      fireEvent.click(taskbar);
      jest.advanceTimersByTime(500);
    });

    expect(mockSetItem).toHaveBeenCalledTimes(1);
    expect(mockGetItem).toHaveBeenCalledTimes(1);
  });
});
