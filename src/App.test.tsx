import { render } from '@testing-library/react';
import App from './App';

test('renders app component', () => {
  const app = render(<App />);
  expect(app).toBeTruthy();
});
