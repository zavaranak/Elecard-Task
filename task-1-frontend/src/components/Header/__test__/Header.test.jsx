import { render, screen } from '@testing-library/react';
import Header from '../Header';
import styles from '../Header.module.scss';

describe('Header Component', () => {
  test('Render Header component with module scss', () => {
    render(<Header />);
    expect(screen.getByTestId('header').classList).toContain(styles.header);
  });
  test('Text in Header', () => {
    render(<Header />);
    expect(
      screen.queryByText(/Intern Task Summer 2024 - Elecard/i)
    ).toBeInTheDocument();
  });
});
