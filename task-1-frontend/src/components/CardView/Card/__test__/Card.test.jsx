import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Card from '../Card';
import styles from '../Card.module.scss';
import * as reduxSpy from 'react-redux';
import { deleteCard } from '../../../../store/cardSlice';
import { act } from 'react';

jest.mock('../../../../store/cardSlice', () => ({ deleteCard: jest.fn() }));
jest.mock('react-redux', () => ({ useDispatch: jest.fn() }));
jest.mock('../../../Modal/Modal', () => {
  function MockModal(props) {
    const { url, setDisplay } = props;
    return (
      <div data-testid='modal' onClick={() => setDisplay(false)}>
        Modal {url}
      </div>
    );
  }
  return MockModal;
});
const cardInfo = {
  url: '/api/animals/animals-2939726__480.jpg',
  name: 'animals-2939726__480',
  filesize: '74353',
  category: 'animals',
  timestamp: 1393824669830,
};
describe('Card component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    cleanup();
    jest.useRealTimers();
    jest.clearAllMocks();
  });
  test('Render card with module scss', () => {
    render(<Card cardInfo={cardInfo} />);
    const card = screen.getByTestId('card');
    expect(card.classList).toContain(styles.card);
  });
  test('Render card at "cardInfo===undefined"', () => {
    render(<Card cardInfo={undefined} />);
    const error = screen.getByText(/unable to load image/i);
    expect(error).toBeInTheDocument();
  });
  test('Image load with correct url', () => {
    render(<Card cardInfo={cardInfo} />);
    const cardImg = screen.getByTestId('card-img');
    const image = cardImg.querySelector('img');
    expect(image.src).toContain(cardInfo.url);
  });
  test('Delete card', () => {
    const mockDispatch = jest.fn();
    jest.spyOn(reduxSpy, 'useDispatch').mockImplementation(() => mockDispatch);
    render(<Card cardInfo={cardInfo} />);
    const deleteButton = screen.getByTestId('card-delete');
    const card = screen.getByTestId('card');
    act(() => {
      fireEvent.click(deleteButton);
    });
    // Expect animation while deleting
    expect(card.classList).toContain(styles.card_deleted);
    // Expect delete card at redux-store by card name
    jest.advanceTimersByTime(1000);
    expect(mockDispatch).toHaveBeenCalledWith(deleteCard(cardInfo.name));
  });
  test('Click on suggestion to show Modal', () => {
    render(<Card cardInfo={cardInfo} />);
    const suggestion = screen.getByTestId('card-suggestion');
    fireEvent.click(suggestion);
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });
});
