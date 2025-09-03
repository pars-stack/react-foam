import { Badge } from '@/components/ui/badge';
import { BookOpen, Github } from 'lucide-react';
import Link from 'next/link';

import Logo from '../logo';
import { ThemeToggle } from '../toggle-mode';
import pkg from '../../../../package.json';

const Header = () => {
  return (
    <header className="sticky top-0 z-50">
      <nav className="bg-background/80 sticky top-0 z-50 border-b backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Logo />
              <Badge
                variant="secondary"
                className="bg-secondary/50 hidden sm:inline-flex"
              >
                v{pkg.version}
              </Badge>
              <ThemeToggle />
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/docs"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <BookOpen className="h-5 w-5" />
              </Link>
              <Link
                href="https://github.com/pars-stack/react-foam"
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
