import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders the input field and search button', () => {
  render(<App />);
  const inputElement = screen.getByTestId(/search-pokemon-input/i);
  const buttonElement = screen.getByTestId(/search-pokemon-button/i);
  const cardElement = screen.queryByTestId(/pokemon-card/i);

  expect(inputElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
  expect(cardElement).not.toBeInTheDocument();
});


test("renders pokemon card when valid pokemon is searched", async () => {
  render(<App />);

  const inputElement = screen.getByTestId(/search-pokemon-input/i);
  const buttonElement = screen.getByTestId(/search-pokemon-button/i);

  fireEvent.change(inputElement, { target: { value: "pikachu" } });
  fireEvent.click(buttonElement);

  const cardElement = await screen.findByTestId(/pokemon-card/i); 
  expect(cardElement).toBeInTheDocument();

});

test("shows error message when invalid pokemon is searched", async () => {
  render(<App />);

  const inputElement = screen.getByTestId(/search-pokemon-input/i);
  const buttonElement = screen.getByTestId(/search-pokemon-button/i);

  fireEvent.change(inputElement, { target: { value: "pikashu" } });
  fireEvent.click(buttonElement);

  const cardElement = screen.queryByTestId(/pokemon-card/i);
  expect(cardElement).not.toBeInTheDocument();

});
