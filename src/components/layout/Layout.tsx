import React from 'react';
import Header from './Header';
import Footer from './Footer';
import RelatedTools from '../RelatedTools';
import { useLocation } from 'react-router-dom';
import { tools, toolCategories } from '@/data/tools';

type ToolCategoryKey = keyof typeof toolCategories;

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);
  const isToolPage = pathParts[0] === 'tools' && pathParts.length === 3;

  let category = '';
  let currentToolName = '';

  if (isToolPage) {
    const tool = tools.find(t => {
      const categorySlug = toolCategories[t.category as ToolCategoryKey]?.slug;
      return categorySlug === pathParts[1] && t.slug === pathParts[2];
    });

    if (tool) {
      category = tool.category;
      currentToolName = tool.name;
      console.log('Category:', category);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
        {isToolPage && category !== 'domain-ip-tools' && <RelatedTools category={category} currentToolName={currentToolName} />}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
