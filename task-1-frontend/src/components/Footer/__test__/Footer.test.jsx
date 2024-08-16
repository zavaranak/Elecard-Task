import { render, screen } from '@testing-library/react';
import Footer from '../Footer';
import styles from '../Footer.module.scss';
import { LanguageContext, languageText } from '@utils/textContext';

const Wrapper = () => {
  return (
    <LanguageContext.Provider value={{ text: languageText.en }}>
      <Footer />
    </LanguageContext.Provider>
  );
};

describe('Footer Component', () => {
  test('Render Footer component with module scss', () => {
    render(<Wrapper />);
    expect(screen.getByTestId('footer').classList).toContain(styles.footer);
  });
  test('Text in Footer', () => {
    render(<Wrapper />);
    expect(
      screen.queryByText(/© 2024 frontend by react - dang/i)
    ).toBeInTheDocument();
  });
});
