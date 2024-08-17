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
  test('Test field validation "required"', async () => {
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
      target: { value: '' },
    });
    fireEvent.change(lastName, {
      target: { value: '' },
    });
    fireEvent.change(email, {
      target: { value: '' },
    });
    fireEvent.change(password, {
      target: { value: '' },
    });
    fireEvent.change(passwordConfirm, {
      target: { value: '' },
    });
    fireEvent.click(patronym);
    await act(async () => {
      fireEvent.click(screen.getByText(/sign up/i));
    });

    expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter your email/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter your password/i)).toBeInTheDocument();
    expect(
      screen.getByText(/please confirm your password/i)
    ).toBeInTheDocument();
  });
  test('Test field validation "pattern"', async () => {
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
      target: { value: '123' },
    });
    fireEvent.change(lastName, {
      target: { value: '@##' },
    });
    fireEvent.change(email, {
      target: { value: '!@#' },
    });
    fireEvent.change(password, {
      target: { value: '12345' },
    });
    fireEvent.change(passwordConfirm, {
      target: { value: '!@#$#$###' },
    });
    fireEvent.click(patronym);
    await act(async () => {
      fireEvent.click(screen.getByText(/sign up/i));
    });
    expect(
      screen.getByText(/first name can not include special characters/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/last name can not include special characters/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/your email is incorrect/i)).toBeInTheDocument();
    expect(
      screen.getByText(/password cannot be less than 6 characters/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/your passwords do not match/i)
    ).toBeInTheDocument();
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
