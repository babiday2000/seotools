import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import DisclaimerPage from './Disclaimer';
describe('DisclaimerPage', () => {
    it('renders the disclaimer page', () => {
        render(_jsx(HelmetProvider, { children: _jsx(MemoryRouter, { children: _jsx(DisclaimerPage, {}) }) }));
        expect(screen.getByRole('heading', { name: /disclaimer/i, level: 1 })).toBeInTheDocument();
    });
});
