import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import TermsAndConditionsPage from './TermsAndConditions';

describe('TermsAndConditionsPage', () => {
  it('renders the terms and conditions page', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <TermsAndConditionsPage />
        </MemoryRouter>
      </HelmetProvider>
    );
    expect(screen.getByRole('heading', { name: /terms and conditions/i, level: 1 })).toBeInTheDocument();
  });
});
