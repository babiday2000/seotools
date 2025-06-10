import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import HomePage from './Home';

describe('HomePage', () => {
  const renderComponent = () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </HelmetProvider>
    );
  };

  it('renders the hero section with the main heading', () => {
    renderComponent();
    const heading = screen.getByRole('heading', {
      name: /Unlock Your YouTube Potential with Top-Tier SEO Tools/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders the features section with all features', () => {
    renderComponent();
    const featureHeadings = screen.getAllByRole('heading', {
      level: 2,
    });
    expect(featureHeadings[0]).toHaveTextContent('Everything You Need to Succeed on YouTube');
  });

  it('renders the testimonials section', () => {
    renderComponent();
    const testimonialHeading = screen.getByRole('heading', {
      name: /Loved by Creators Worldwide/i,
    });
    expect(testimonialHeading).toBeInTheDocument();
  });

  it('renders the FAQ section with questions', () => {
    renderComponent();
    const faqHeading = screen.getByRole('heading', {
      name: /Frequently Asked Questions/i,
    });
    expect(faqHeading).toBeInTheDocument();

    const question1 = screen.getByText(/What is Seotooler and how can it help my YouTube channel?/i);
    expect(question1).toBeInTheDocument();
  });
});
