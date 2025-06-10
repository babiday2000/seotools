import { Link, useParams } from 'react-router-dom';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Seo } from '@/components/Seo';
import { toolCategories, tools } from '@/data/tools';
import { ArrowRight } from 'lucide-react';

const ToolCategoryPage = () => {
  const { category: categorySlug } = useParams();
  
  const category = Object.values(toolCategories).find(c => c.slug === categorySlug);
  const categoryTools = tools.filter(tool => tool.category === categorySlug);

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <>
      <Seo 
        title={`${category.name} | Seotooler`}
        description={category.description}
      />
      <div className="space-y-12">
        <section className="text-center">
          <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
            {category.icon}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4">{category.name}</h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            {category.description}
          </p>
        </section>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryTools.map((tool) => (
              <Link key={tool.slug} to={`/tools/${category.slug}/${tool.slug}`} className="block hover:scale-105 transition-transform duration-200">
                <Card className="h-full flex flex-col justify-between">
                  <CardHeader>
                    <CardTitle>{tool.name}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <div className="p-6 pt-0 flex justify-end">
                     <ArrowRight className="h-5 w-5 text-primary" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default ToolCategoryPage;
