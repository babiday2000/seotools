import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import DisclaimerPage from './Disclaimer';

describe('DisclaimerPage', () => {
  it('renders the disclaimer page', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <DisclaimerPage />
        </MemoryRouter>
      </HelmetProvider>
    );
    expect(screen.getByRole('heading', { name: /disclaimer/i, level: 1 })).toBeInTheDocument();
  });
});
