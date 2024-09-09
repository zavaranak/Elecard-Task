import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Leaf from '../Leaf';
import styles from '../Leaf.module.scss';
import { LanguageContext, languageText } from '@utils/textContext';

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

jest.mock('@content/Modal/Modal', () => {
  const Modal = ({ url, setDisplay }) => {
    return (
      <div onClick={setDisplay} data-testid='modal'>
        Modal of {url}
      </div>
    );
  };
  return Modal;
});
jest.mock('@content/ButtonDownload/ButtonDownload', () => {
  const ButtonDownload = () => {
    return <div>ButtonDownload</div>;
  };
  return ButtonDownload;
});

const Wrapper = (props) => {
  return (
    <LanguageContext.Provider value={{ text: languageText.en }}>
      <Leaf item={props.item} />
    </LanguageContext.Provider>
  );
};

describe('Leaf Component', () => {
  afterEach(cleanup);
  test('Render Leaf component with module scss', () => {
    render(<Wrapper item={validItem} />);
    expect(screen.queryByTestId('leaf').classList).toContain(styles.leaf);
  });
  test('Render Leaf at "props===undefined"', () => {
    render(<Wrapper item={invalidItem} />);
    expect(screen.queryByText(/Unknown/i)).toBeInTheDocument();
  });
  test('Open Modal by event click on leaf-image', () => {
    render(<Wrapper item={validItem} />);
    expect(screen.getByTestId('leaf-image')).toBeInTheDocument();
    const image = screen.getByTestId('leaf-image');
    fireEvent.click(image);
    expect(screen.queryByTestId('modal')).toBeInTheDocument();
  });
});
