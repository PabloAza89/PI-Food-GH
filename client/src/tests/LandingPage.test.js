// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from '../App.js';
import { Provider } from "react-redux"
import store from '../store/store.js';
import { BrowserRouter } from 'react-router-dom';

test('Renders LandingPage Component containing "Welcome to Foodify !" text', () => {  
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  const linkElement = screen.getByText("Welcome to Foodify !");
  expect(linkElement).toBeInTheDocument();
});