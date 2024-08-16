import Form from '../Form';
import styles from '../Form.module.scss';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { LanguageContext, languageText } from '@utils/textContext';

jest.mock('@utils/firebase.js', () => ({}));

const Wrapper = () => {
  return (
    <LanguageContext.Provider value={{ text: languageText.en }}>
      <Form />
    </LanguageContext.Provider>
  );
};

describe('Form component', () => {
  afterEach(cleanup);
  test('Render form and apply module scss correctly', () => {
    render(<Wrapper />);
    expect(screen.queryByTestId('form').classList).toContain(styles.form);
  });
  test('Open sign in form', () => {
    render(<Wrapper />);
    fireEvent.click(screen.queryByTestId('open-sign-in-form'));
    expect(screen.queryByTestId('sign-in-form')).toBeInTheDocument();
  });
  test('Open sign up form', () => {
    render(<Wrapper />);
    fireEvent.click(screen.queryByTestId('open-sign-up-form'));
    expect(screen.queryByTestId('sign-up-form')).toBeInTheDocument();
  });
});
