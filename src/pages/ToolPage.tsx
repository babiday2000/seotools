import { useParams } from 'react-router-dom';
import { Seo } from '@/components/Seo';
import { tools, toolCategories } from '@/data/tools';
import { AdsensePlaceholder } from '@/components/AdsensePlaceholder';

type ToolCategoryKey = keyof typeof toolCategories;

const ToolPage = () => {
  const { category, slug } = useParams();
  const tool = tools.find(t => {
    const categorySlug = toolCategories[t.category as ToolCategoryKey]?.slug;
    return categorySlug === category && t.slug === slug;
  });

  if (!tool) {
    return <div>Tool not found</div>;
  }

  const ToolComponent = tool.component;

  return (
    <>
      <Seo 
        title={`${tool.name} | Seotooler`}
        description={tool.description}
      />
      <div className="space-y-12">
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4">{tool.name}</h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            {tool.description}
          </p>
        </section>

        <AdsensePlaceholder className="mx-auto" width="90%" height={90} />

        <section className="p-4 sm:p-6 md:p-8 border rounded-lg bg-card">
          <ToolComponent />
        </section>

        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: tool.longDescription }} />
            <aside className="space-y-6">
                <AdsensePlaceholder height={600} />
            </aside>
        </div>
      </div>
    </>
  );
};

export default ToolPage;
