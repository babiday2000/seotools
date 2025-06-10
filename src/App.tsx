import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/Home';
import AboutPage from '@/pages/About';
import ToolsDirectoryPage from '@/pages/Tools';
import ToolCategoryPage from '@/pages/ToolCategoryPage';
import ToolPage from '@/pages/ToolPage';
import BlogPage from '@/pages/Blog';
import BlogPostPage from '@/pages/BlogPost';
import ContactPage from '@/pages/Contact';
import PrivacyPolicyPage from '@/pages/PrivacyPolicy';
import TermsAndConditionsPage from '@/pages/TermsAndConditions';
import DisclaimerPage from '@/pages/Disclaimer';
import { Toaster } from '@/components/ui/sonner';
import { Progress } from '@/components/ui/progress';

function App() {
  return (
    <>
      <Layout>
        <Suspense fallback={<div className="flex items-center justify-center h-64"><Progress value={50} className="w-1/2" /></div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/tools" element={<ToolsDirectoryPage />} />
            <Route path="/tools/:category" element={<ToolCategoryPage />} />
            <Route path="/tools/:category/:slug" element={<ToolPage />} />
            <Route path="/blog" element={<BlogPage />} />
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
