import { onAuthStateChanged } from 'firebase/auth';
import ProtectedContent from '../ProtectedContent';
import { render, screen } from '@testing-library/react';

jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn(),
}));
jest.mock('@utils/firebase', () => ({
  auth: undefined,
}));
jest.mock('@content/Content', () => {
  const Content = () => {
    return <div data-testid='content'></div>;
  };
  return Content;
});
jest.mock('@components/ProtectedContent/Form/Form', () => {
  const Form = () => {
    return <div data-testid='form'></div>;
  };
  return Form;
});

describe('ProtectedContent component', () => {
  test('Render ProtectedContent in case: Authorization passed', () => {
    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback({ user: 'tester' });
    });
    render(<ProtectedContent />);
    expect(screen.queryByTestId('content')).toBeInTheDocument();
  });
  test('Render ProtectedContent in case: Authorization unpassed', () => {
    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback(undefined);
    });
    render(<ProtectedContent />);
    expect(screen.queryByTestId('form')).toBeInTheDocument();
  });
});
