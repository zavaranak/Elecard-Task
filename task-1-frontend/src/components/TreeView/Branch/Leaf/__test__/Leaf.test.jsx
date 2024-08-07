import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Leaf from '../Leaf';
import styles from '../Leaf.module.scss';

const validItem = {
  name: 'item test',
  url: 'example.com',
  timestamp: 99999,
  filesize: 999,
};
const invalidItem = {
  name: undefined,
  url: undefined,
  timestamp: undefined,
  filesize: undefined,
};

jest.mock('@components/Modal/Modal', () => {
  const Modal = ({ url, setDisplay }) => {
    return (
      <div onClick={setDisplay} data-testid='modal'>
        Modal of {url}
      </div>
    );
  };
  return Modal;
});

describe('Leaf Component', () => {
  afterEach(cleanup);
  test('Render Leaf component with module scss', () => {
    render(<Leaf item={validItem} />);
    expect(screen.queryByTestId('leaf').classList).toContain(styles.leaf);
  });
  test('Render Leaf at "props===undefined"', () => {
    render(<Leaf item={invalidItem} />);
    expect(screen.queryByText(/Unknown/i)).toBeInTheDocument();
  });
  test('Open Modal by event click on leaf-image', () => {
    render(<Leaf item={validItem} />);
    expect(screen.getByTestId('leaf-image')).toBeInTheDocument();
    const image = screen.getByTestId('leaf-image');
    fireEvent.click(image);
    expect(screen.queryByTestId('modal')).toBeInTheDocument();
  });
});
