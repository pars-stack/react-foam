import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Download, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import logoHuge from '@/assets/images/logo-huge.png';
const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      <div className="absolute -right-[200px] bottom-1/2 z-10 flex h-100 w-100 translate-y-1/2 items-center justify-center opacity-75 max-lg:opacity-20 max-sm:opacity-10">
        <Image
          className="animate-spin [animation-duration:120s]"
          src={logoHuge}
          alt="react foam logo"
          width={400}
          height={400}
        />
      </div>
      <div className="from-background-variant via-background to-background-accent absolute inset-0 bg-gradient-to-br" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-left">
          <div className="mb-6 flex justify-start">
            <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary">
              <Star className="mr-1 h-3 w-3" />
              Lightweight State Management
            </Badge>
          </div>
          <h1 className="text-foreground mb-6 text-4xl font-bold sm:text-6xl">
            State Management
            <span className="from-primary to-secondary block bg-gradient-to-r bg-clip-text text-transparent">
              Made Simple
            </span>
          </h1>
          <p className="text-muted-foreground mr-auto mb-8 max-w-3xl text-xl">
            React Foam is a lightweight, TypeScript-first state management
            library that eliminates boilerplate while providing exceptional
            performance and developer experience.
          </p>
          <div className="flex flex-col justify-start gap-4 sm:flex-row">
            <Link href="#get-started">
              <Button
                size="lg"
                className="from-primary to-secondary cursor-pointer bg-gradient-to-r hover:opacity-90"
              >
                <Download className="mr-2 h-5 w-5" />
                Get Started
              </Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" className="cursor-pointer" variant="outline">
                <BookOpen className="mr-2 h-5 w-5" />
                View Documentation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
