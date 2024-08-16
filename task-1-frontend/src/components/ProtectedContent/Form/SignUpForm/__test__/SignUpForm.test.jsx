import SignUpForm from '../SignUpForm';
import {
  render,
  screen,
  cleanup,
  fireEvent,
  act,
} from '@testing-library/react';
import { LanguageContext, languageText } from '@utils/textContext';
import { signUpHandler } from '@utils/firebase';

jest.mock('@utils/firebase.js', () => ({
  signUpHandler: jest.fn(),
}));

const Wrapper = () => {
  return (
    <LanguageContext.Provider value={{ text: languageText.en }}>
      <SignUpForm />
    </LanguageContext.Provider>
  );
};
describe('SignUpForm component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });
  test('Render SignUpForm', () => {
    render(<Wrapper />);
    expect(screen.queryByTestId('sign-up-form')).toBeInTheDocument();
  });
  test('Fill SignUpForm and submit with error ', async () => {
    signUpHandler.mockReturnValue('error');
    render(<Wrapper />);
    const firstName = screen.getByRole('textbox', { name: /first name/i });
    const lastName = screen.getByRole('textbox', { name: /last name/i });
    const patronym = screen.getByRole('checkbox');
    const email = screen.getByRole('textbox', { name: /email/i });
    const password = screen.getByTestId('sign-up-input-password');
    const passwordConfirm = screen.getByTestId(
      'sign-up-input-password-confirm'
    );
    fireEvent.change(firstName, {
      target: { value: 'testm' },
    });
    fireEvent.change(lastName, {
      target: { value: 'test' },
    });
    fireEvent.change(email, {
      target: { value: 'test@test.com' },
    });
    fireEvent.change(password, {
      target: { value: 'test123' },
    });
    fireEvent.change(passwordConfirm, {
      target: { value: 'test123' },
    });
    fireEvent.click(patronym);
    await act(async () => {
      fireEvent.click(screen.getByText(/sign up/i));
    });
    expect(screen.queryByText(/unable to sign up/i)).toBeInTheDocument();
  });

  test('Fill SignUpForm and submit existed email', async () => {
    signUpHandler.mockReturnValue('erroremail');
    render(<Wrapper />);
    const firstName = screen.getByRole('textbox', { name: /first name/i });
    const lastName = screen.getByRole('textbox', { name: /last name/i });
    const patronym = screen.getByRole('checkbox');
    const email = screen.getByRole('textbox', { name: /email/i });
    const password = screen.getByTestId('sign-up-input-password');
    const passwordConfirm = screen.getByTestId(
      'sign-up-input-password-confirm'
    );
    fireEvent.change(firstName, {
      target: { value: 'testm' },
    });
    fireEvent.change(lastName, {
      target: { value: 'test' },
    });
    fireEvent.change(email, {
      target: { value: 'test@test.com' },
    });
    fireEvent.change(password, {
      target: { value: 'test123' },
    });
    fireEvent.change(passwordConfirm, {
      target: { value: 'test123' },
    });
    fireEvent.click(patronym);
    await act(async () => {
      fireEvent.click(screen.getByText(/sign up/i));
    });

    expect(
      screen.queryByText(/your email is already used/i)
    ).toBeInTheDocument();
  });
});
