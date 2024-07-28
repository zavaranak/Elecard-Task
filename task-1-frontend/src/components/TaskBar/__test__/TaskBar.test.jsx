import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import TaskBar from '../TaskBar';
import styles from '../TaskBar.module.scss';
import { useSelector } from 'react-redux';
import { act } from 'react';

jest.mock('../../../store/cardSlice', () => ({
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
      <TaskBar
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
      <TaskBar
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
      <TaskBar
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
      <TaskBar
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
      <TaskBar
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
  test('Taskbar dark mode switcher', () => {
    render(
      <TaskBar
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
    const darkModeButton = screen.getByTestId('taskbar-darkmode');
    fireEvent.click(darkModeButton);
    expect(screen.getByTestId('taskbar-sun')).toBeInTheDocument();
  });
  test('Taskbar switch to Tree View', () => {
    render(
      <TaskBar
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
      <TaskBar
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
      <TaskBar
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
  test('Taskbar at "props===undefined"', () => {
    render(
      <TaskBar
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

    //Select SORT failed
    const sort = screen.getByTestId('taskbar-sort');
    fireEvent.change(sort, { target: { value: 'name' } });
    expect(sortHandler).not.toHaveBeenCalled();

    //Select FILTER failed
    const filter = screen.getByTestId('taskbar-filter');
    fireEvent.change(filter, { target: { value: 'category1' } });
    expect(filterHandler).not.toHaveBeenCalled();

    //Select ORDER failed
    const order = screen.getByTestId('taskbar-order');
    fireEvent.change(order, { target: { value: 'growing' } });
    expect(orderHandler).not.toHaveBeenCalled();

    //Recover deleted Image failed
    const recoverButton = screen.getByTestId('taskbar-recover');
    fireEvent.click(recoverButton);
    expect(cardRecover).not.toHaveBeenCalled();

    //Change images per page failed
    const wrapperSlider = screen.getByTestId('taskbar-slider');
    const slider = wrapperSlider.querySelector('input');
    fireEvent.change(slider, { target: { value: 10 } });
    expect(debouncedImagePerPageChange).not.toHaveBeenCalled();

    //Change view failed
    const wrapperView = screen.getByTestId('taskbar-switch-view');
    const viewButton = wrapperView.querySelector('input');
    act(() => {
      fireEvent.click(viewButton);
    });
    jest.advanceTimersByTime(500);
    expect(setView).not.toHaveBeenCalled();
  });
});
