import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AdsensePlaceholder } from '@/components/AdsensePlaceholder';
import { blogPosts } from '@/data/blog';

const BlogPage = () => {
  return (
    <>
      <Seo 
        title="SEO Blog | Tips, Guides, and News from Seotooler"
        description="Stay up-to-date with the latest trends in SEO. Read our expert guides, tips, and case studies to improve your search engine rankings."
      />
      <div className="space-y-12">
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4">The Seotooler Blog</h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Your source for expert insights, actionable tips, and the latest news in the world of SEO.
          </p>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {blogPosts.map((post) => (
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
            ))}
          </div>
          <aside className="lg:col-span-1 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li><Link to="/blog/category/seo-basics" className="text-muted-foreground hover:text-foreground">SEO Basics</Link></li>
                  <li><Link to="/blog/category/keyword-research" className="text-muted-foreground hover:text-foreground">Keyword Research</Link></li>
                  <li><Link to="/blog/category/link-building" className="text-muted-foreground hover:text-foreground">Link Building</Link></li>
                  <li><Link to="/blog/category/technical-seo" className="text-muted-foreground hover:text-foreground">Technical SEO</Link></li>
                </ul>
              </CardContent>
            </Card>
            <AdsensePlaceholder height={600} />
          </aside>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
