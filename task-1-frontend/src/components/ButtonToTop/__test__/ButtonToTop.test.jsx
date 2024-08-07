import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import ButtonToTop from '../ButtonToTop';
import styles from '../ButtonToTop.module.scss';

const TestWrapper = (props) => {
  const react = require('react');
  const tag = react.useRef();
  const rootTag = props.rootTag ? tag : undefined;
  return (
    <div data-testid={'wrapper'}>
      <div data-testid={'target-tag'} ref={tag}>
        Target tag
      </div>
      <ButtonToTop
        main={props.main}
        name={props.name}
        rootTag={rootTag}
        order={props.order}
      />
    </div>
  );
};

describe('ButtonToTop component', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });
  test('Render Main ButtonToTop with module scss', () => {
    render(<TestWrapper main={true} order={0} />);
    const button = screen.queryByTestId('button-to-top');
    expect(button.classList).toContain(styles.button_to_top_main);
  });
  test('Render Main ButtonToTop with "props===undefined"', () => {
    render(<TestWrapper main={undefined} order={undefined} />);
    const button = screen.queryByTestId('button-to-top');
    expect(button.classList).not.toContain(styles.button_to_top_main);
    expect(button).toHaveAttribute('data-order', '-1');
  });
  test('Render Branch ButtonToTop', () => {
    render(<TestWrapper name={'example'} rootTag={true} order={1} />);
    expect(screen.queryByText(/example/)).toBeInTheDocument();
  });
  test('Main ButtonToTop at scroll event', () => {
    render(<TestWrapper main={true} order={0} />);
    const button = screen.queryByTestId('button-to-top');
    fireEvent.scroll(window, {
      target: { scrollY: 101 },
    });
    expect(button.classList).toContain(styles.button_to_top_active);
  });
  test('Branch ButtonToTop at scroll event', () => {
    render(<TestWrapper name={'example'} rootTag={true} order={0} />);
    const button = screen.queryByTestId('button-to-top');
    const targetTag = screen.queryByTestId('target-tag');
    fireEvent.scroll(window, {
      target: { scrollY: targetTag.getBoundingClientRect().bottom + 1 },
    });
    expect(button.classList).toContain(styles.button_to_top_active);
  });
  test('Main ButtonToTop at click event', () => {
    render(<TestWrapper main={true} order={0} />);
    const button = screen.queryByTestId('button-to-top');
    fireEvent.scroll(window, {
      target: { scrollY: 101 },
    });
    jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
    fireEvent.click(button);
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });
  test('Branch ButtonToTop at click event', () => {
    render(<TestWrapper name={'example'} rootTag={true} order={0} />);
    const button = screen.queryByTestId('button-to-top');
    const targetTag = screen.queryByTestId('target-tag');
    jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
    fireEvent.scroll(window, {
      target: { scrollY: targetTag.getBoundingClientRect().bottom + 1 },
    });
    fireEvent.click(button);
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: targetTag.getBoundingClientRect().top,
      behavior: 'smooth',
    });
  });
});
