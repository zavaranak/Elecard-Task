import { render, screen } from '@testing-library/react';
import Footer from '../Footer';
import styles from '../Footer.module.scss';

describe('Footer Component', () => {
  test('Render Footer component with module scss', () => {
    render(<Footer />);
    expect(screen.getByTestId('footer').classList).toContain(styles.footer);
  });
  test('Text in Footer', () => {
    render(<Footer />);
    expect(
      screen.queryByText(/2024 Frontend with React by Dang/i)
    ).toBeInTheDocument();
  });
});
