import {
  render,
  screen,
  fireEvent,
  cleanup,
  act,
} from '@testing-library/react';
import { useSelector } from 'react-redux';
import TaskBar from '../TaskBar';
import styles from '../TaskBar.module.scss';
import { LanguageContext, languageText } from '@utils/textContext';

jest.mock('@store/cardSlice', () => ({
  selectCategories: jest.fn(),
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

let filterHandler,
  sortHandler,
  orderHandler,
  cardRecover,
  setView,
  debouncedImagePerPageChange;

const Wrapper = (props) => {
  return (
    <LanguageContext.Provider value={{ text: languageText.en }}>
      <TaskBar
        filterHandler={props.filterHandler}
        sortHandler={props.sortHandler}
        orderHandler={props.orderHandler}
        cardRecover={props.cardRecover}
        debouncedImagePerPageChange={props.debouncedImagePerPageChange}
        localStorageEmpty={props.localStorageEmpty}
        setView={props.setView}
        currentView={props.currentView}
      />
    </LanguageContext.Provider>
  );
};

describe('TaskBar component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    useSelector.mockImplementation(() => {
      return ['category1', 'category2', 'category3'];
    });
    filterHandler = jest.fn();
    orderHandler = jest.fn();
    sortHandler = jest.fn();
    cardRecover = jest.fn();
    setView = jest.fn();
    debouncedImagePerPageChange = jest.fn();
  });
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
    jest.useRealTimers();
  });
  test('Render TaskBar with module scss "currentView===cards"', () => {
    render(
      <Wrapper
        filterHandler={filterHandler}
        sortHandler={sortHandler}
        orderHandler={orderHandler}
        cardRecover={cardRecover}
        debouncedImagePerPageChange={debouncedImagePerPageChange}
        localStorageEmpty={true}
        setView={setView}
        currentView={'cards'}
      />
    );
    const taskbar = screen.getByTestId('taskbar');
    expect(taskbar.classList).toContain(styles.taskbar);
  });
  test('Render TaskBar with module scss "currentView===tree"', () => {
    render(
      <Wrapper
        filterHandler={filterHandler}
        sortHandler={sortHandler}
        orderHandler={orderHandler}
        cardRecover={cardRecover}
        debouncedImagePerPageChange={debouncedImagePerPageChange}
        localStorageEmpty={false}
        setView={setView}
        currentView={'tree'}
      />
    );
    const taskbar = screen.getByTestId('taskbar');
    expect(taskbar.classList).toContain(styles.taskbar_tree_view);
  });
  test('Taskbar SORT select', () => {
    render(
      <Wrapper
        filterHandler={filterHandler}
        sortHandler={sortHandler}
        orderHandler={orderHandler}
        cardRecover={cardRecover}
        debouncedImagePerPageChange={debouncedImagePerPageChange}
        localStorageEmpty={false}
        setView={setView}
        currentView={'cards'}
      />
    );
    const sort = screen.getByTestId('taskbar-sort');
    fireEvent.change(sort, { target: { value: 'name' } });
    expect(sortHandler).toHaveBeenCalledWith('name');
  });
  test('Taskbar FILTER select', () => {
    render(
      <Wrapper
        filterHandler={filterHandler}
        sortHandler={sortHandler}
        orderHandler={orderHandler}
        cardRecover={cardRecover}
        debouncedImagePerPageChange={debouncedImagePerPageChange}
        localStorageEmpty={false}
        setView={setView}
        currentView={'cards'}
      />
    );
    const filter = screen.getByTestId('taskbar-filter');
    fireEvent.change(filter, { target: { value: 'category1' } });
    expect(filterHandler).toHaveBeenCalledWith('category1');
  });
  test('Taskbar ORDER select', () => {
    render(
      <Wrapper
        filterHandler={filterHandler}
        sortHandler={sortHandler}
        orderHandler={orderHandler}
        cardRecover={cardRecover}
        debouncedImagePerPageChange={debouncedImagePerPageChange}
        localStorageEmpty={false}
        setView={setView}
        currentView={'cards'}
      />
    );
    const order = screen.getByTestId('taskbar-order');
    fireEvent.change(order, { target: { value: 'growing' } });
    expect(orderHandler).toHaveBeenCalledWith('growing');
  });
  test('Taskbar switch to Tree View', () => {
    render(
      <Wrapper
        filterHandler={filterHandler}
        sortHandler={sortHandler}
        orderHandler={orderHandler}
        cardRecover={cardRecover}
        debouncedImagePerPageChange={debouncedImagePerPageChange}
        localStorageEmpty={false}
        setView={setView}
        currentView={'cards'}
      />
    );
    const wrapper = screen.getByTestId('taskbar-switch-view');
    const viewButton = wrapper.querySelector('input');
    act(() => {
      fireEvent.click(viewButton);
    });
    jest.advanceTimersByTime(500);
    expect(setView).toHaveBeenCalledTimes(1);
  });
  test('Taskbar recovers deleted cards', () => {
    render(
      <Wrapper
        filterHandler={filterHandler}
        sortHandler={sortHandler}
        orderHandler={orderHandler}
        cardRecover={cardRecover}
        debouncedImagePerPageChange={debouncedImagePerPageChange}
        localStorageEmpty={false}
        setView={setView}
        currentView={'cards'}
      />
    );
    const recoverButton = screen.getByTestId('taskbar-recover');
    fireEvent.click(recoverButton);
    expect(cardRecover).toHaveBeenCalledTimes(1);
  });
  test('Taskbar changes "Images per page"', () => {
    render(
      <Wrapper
        filterHandler={filterHandler}
        sortHandler={sortHandler}
        orderHandler={orderHandler}
        cardRecover={cardRecover}
        debouncedImagePerPageChange={debouncedImagePerPageChange}
        localStorageEmpty={false}
        setView={setView}
        currentView={'cards'}
      />
    );
    const wrapper = screen.getByTestId('taskbar-slider');
    const slider = wrapper.querySelector('input');
    fireEvent.change(slider, { target: { value: 10 } });
    expect(debouncedImagePerPageChange).toHaveBeenCalledTimes(1);
  });
  test('Taskbar at "currentView===undefined"', () => {
    render(
      <Wrapper
        filterHandler={undefined}
        sortHandler={undefined}
        orderHandler={undefined}
        cardRecover={undefined}
        debouncedImagePerPageChange={undefined}
        localStorageEmpty={false}
        setView={undefined}
        currentView={undefined}
      />
    );
    expect(screen.queryByTestId('taskbar')).not.toBeInTheDocument();
  });
  test('Taskbar at "currentView===undefined"', () => {
    render(
      <Wrapper
        filterHandler={undefined}
        sortHandler={undefined}
        orderHandler={undefined}
        cardRecover={undefined}
        debouncedImagePerPageChange={undefined}
        localStorageEmpty={false}
        setView={undefined}
        currentView={undefined}
      />
    );
    expect(screen.queryByTestId('taskbar')).not.toBeInTheDocument();
  });
  test('Taskbar at "props===undefined"', () => {
    render(
      <Wrapper
        filterHandler={undefined}
        sortHandler={undefined}
        orderHandler={undefined}
        cardRecover={undefined}
        debouncedImagePerPageChange={undefined}
        localStorageEmpty={false}
        setView={undefined}
        currentView={'cards'}
      />
    );

    act(() => {
      fireEvent.click(screen.queryByTestId('taskbar-switch-view'));
      jest.advanceTimersByTime(500);
    });
    expect(setView).not.toHaveBeenCalled();
  });
});
