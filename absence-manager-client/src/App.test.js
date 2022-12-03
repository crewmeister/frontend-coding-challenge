import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import App from './App';

const middlewares = [thunk];

test('renders learn react link', () => {
  const initialState = { absences: { data: []} };
  const mockStore = configureStore(middlewares);
  const store = mockStore(initialState);

  render(<Provider store={store}><App /></Provider>);
  const linkElement = screen.getByText(/Absence Manager/i);
  expect(linkElement).toBeInTheDocument();
});
