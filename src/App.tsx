import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/Home';
import { Toaster } from '@/components/ui/sonner';

// Lazy load non-critical pages for better performance
const AboutPage = lazy(() => import('@/pages/About'));
const ToolsDirectoryPage = lazy(() => import('@/pages/Tools'));
const ToolCategoryPage = lazy(() => import('@/pages/ToolCategoryPage'));
const ToolPage = lazy(() => import('@/pages/ToolPage'));
const BlogPage = lazy(() => import('@/pages/Blog'));
const BlogPostPage = lazy(() => import('@/pages/BlogPost'));
const BlogCategoryPage = lazy(() => import('@/pages/BlogCategoryPage'));
const ContactPage = lazy(() => import('@/pages/Contact'));
const PrivacyPolicyPage = lazy(() => import('@/pages/PrivacyPolicy'));
const TermsAndConditionsPage = lazy(() => import('@/pages/TermsAndConditions'));
const DisclaimerPage = lazy(() => import('@/pages/Disclaimer'));

// Enhanced loading component with better UX
const LoadingSpinner = () => (
  <div className="loading-placeholder" role="status" aria-label="Loading">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    <span className="ml-2 text-sm text-muted-foreground">Loading...</span>
  </div>
);

function App() {
  // Performance monitoring
  useEffect(() => {
    // Report Web Vitals for monitoring
    import('web-vitals').then((webVitals) => {
      if (process.env.NODE_ENV === 'development') {
        webVitals.onCLS(console.log);
        webVitals.onINP(console.log); // FID is replaced with INP in v5
        webVitals.onFCP(console.log);
        webVitals.onLCP(console.log);
        webVitals.onTTFB(console.log);
      }
    }).catch(() => {
      // Silently handle if web-vitals is not available
    });
  }, []);

  return (
    <>
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/tools" element={<ToolsDirectoryPage />} />
            <Route path="/tools/:category" element={<ToolCategoryPage />} />
            <Route path="/tools/:category/:slug" element={<ToolPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/category/:categoryName" element={<BlogCategoryPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
          </Routes>
        </Suspense>
      </Layout>
      <Toaster />
    </>
  );
}

export default App;
