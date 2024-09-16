import { render, screen, cleanup } from '@testing-library/react';
import Alert from '../Alert.jsx';
import styles from '../Alert.module.scss';
import { LanguageContext, languageText } from '@utils/textContext';

const Wrapper = (props) => {
  return (
    <LanguageContext.Provider value={{ text: languageText.en }}>
      <Alert status={props.status} />
    </LanguageContext.Provider>
  );
};

describe('Alert Component', () => {
  afterEach(cleanup);
  test('Render Alert and apply module SCSS', () => {
    render(<Wrapper status='good' />);
    const alert = screen.getByTestId('alert');
    expect(alert.className).toContain(styles.alert);
  });
  test('Render Alert at "status===undefined"', () => {
    render(<Wrapper status={undefined} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
  test('Render Alert at "status===loading"', () => {
    render(<Wrapper status='loading' />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
  test('Render Alert at "status===good"', () => {
    render(<Wrapper status='good' />);
    expect(screen.getByText(/images loading successful/i)).toBeInTheDocument();
  });
  test('Render Alert at "status===bad"', () => {
    render(<Wrapper status='bad' />);
    expect(screen.getByText(/images loading failed/i)).toBeInTheDocument();
  });
  test('Render Alert at "status===download"', () => {
    render(<Wrapper status='download' />);
    expect(screen.getByText(/starting download/i)).toBeInTheDocument();
  });
  test('Render Alert at "status===errorDownload"', () => {
    render(<Wrapper status='errorDownload' />);
    expect(screen.getByText(/unable to download/i)).toBeInTheDocument();
  });
  test('Render Alert at "status===updateUser"', () => {
    render(<Wrapper status='updateUser' />);
    expect(screen.getByText(/updated user profile/i)).toBeInTheDocument();
  });
  test('Render Alert at "status===newMessage"', () => {
    render(<Wrapper status='newMessage' />);
    expect(screen.getByText(/new message/i)).toBeInTheDocument();
  });
  test('Render Alert at "status===notUpdateUser"', () => {
    render(<Wrapper status='notUpdateUser' />);
    expect(screen.getByText(/no change to update/i)).toBeInTheDocument();
  });
});
