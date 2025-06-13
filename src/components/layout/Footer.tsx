import { Logo } from '../Logo';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { toolCategories } from '@/data/tools';
import { Link } from 'react-router-dom';

const Footer = () => {

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
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
            <h3 className="font-semibold text-foreground">Tools Category</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/tools/seo-tools" className="text-muted-foreground hover:text-foreground">SEO</Link></li>
              <li><Link to="/tools/web-development-tools" className="text-muted-foreground hover:text-foreground">Web</Link></li>
              <li><Link to="/tools/web-development-tools" className="text-muted-foreground hover:text-foreground">Dev</Link></li>
              <li><Link to="/tools/youtube-tools" className="text-muted-foreground hover:text-foreground">YouTube</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">Best Software</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/tools/youtube-tools" className="text-muted-foreground hover:text-foreground">YouTube Tools</Link></li>
              <li><Link to="/tools/seo-tools" className="text-muted-foreground hover:text-foreground">Trending Tools</Link></li>
              <li><Link to="/tools/text-tools" className="text-muted-foreground hover:text-foreground">Text Tools</Link></li>
              <li><Link to="/tools/image-editing-tools" className="text-muted-foreground hover:text-foreground">Image Tools</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">Blog</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/blog" className="text-muted-foreground hover:text-foreground">All Posts</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-foreground">SEO Tips</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-foreground">YouTube Growth</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-foreground">Web Development</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">Company</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link to="/privacy-policy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
              <li><Link to="/disclaimer" className="text-muted-foreground hover:text-foreground">Disclaimer</Link></li>
              <li><Link to="/terms-and-conditions" className="text-muted-foreground hover:text-foreground">Terms of Services</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Report</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact Us</Link></li>
            </ul>
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
