import { useState } from 'react';
import { Logo } from '../Logo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { toolCategories } from '@/data/tools';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubscribe = async () => {
    setMessage('');
    setIsSuccess(false);
    setIsLoading(true);
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setIsSuccess(true);
        setEmail('');
      } else {
        setMessage(data.message || 'Something went wrong.');
        setIsSuccess(false);
      }
    } catch (error) {
      console.error(error);
      setMessage('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-muted-foreground text-sm">
              Powerful & Simple SEO Tools to boost your ranking.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground"><Github size={20} /></a>
              <a href="#" className="text-muted-foreground hover:text-foreground"><Twitter size={20} /></a>
              <a href="#" className="text-muted-foreground hover:text-foreground"><Linkedin size={20} /></a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Tools</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {Object.values(toolCategories).slice(0, 5).map((category) => (
                <li key={category.slug}>
                  <Link to={`/tools/${category.slug}`} className="text-muted-foreground hover:text-foreground">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Company</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/tools" className="text-muted-foreground hover:text-foreground">Tools</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
              <li><Link to="/privacy-policy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="text-muted-foreground hover:text-foreground">Terms & Conditions</Link></li>
              <li><Link to="/disclaimer" className="text-muted-foreground hover:text-foreground">Disclaimer</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Stay Updated</h3>
            <p className="mt-4 text-sm text-muted-foreground">Subscribe to our newsletter for the latest SEO tips and tool updates.</p>
            <div className="mt-4 flex w-full max-w-sm items-center space-x-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
              <Button type="button" onClick={handleSubscribe} disabled={isLoading}>
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </div>
            {message && (
              <p className={`mt-2 text-sm ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
                {message}
              </p>
            )}
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Seotooler. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
