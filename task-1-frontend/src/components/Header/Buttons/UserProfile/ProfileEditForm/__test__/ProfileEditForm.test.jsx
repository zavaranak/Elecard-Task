import { updateUserData } from '@utils/firebase';
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

jest.mock('@utils/firebase.js', () => ({
  auth: 'auth',
  updateUserData: jest.fn(),
}));

const Wrapper = (props) => {
  return (
    <LanguageContext.Provider value={{ text: languageText.en }}>
      <ProfileEditForm
        user={props.user}
        handleUpdate={props.handleUpdate}
        closeForm={props.closeForm}
      />
    </LanguageContext.Provider>
  );
};
let user, handleUpdate, closeForm;

describe('UserProfile in Header Component', () => {
  beforeEach(() => {
    user = {
      firstName: 'First Name',
      lastName: 'Last Name',
      patronym: 'Patronym',
    };
    handleUpdate = jest.fn();
    closeForm = jest.fn();
  });
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });
  test('Render ProfileEditForm and apply module scss correctly', () => {
    render(
      <Wrapper user={user} handleUpdate={handleUpdate} closeForm={closeForm} />
    );
    expect(screen.queryByTestId('edit-form').classList).toContain(
      styles.profile_edit_form
    );
  });
  test('Close form by clicking button CLOSE', () => {
    render(
      <Wrapper user={user} handleUpdate={handleUpdate} closeForm={closeForm} />
    );
    fireEvent.click(screen.queryByTestId('button-close-edit-form'));
    expect(closeForm).toHaveBeenCalledTimes(1);
  });
  test('Submit form by clicking button SUBMIT with no data change', async () => {
    render(
      <Wrapper user={user} handleUpdate={handleUpdate} closeForm={closeForm} />
    );
    await act(async () => {
      fireEvent.click(screen.queryByTestId('button-submit-edit-form'));
    });
    expect(handleUpdate).toHaveBeenCalledTimes(1);
  });
  test('Submit form by clicking button SUBMIT with data change', async () => {
    render(
      <Wrapper user={user} handleUpdate={handleUpdate} closeForm={closeForm} />
    );
    const inputFirstName = screen.getByRole('textbox', { name: /first name/i });
    const checkbox = screen.getByRole('checkbox', { name: /patronym/i });
    fireEvent.change(inputFirstName, {
      target: { value: 'New First Name' },
    });

    fireEvent.click(checkbox);
    await act(async () => {
      fireEvent.click(screen.queryByTestId('button-submit-edit-form'));
    });
    expect(updateUserData).toHaveBeenCalledTimes(1);
  });
});
