import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import PrivacyPolicyPage from './PrivacyPolicy';
describe('PrivacyPolicyPage', () => {
    it('renders the privacy policy page', () => {
        render(_jsx(HelmetProvider, { children: _jsx(MemoryRouter, { children: _jsx(PrivacyPolicyPage, {}) }) }));
        expect(screen.getByRole('heading', { name: /privacy policy/i, level: 1 })).toBeInTheDocument();
    });
});
