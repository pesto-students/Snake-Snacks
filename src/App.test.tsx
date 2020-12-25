/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  createHistory,
  createMemorySource,
  LocationProvider,
  LocationProviderRenderFn,
} from '@reach/router';
import App from './App';

function renderWithRouter(
  ui: any,
  { route = '/', history = createHistory(createMemorySource(route)) } = {},
) {
  return {
    ...render(<LocationProvider history={history}>{ui}</LocationProvider>),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  };
}

test('test whole routing', async () => {
  const {
    container,
    history: { navigate },
  } = renderWithRouter(<App />);
  let linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();

  // with reach-router we don't need to simulate a click event, we can just transition
  // to the page using the navigate function returned from the history object.
  await navigate('/game');
  linkElement = screen.getByTestId(/snake/i);
  expect(linkElement).toBeInTheDocument();
});
