import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { blogPosts } from '@/data/blog';

const BlogCategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();

  if (!categoryName) {
    return <div>Category not found.</div>;
  }

  const filteredPosts = blogPosts.filter(post => 
    post.tags.map(tag => tag.toLowerCase().replace(/ /g, '-')).includes(categoryName)
  );

  const categoryTitle = categoryName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <>
      <Seo 
        title={`${categoryTitle} | SEO Blog`}
        description={`Browse blog posts in the ${categoryTitle} category.`}
      />
      <div className="space-y-8">
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4">
            Category: {categoryTitle}
          </h1>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <Card key={post.slug} className="overflow-hidden">
                  <Link to={`/blog/${post.slug}`}>
                    <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover" />
                  </Link>
                  <CardHeader>
                    <div className="flex gap-2 mb-2">
                      {post.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                    </div>
                    <CardTitle>
                      <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription>{post.author} • {post.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{post.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Link to={`/blog/${post.slug}`} className="flex items-center font-semibold text-primary hover:underline">
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <p>No posts found in this category.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCategoryPage;
