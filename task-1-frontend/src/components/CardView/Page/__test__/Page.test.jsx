import { cleanup, render, screen } from '@testing-library/react';
import Page from '../Page';
import styles from '../Page.module.scss';
import { useSelector } from 'react-redux';

let start, end;
const data = [
  { name: 'card1', timestamp: '1' },
  { name: 'card2', timestamp: '2' },
  { name: 'card3', timestamp: '3' },
  { name: 'card4', timestamp: '4' },
  { name: 'card5', timestamp: '5' },
];

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

jest.mock('@store/cardSlice', () => ({
  selectCardsInRange: jest.fn((a, b) => {
    start = a;
    end = b;
    return 'selectInRange';
  }),
}));

jest.mock('@components/CardView/Card/Card', () => {
  const Card = (props) => {
    const { name, timestamp } = props.cardInfo;
    return (
      <div data-testid={`card-${name}`}>
        Name: {name} Date:{timestamp}
      </div>
    );
  };
  return Card;
});

describe('Page component', () => {
  beforeEach(() => {
    const mockSelector = jest.fn((selector) => {
      if (selector === 'selectInRange') {
        return data.slice(start, end);
      }
    });
    useSelector.mockImplementation(mockSelector);
  });
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  test('Render Page with module scss', () => {
    render(<Page pageNumb={1} imagePerPage={5} />);
    const page = screen.queryByTestId('page');
    expect(page.classList).toContain(styles.page);
  });
  test('Render Page at "props===undefined"', () => {
    render(<Page pageNumb={undefined} imagePerPage={undefined} />);
    const page = screen.queryByTestId('page');
    const cardsCount = page.childElementCount;
    expect(cardsCount).toEqual(0);
  });
});
