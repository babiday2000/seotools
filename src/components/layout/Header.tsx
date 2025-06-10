import { NavLink } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Logo } from '../Logo';
import { ModeToggle } from '../mode-toggle';

const navLinks = [
  { to: '/tools', label: 'Tools' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Logo />
        </div>
        <div className="flex items-center md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="py-6">
                <Logo />
              </div>
              <nav className="grid gap-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `text-lg font-medium ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center">
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
