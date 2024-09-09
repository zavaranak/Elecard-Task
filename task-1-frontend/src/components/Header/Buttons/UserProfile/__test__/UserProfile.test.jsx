import {
  render,
  screen,
  fireEvent,
  cleanup,
  act,
} from '@testing-library/react';
import { LanguageContext, languageText } from '@utils/textContext';
import UserProfile from '../UserProfile';
import styles from '../UserProfile.module.scss';
import { useSelector } from 'react-redux';
import { signOutHandler } from '@utils/firebase';
jest.mock('@utils/firebase.js', () => ({
  auth: 'auth',
}));
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(() => jest.fn()),
  useSelector: jest.fn(),
}));

jest.mock('@store/userSlice', () => ({
  resetUserData: jest.fn(),
  selectUserData: jest.fn(),
}));
jest.mock('@store/appSlice', () => ({}));
jest.mock('@utils/firebase', () => ({ signOutHandler: jest.fn() }));

jest.mock('../ProfileEditForm/ProfileEditForm', () => {
  const ProfileEditForm = ({ user, handleUpdate, closeForm }) => {
    return (
      <div data-testid='profile-update-form'>
        User:
        {user.firstName + user.patronym
          ? ' ' + user.patronym
          : '' + ' ' + user.lastName}
        <div
          data-testid='button1-submit-update-form'
          onClick={() => {
            handleUpdate(
              {
                firstName: 'New First Name',
                lastName: 'New Last Name',
                patronym: '',
              },
              true
            );
          }}
        >
          Update1
        </div>
        <div
          data-testid='button2-submit-update-form'
          onClick={() => {
            handleUpdate({}, false);
          }}
        >
          Update2
        </div>
        <div
          data-testid='button-close-update-form'
          onClick={() => closeForm(false)}
        >
          Close
        </div>
      </div>
    );
  };
  return ProfileEditForm;
});

const Wrapper = () => {
  return (
    <LanguageContext.Provider value={{ text: languageText.en }}>
      <UserProfile />
    </LanguageContext.Provider>
  );
};

describe('UserProfile in Header Component', () => {
  beforeEach(() => {
    useSelector.mockReturnValue({
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'test@test.test',
    });
    jest.useFakeTimers();
  });
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
    jest.useRealTimers();
  });
  test('Render UserProfile and apply module scss correctly', async () => {
    await act(async () => {
      render(<Wrapper />);
    });
    expect(screen.queryByTestId('user-profile').classList).toContain(
      styles.user_profile
    );
  });
  test('Test case user is undefined ', async () => {
    useSelector.mockReturnValue(undefined);
    await act(async () => {
      render(<Wrapper />);
    });
    expect(screen.queryByTestId('user-profile')).not.toBeInTheDocument();
  });
  test('Open dropdown menu on clicking User Profile ', async () => {
    await act(async () => {
      render(<Wrapper />);
    });
    fireEvent.click(screen.queryByTestId('button-dropdown-menu'));
    expect(screen.queryByTestId('dropdown-menu')).toBeInTheDocument();
  });
  test('Sign out', async () => {
    await act(async () => {
      render(<Wrapper />);
    });
    fireEvent.click(screen.queryByTestId('button-dropdown-menu'));
    fireEvent.click(screen.queryByTestId('button-sign-out'));
    expect(signOutHandler).toHaveBeenCalledTimes(1);
  });
  // test('Open profile update form and submit with no change ', async () => {
  //   await act(async () => {
  //     render(<Wrapper />);
  //   });
  //   fireEvent.click(screen.queryByTestId('button-dropdown-menu'));
  //   fireEvent.click(screen.queryByTestId('button-open-update-form'));
  //   fireEvent.click(screen.queryByTestId('button2-submit-update-form'));
  //   fireEvent.click(screen.queryByTestId('button2-submit-update-form'));
  //   expect(screen.queryByTestId('alert')).toBeInTheDocument();
  // });
  // test('Open profile update form and close ', async () => {
  //   await act(async () => {
  //     render(<Wrapper />);
  //   });
  //   fireEvent.click(screen.queryByTestId('button-dropdown-menu'));
  //   fireEvent.click(screen.queryByTestId('button-open-update-form'));
  //   fireEvent.click(screen.queryByTestId('button-close-update-form'));
  //   expect(screen.queryByTestId('profile-update-form')).not.toBeInTheDocument();
  // });
});
