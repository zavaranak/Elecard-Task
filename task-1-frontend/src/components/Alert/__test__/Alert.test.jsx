import { render, screen, cleanup } from '@testing-library/react';
import Alert from '../Alert.jsx';
import styles from '../Alert.module.scss';

describe('Alert Component', () => {
  afterEach(cleanup);
  test('Render Alert and apply module SCSS', () => {
    render(<Alert status='good' />);
    const alert = screen.getByTestId('alert');
    expect(alert.className).toContain(styles.alert);
  });
  test('Render message and apply module SCSS', () => {
    render(<Alert status='good' />);
    const alertMessage = screen.getByTestId('alert-message');
    expect(alertMessage.className).toContain(styles.alert__message);
  });
  test('Render Alert at "status===undefined"', () => {
    render(<Alert status={undefined} />);
    expect(screen.getByText('Loading error')).toBeInTheDocument();
  });
  test('Render Alert at "status===loading"', () => {
    render(<Alert status='loading' />);
    expect(screen.getByText('Loading images')).toBeInTheDocument();
  });
  test('Render Alert at "status===good"', () => {
    render(<Alert status='good' />);
    expect(screen.getByText('Images loading successful')).toBeInTheDocument();
  });
  test('Render Alert at "status===bad"', () => {
    render(<Alert status='bad' />);
    expect(screen.getByText('Images loading failed')).toBeInTheDocument();
  });
  test('Render Alert at "status===download"', () => {
    render(<Alert status='download' />);
    expect(screen.getByText('Start downloading')).toBeInTheDocument();
  });
  test('Render Alert at "status===errorDownload"', () => {
    render(<Alert status='errorDownload' />);
    expect(screen.getByText('Unable to download')).toBeInTheDocument();
  });
});
