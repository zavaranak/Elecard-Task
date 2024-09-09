import { onAuthStateChanged } from 'firebase/auth';
import ProtectedContent from '../ProtectedContent';
import { render, screen } from '@testing-library/react';
import { LanguageContext, languageText } from '@utils/textContext';
import { useSelector } from 'react-redux';
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(() => jest.fn()),
}));
jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn(),
}));
jest.mock('@utils/firebase', () => ({
  auth: undefined,
}));
jest.mock('@store/userSlice', () => ({
  selectUserAuthState: jest.fn(),
  listenToAuthState: jest.fn(),
}));
jest.mock('@content/Content', () => {
  const Content = () => {
    return <div data-testid='content'></div>;
  };
  return Content;
});
jest.mock('@components/ProtectedContent/Form/Form', () => {
  const Form = () => {
    return <div data-testid='form'></div>;
  };
  return Form;
});
const Wrapper = () => {
  return (
    <LanguageContext.Provider value={{ text: languageText.en }}>
      <ProtectedContent />
    </LanguageContext.Provider>
  );
};

describe('ProtectedContent component', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('Render ProtectedContent in case: Authorization passed', () => {
    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback({ user: 'tester' });
    });
    useSelector.mockReturnValue('passed');
    render(<Wrapper />);
    expect(screen.queryByTestId('content')).toBeInTheDocument();
  });
  test('Render ProtectedContent in case: Authorization unpassed', () => {
    useSelector.mockReturnValue('notPassed');
    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback(undefined);
    });
    render(<Wrapper />);
    expect(screen.queryByTestId('form')).toBeInTheDocument();
  });
  test('Render ProtectedContent in case: Authorization laoding', () => {
    useSelector.mockReturnValue(false);
    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback(undefined);
    });
    render(<Wrapper />);

    expect(screen.queryByTestId('loading')).toBeInTheDocument();
  });
});
