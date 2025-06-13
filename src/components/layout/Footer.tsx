import { Logo } from '../Logo';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Business Information */}
          <div className="md:col-span-1 space-y-4">
            <Logo />
            <p className="text-muted-foreground text-sm">
              Powerful & Simple SEO Tools to boost your ranking.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-foreground">Navigation</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
              <li><Link to="/tools" className="text-muted-foreground hover:text-foreground transition-colors">Tools</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-foreground">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="mailto:contact@seotooler.com" className="text-muted-foreground hover:text-foreground transition-colors">contact@seotooler.com</a></li>
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
