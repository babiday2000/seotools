import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import PrivacyPolicyPage from './PrivacyPolicy';

describe('PrivacyPolicyPage', () => {
  it('renders the privacy policy page', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <PrivacyPolicyPage />
        </MemoryRouter>
      </HelmetProvider>
    );
    expect(screen.getByRole('heading', { name: /privacy policy/i, level: 1 })).toBeInTheDocument();
  });
});
