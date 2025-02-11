import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EggTimer from './EggTimer';

describe('EggTimer', () => {
  beforeEach(() => {
    render(<EggTimer />);
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('renders cooking method buttons', () => {
    expect(screen.getByAltText('Hard Boiled')).toBeInTheDocument();
    expect(screen.getByAltText('Soft Boiled')).toBeInTheDocument();
    expect(screen.getByAltText('Poached')).toBeInTheDocument();
    expect(screen.getByAltText('Fried')).toBeInTheDocument();
  });
  test('renders initial timer state', () => {
    expect(screen.getByText('0:00')).toBeInTheDocument();
    expect(screen.getByText('Start Cooking')).toBeInTheDocument();
  });

  test('start button becomes disabled when timer is active', async () => {
    const startButton = screen.getByTestId('start-button');
    const hardBoiledImage = screen.getByTestId('hardBoiled');
    expect(startButton).toBeDisabled();
    fireEvent.click(hardBoiledImage);
    await waitFor(() => {
      expect(startButton).not.toBeDisabled();
      fireEvent.click(startButton);
      expect(startButton).toBeDisabled();
      expect(startButton).toHaveTextContent('Cooking...');
    });
  });

  test('stop button resets timer', async () => {
    const startButton = screen.getByText('Start Cooking');
    const stopButton = screen.getByText('Stop Cooking');
    const friedEggImage = screen.getByTestId('fried');
    expect(startButton).toBeDisabled();
    fireEvent.click(friedEggImage);
    await waitFor(() => {
      expect(startButton).not.toBeDisabled();
      fireEvent.click(startButton);
      fireEvent.click(stopButton);
      expect(screen.getByText('0:05')).toBeInTheDocument();
      expect(startButton).not.toBeDisabled();
    });
  });

  test('stop button is disabled when timer is not active', () => {
    const stopButton = screen.getByText('Stop Cooking');
    expect(stopButton).toBeDisabled();
  });
});