import { render, screen } from '@testing-library/react';
import Header from '../Header';
import styles from '../Header.module.scss';
import { LanguageContext, languageText } from '@utils/textContext';

jest.mock('../Buttons/Buttons', () => {
  const Buttons = () => {
    return <div>Buttons</div>;
  };
  return Buttons;
});

const Wrapper = () => {
  return (
    <LanguageContext.Provider value={{ text: languageText.en }}>
      <Header />
    </LanguageContext.Provider>
  );
};

describe('Header Component', () => {
  test('Render Header component with module scss', () => {
    render(<Wrapper />);
    expect(screen.getByTestId('header').classList).toContain(styles.header);
  });
  test('Text in Header', () => {
    render(<Wrapper />);
    expect(
      screen.queryByText(/intern task summer 2024 - elecard/i)
    ).toBeInTheDocument();
  });
});
