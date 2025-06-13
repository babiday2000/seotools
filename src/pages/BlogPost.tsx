import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import matter from 'gray-matter';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Seo } from '@/components/Seo';
import { AdsensePlaceholder } from '@/components/AdsensePlaceholder';
import { blogPosts } from '@/data/blog';

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (post) {
      import(`../content/${post.slug}.md`)
        .then(res => {
          fetch(res.default)
            .then(response => response.text())
            .then(text => {
              const { content } = matter(text);
              setContent(content);
            })
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
    }
  }, [post]);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <Seo 
        title={post.title}
        description={post.description}
        type="article"
      />
      <div className="max-w-4xl mx-auto">
        <article className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <header className="mb-8">
              <div className="flex gap-2 mb-4">
                {post.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4">{post.title}</h1>
              <div className="flex items-center space-x-4 text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={post.authorAvatar} />
                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{post.author}</span>
                </div>
                <span>•</span>
                <span>{post.date}</span>
              </div>
            </header>
            <img src={post.imageUrl} alt={post.title} className="w-full rounded-lg mb-8" />
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </div>
          </div>
          <aside className="lg:col-span-1 space-y-8">
            <AdsensePlaceholder height={250} />
            <Card>
              <CardHeader>
                <CardTitle>Related Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li><Link to="/blog/mastering-keyword-research-ultimate-guide" className="text-muted-foreground hover:text-foreground">Mastering Keyword Research</Link></li>
                  <li><Link to="/blog/ultimate-guide-youtube-tools-creators" className="text-muted-foreground hover:text-foreground">The Ultimate Guide to YouTube Tools for Creators</Link></li>
                </ul>
              </CardContent>
            </Card>
            <AdsensePlaceholder height={250} />
          </aside>
        </article>
      </div>
    </>
  );
};

export default BlogPostPage;
