import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Modal from '../Modal';
import styles from '../Modal.module.scss';

afterEach(cleanup);

const setDisplay = jest.fn();
const url = 'http://example.com/image.jpg';

describe('Modal Component', () => {
  test('Правильно пользоваться модулем SCSS', () => {
    const { container } = render(<Modal url={url} setDisplay={setDisplay} />);
    const modalComponent = container.firstChild;
    const contentElement = modalComponent.firstChild;
    const closeButton = screen.getByRole('button');

    expect(modalComponent.className).toContain(styles.modal);
    expect(contentElement.className).toContain(styles.modal__content_box);
    expect(closeButton.className).toContain(styles.modal__del_button);
  });

  test('Отображаться Модал и проверить вызов функцию setDisplay(false)', () => {
    render(<Modal url={url} setDisplay={setDisplay} />);
    // screen.debug();
    const closeButton = screen.getByRole('button');

    expect(screen.getByAltText(url)).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(setDisplay).toHaveBeenCalledWith(false);
  });
});
