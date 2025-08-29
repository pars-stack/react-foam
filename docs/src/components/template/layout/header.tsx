import { Badge } from '@/components/ui/badge'
import { BookOpen, Github } from 'lucide-react'
import Link from 'next/link'
import Logo from '../logo'
import { ThemeToggle } from '../toggle-mode'
import pkg from '../../../../package.json';


const Header = () => {
  return (
    <header className='sticky top-0 z-50'>
      <nav className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Logo />
              <Badge variant="secondary" className="hidden bg-secondary/50 sm:inline-flex">
                v{pkg.version}
              </Badge>
              <ThemeToggle />
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                <BookOpen className="w-5 h-5" />
              </Link>
              <Link href="https://github.com/pars-stack/react-foam" target='_blank' className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header