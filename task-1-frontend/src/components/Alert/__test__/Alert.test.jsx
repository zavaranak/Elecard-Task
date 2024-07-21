import { render, screen, cleanup } from '@testing-library/react';
import Alert from '../Alert.jsx';
import styles from '../Alert.module.scss';

afterEach(cleanup);

describe('Alert Component', () => {
  test('Правильно пользоваться модулем SCSS на основе "status"', () => {
    const { container } = render(<Alert status='good' />);
    const messageElement = container.firstChild.firstChild;
    expect(messageElement.className).toContain(styles.alert__message);
    expect(messageElement.className).toContain(styles.alert__message_good);
  });
  test('Отображать Alert при "status===loading"', () => {
    render(<Alert status='loading' />);
    expect(screen.getByText('Loading images')).toBeInTheDocument();
  });

  test('Отображать Alert при "status===good"', () => {
    render(<Alert status='good' />);
    expect(screen.getByText('Images loading successful')).toBeInTheDocument();
  });
  test('Отображать Alert при "status===bad"', () => {
    render(<Alert status='bad' />);
    expect(screen.getByText('Images loading failed')).toBeInTheDocument();
  });
});
