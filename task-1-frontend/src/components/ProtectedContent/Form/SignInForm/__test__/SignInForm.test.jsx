import SignInForm from '../SignInForm';
import {
  render,
  screen,
  cleanup,
  fireEvent,
  act,
} from '@testing-library/react';
import { LanguageContext, languageText } from '@utils/textContext';
import { signInHandler } from '@utils/firebase';

jest.mock('@utils/firebase.js', () => ({
  auth: 'auth',
  signInHandler: jest.fn(),
}));

const Wrapper = () => {
  return (
    <LanguageContext.Provider value={{ text: languageText.en }}>
      <SignInForm />
    </LanguageContext.Provider>
  );
};
describe('SignInForm component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });
  test('Render SignInForm', () => {
    render(<Wrapper />);
    expect(screen.queryByTestId('sign-in-form')).toBeInTheDocument();
  });
  test('Fill SignInForm and submit with input error ', async () => {
    signInHandler.mockResolvedValue('error');
    render(<Wrapper />);
    const email = screen.getByRole('textbox', { name: /email/i });
    const password = screen.getByTestId('sign-in-input-password');
    fireEvent.change(email, {
      target: { value: 'test@test.com' },
    });
    fireEvent.change(password, {
      target: { value: 'test123' },
    });
    await act(async () => {
      fireEvent.click(screen.getByText(/sign in/i));
    });

    expect(signInHandler).toHaveBeenCalledTimes(1);
    expect(
      screen.queryByText(/email or password is incorrect/i)
    ).toBeInTheDocument();
  });
  test('Fill SignInForm and submit with undefined error', async () => {
    signInHandler.mockResolvedValue(undefined);
    render(<Wrapper />);
    const email = screen.getByRole('textbox', { name: /email/i });
    const password = screen.getByTestId('sign-in-input-password');
    fireEvent.change(email, {
      target: { value: 'test@test.com' },
    });
    fireEvent.change(password, {
      target: { value: 'test123' },
    });
    await act(async () => {
      fireEvent.click(screen.getByText(/sign in/i));
    });
    expect(signInHandler).toHaveBeenCalledTimes(1);
  });
});
