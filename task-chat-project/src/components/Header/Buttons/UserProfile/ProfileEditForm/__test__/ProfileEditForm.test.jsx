import ProfileEditForm from '../ProfileEditForm';
import styles from '../ProfileEditForm.module.scss';
import {
  render,
  screen,
  fireEvent,
  cleanup,
  act,
} from '@testing-library/react';
import { LanguageContext, languageText } from '@utils/textContext';
import { useSelector, useDispatch } from 'react-redux';

jest.mock('@utils/firebase.js', () => ({
  auth: 'auth',
  updateUserData: jest.fn(),
}));
jest.mock('@store/appSlice.js', () => ({
  setAlertStatus: jest.fn(),
}));
jest.mock('@store/userSlice.js', () => ({
  updateUser: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

const Wrapper = (props) => {
  return (
    <LanguageContext.Provider value={{ text: languageText.en }}>
      <ProfileEditForm closeForm={props.closeForm} />
    </LanguageContext.Provider>
  );
};
let closeForm, updateFunction;

describe('UserProfile in Header Component', () => {
  beforeEach(() => {
    const user = {
      firstName: 'First Name',
      lastName: 'Last Name',
      patronym: 'Patronym',
    };
    updateFunction = jest.fn();
    useSelector.mockReturnValue(user);
    useDispatch.mockReturnValue(updateFunction);
    closeForm = jest.fn();
  });
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });
  test('Render ProfileEditForm and apply module scss correctly', () => {
    render(<Wrapper closeForm={closeForm} />);
    expect(screen.queryByTestId('edit-form').classList).toContain(
      styles.profile_edit_form
    );
  });
  test('Test fields validation "required"', async () => {
    render(<Wrapper closeForm={closeForm} />);
    const firstName = screen.getByRole('textbox', { name: /first name/i });
    const lastName = screen.getByRole('textbox', { name: /last name/i });
    const patronym = screen.getByTestId('input-patronym');
    fireEvent.change(firstName, {
      target: { value: '' },
    });
    fireEvent.change(lastName, {
      target: { value: '' },
    });
    fireEvent.change(patronym, {
      target: { value: '' },
    });
    await act(async () => {
      fireEvent.click(screen.queryByTestId('button-submit-edit-form'));
    });
    expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/patronym is required/i)).toBeInTheDocument();
  });
  test('Test fields validation "required"', async () => {
    render(<Wrapper closeForm={closeForm} />);
    const firstName = screen.getByRole('textbox', { name: /first name/i });
    const lastName = screen.getByRole('textbox', { name: /last name/i });
    const patronym = screen.getByTestId('input-patronym');
    fireEvent.change(firstName, {
      target: { value: '123' },
    });
    fireEvent.change(lastName, {
      target: { value: '@^&*' },
    });
    // fireEvent.click(patronymCheck);
    fireEvent.change(patronym, {
      target: { value: '###' },
    });
    await act(async () => {
      fireEvent.click(screen.queryByTestId('button-submit-edit-form'));
    });
    expect(
      screen.getByText(/first name can not include special characters/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/last name can not include special characters/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/patronym can not include special characters/i)
    ).toBeInTheDocument();
  });
  test('Close form by clicking button CLOSE', () => {
    render(<Wrapper closeForm={closeForm} />);
    fireEvent.click(screen.queryByTestId('button-close-edit-form'));
    expect(closeForm).toHaveBeenCalledTimes(1);
  });
  test('Submit form by clicking button SUBMIT with no data change', async () => {
    render(<Wrapper closeForm={closeForm} />);
    await act(async () => {
      fireEvent.click(screen.queryByTestId('button-submit-edit-form'));
    });
    expect(updateFunction).toHaveBeenCalledTimes(1);
  });
  test('Submit form by clicking button SUBMIT with data change', async () => {
    render(<Wrapper closeForm={closeForm} />);
    const inputFirstName = screen.getByRole('textbox', { name: /first name/i });
    const checkbox = screen.getByRole('checkbox', { name: /patronym/i });
    fireEvent.change(inputFirstName, {
      target: { value: 'New First Name' },
    });

    fireEvent.click(checkbox);
    await act(async () => {
      fireEvent.click(screen.queryByTestId('button-submit-edit-form'));
    });
    expect(updateFunction).toHaveBeenCalledTimes(2);
  });
});
