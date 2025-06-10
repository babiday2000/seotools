import { Link } from 'react-router-dom';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Seo } from '@/components/Seo';
import { toolCategories } from '@/data/tools';

const ToolsDirectoryPage = () => {
  return (
    <>
      <Seo 
        title="Free Online Tools | Seotooler"
        description="Explore our full suite of free online tools for SEO, web development, text analysis, image editing, and more. Everything you need in one place."
      />
      <div className="space-y-12">
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4">Our Suite of Free Tools</h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            From SEO analysis to text manipulation, we've got you covered. Explore the tools that will help you work smarter, not harder.
          </p>
        </section>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.values(toolCategories).map((category) => (
              <Link key={category.slug} to={`/tools/${category.slug}`} className="block hover:-translate-y-1 transition-transform duration-200">
                <Card className="h-full flex flex-col text-center items-center justify-center p-6">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 p-4 rounded-full mb-4">
                      {category.icon}
                    </div>
                    <CardTitle className="text-2xl">{category.name}</CardTitle>
                  </CardHeader>
                  <CardDescription className="text-base">{category.description}</CardDescription>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default ToolsDirectoryPage;
