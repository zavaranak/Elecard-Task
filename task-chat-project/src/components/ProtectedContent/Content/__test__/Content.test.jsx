import { useDispatch, useSelector } from 'react-redux';
import Content from '../Content';
import styles from '../Content.module.scss';
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react';
import { LanguageContext, languageText } from '@utils/textContext';

const Wrapper = () => {
  return (
    <LanguageContext.Provider value={{ text: languageText.en }}>
      <Content />
    </LanguageContext.Provider>
  );
};

jest.mock('@content/CardView/CardView', () => {
  const CardView = ({ setView }) => {
    return (
      <div data-testid='card-view' onClick={() => setView('tree')}>
        Card View
      </div>
    );
  };
  return CardView;
});
jest.mock('@content/ChatPanel/ChatPanel', () => {
  const ChatPanel = () => {
    return <div>Chat Panel</div>;
  };
  return ChatPanel;
});
jest.mock('@content/TreeView/TreeView', () => {
  const TreeView = ({ setView }) => {
    return (
      <div data-testid='tree-view' onClick={() => setView('cards')}>
        Tree View
      </div>
    );
  };
  return TreeView;
});
jest.mock('@store/cardSlice', () => ({
  fetchCardAction: jest.fn(),
  selectStatus: 'mockSelectStatus',
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('Content Component', () => {
  beforeEach(() => {
    const mockUseSelector = jest.fn((selector) => {
      if (selector === 'mockSelectStatus') return 'good';
    });
    useDispatch.mockImplementation(() => {
      return jest.fn();
    });
    useSelector.mockImplementation(mockUseSelector);
  });
  test('Render Content Component with module scss', () => {
    render(<Wrapper />);
    expect(screen.queryByTestId('content').classList).toContain(styles.content);
  });
  test('Switch from card-view to tree-view', () => {
    render(<Wrapper />);
    fireEvent.click(screen.queryByTestId('card-view'));
    expect(screen.queryByTestId('tree-view')).toBeInTheDocument();
  });
  test('Alert disappear after 3s', () => {
    jest.useFakeTimers();
    render(<Wrapper />);
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(screen.queryByTestId('alert')).not.toBeInTheDocument();
    jest.useRealTimers();
  });
});
