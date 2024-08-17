import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from '../Modal';
import styles from '../Modal.module.scss';

const url = 'http://example.com/image.jpg';

describe('Modal Component', () => {
  afterEach(cleanup);
  test('Render Alert and apply module SCSS', () => {
    const setDisplay = jest.fn();
    render(<Modal url={url} setDisplay={setDisplay} />);
    const modal = screen.getByTestId('modal');
    expect(modal.className).toContain(styles.modal);
  });
  test('Props "url===undefined"', () => {
    const setDisplay = jest.fn();
    render(<Modal url={undefined} setDisplay={setDisplay} />);
    expect(screen.getByAltText('Invalid image source')).toBeInTheDocument();
  });
  test('Click event on closeButton ', () => {
    const setDisplay = jest.fn();
    render(<Modal url={url} setDisplay={setDisplay} />);
    const closeButton = screen.getByTestId('modal-close-button');
    fireEvent.click(closeButton);
    expect(setDisplay).toHaveBeenCalledWith(false);
  });
  test('Keydown("Escape") event', async () => {
    const setDisplay = jest.fn();
    render(<Modal url={url} setDisplay={setDisplay} />);
    await userEvent.keyboard('{Escape}');
    expect(setDisplay).toHaveBeenCalledWith(false);
  });
  test('Keydown(not "Escape") event', async () => {
    const setDisplay = jest.fn();
    render(<Modal url={url} setDisplay={setDisplay} />);
    await userEvent.keyboard('{Enter}');
    expect(setDisplay).not.toHaveBeenCalledWith(false);
  });
  test('Click event on closeButton at "setDisplay===undefined"', () => {
    render(<Modal url={undefined} setDisplay={undefined} />);
    const closeButton = screen.getByTestId('modal-close-button');
    fireEvent.click(closeButton);
    try {
      fireEvent.click(closeButton);
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });
  test('Keydown(Escape) event at "setDisplay===undefined"', async () => {
    const setDisplay = undefined;
    render(<Modal url={url} setDisplay={setDisplay} />);
    await userEvent.keyboard('{Escape}');
  });
  test('On mounting check "overflow===hidden"', () => {
    const setDisplay = jest.fn();
    render(<Modal url={url} setDisplay={setDisplay} />);
    expect(document.body.style.overflow).toBe('hidden');
  });
  test('On unmounting check "overflow===unset"', () => {
    const setDisplay = jest.fn();
    const { unmount } = render(<Modal url={url} setDisplay={setDisplay} />);
    unmount();
    expect(document.body.style.overflow).toBe('unset');
  });
});
