import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MainHeader } from './Header';

describe('MainHeader', () => {
  beforeEach(() => {
    render(<MainHeader />);
  });
  test('renders the title', () => {
    const title = screen.getByText('EGG TIMER');
    expect(title).toBeInTheDocument();
  });
});