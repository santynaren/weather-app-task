import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app', () => {
  const mockGeolocation = {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn()
  };

  (global.navigator as any).geolocation = mockGeolocation;


  render(<App />);

  const identificationText = screen.getByText(/Weather App/i);
  expect(identificationText).toBeInTheDocument();
});

test('renders weather component', () => {
  const mockGeolocation = {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn()
  };

  (global.navigator as any).geolocation = mockGeolocation;


  render(<App />);

  const weatherComponent = screen.getAllByTestId('weather');
  expect(weatherComponent).toBeTruthy();
});

test('renders city component', () => {
  const mockGeolocation = {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn()
  };

  (global.navigator as any).geolocation = mockGeolocation;


  render(<App />);

  const weatherComponent = screen.getAllByTestId('city');
  expect(weatherComponent).toBeTruthy();
});

