import React from 'react';
import {
  render,
  screen,
  fireEvent,
  cleanup,
  act,
} from '@testing-library/react';
import { LanguageContext, languageText } from '@utils/textContext';
import Buttons from '../Buttons';
import styles from '../Buttons.module.scss';
import { onAuthStateChanged } from 'firebase/auth';
import { signOutHandler } from '@utils/firebase';

jest.mock('@utils/firebase.js', () => ({
  auth: 'auth',
  signOutHandler: jest.fn(),
}));
jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn(),
}));

jest.mock('../UserProfile/UserProfile', () => {
  const UserProfile = () => {
    return <div>User Profile</div>;
  };
  return UserProfile;
});

const Wrapper = () => {
  let language = localStorage.getItem('lang');
  if (!language) {
    language = 'en';
    localStorage.setItem('lang', language);
  }
  const [text, setText] = React.useState(languageText[language]);
  return (
    <LanguageContext.Provider value={{ text, setText }}>
      <Buttons />
    </LanguageContext.Provider>
  );
};

describe('Buttons (Headers) Components', () => {
  beforeEach(() => {});
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });
  test('Render Buttons and apply module scss', () => {
    render(<Wrapper />);
    expect(screen.queryByTestId('buttons-header').classList).toContain(
      styles.buttons
    );
  });
  test('Test darkmode switching', () => {
    render(<Wrapper />);
    fireEvent.click(screen.queryByTestId('button-darkmode'));
    expect(document.documentElement.classList).toContain('dark-theme');
  });
  test('Test language switching to RU', () => {
    localStorage.setItem('lang', 'en');
    render(<Wrapper />);
    act(() => {
      fireEvent.click(screen.queryByTestId('button-language'));
    });
    expect(screen.queryByText(/ru/i)).toBeInTheDocument();
  });
  test('Test language switching to EN', () => {
    localStorage.setItem('lang', 'ru');
    render(<Wrapper />);
    act(() => {
      fireEvent.click(screen.queryByTestId('button-language'));
    });
    expect(screen.queryByText(/en/i)).toBeInTheDocument();
  });
  test('Test sign out', () => {
    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback({ user: 'tester' });
    });
    render(<Wrapper />);
    fireEvent.click(screen.queryByTestId('button-sign-out'));
    expect(signOutHandler).toHaveBeenCalledTimes(1);
  });
  test('Test case when invalid authorization', () => {
    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback(undefined);
    });
    render(<Wrapper />);
    expect(screen.queryByTestId('button-sign-out')).not.toBeInTheDocument();
  });
});
