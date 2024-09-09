import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import ButtonDownload from '../ButtonDownload';
import { useDispatch } from 'react-redux';

jest.mock('@components/Alert/Alert', () => {
  return jest.fn(({ status }) => status); // Mock implementation
});

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(() => jest.fn()),
}));
jest.mock('@store/appSlice', () => ({
  setAlertStatus: jest.fn(),
}));
const url = '/api/health/covid-5905183__480.jpg';
const name = 'covid-5905183__480';
let mockClick;
let mockCreateElement;

describe('ButtonDownload Component', () => {
  beforeEach(() => {
    //mock proccess creating tag '<a href=url download=filename click=function>'
    mockClick = jest.fn();
    mockCreateElement = jest.fn(() => ({
      href: '',
      download: '',
      click: mockClick,
    }));
  });
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });
  test('Render Download Icon', () => {
    render(<ButtonDownload url={url} name={name} />);
    const buttonDownload = screen.getByTestId('button-download');
    expect(buttonDownload).toBeInTheDocument();
  });

  test('Download image by click event', () => {
    render(<ButtonDownload url={url} name={name} />);
    jest.spyOn(document, 'createElement').mockImplementation(mockCreateElement);
    jest.spyOn(document.body, 'appendChild').mockImplementation(() => {});

    fireEvent.click(screen.getByTestId('button-download'));
    expect(mockClick).toHaveBeenCalled();
  });
  test('Download image at "url===undefined"', () => {
    render(<ButtonDownload url={undefined} name={name} />);
    jest.spyOn(document, 'createElement').mockImplementation(mockCreateElement);
    jest.spyOn(document.body, 'appendChild').mockImplementation(() => {});

    fireEvent.click(screen.getByTestId('button-download'));
    expect(document.createElement).not.toHaveBeenCalled();
  });
  test('Download image at "name===undefined"', () => {
    render(<ButtonDownload url={url} name={undefined} />);
    jest.spyOn(document, 'createElement').mockImplementation(mockCreateElement);
    jest.spyOn(document.body, 'appendChild').mockImplementation(() => {});

    fireEvent.click(screen.getByTestId('button-download'));

    //get created by mock <a> tag and check attribute 'download'
    const anchor = mockCreateElement.mock.results[0].value;
    expect(anchor.download).toBe('unnamed_image');
  });
});
