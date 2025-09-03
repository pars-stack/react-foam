import React from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, Github } from 'lucide-react';
import CopyButton from '@/components/common/copy-button';
import Link from 'next/link';
const GettingStartedSection = () => {
  const bashText = 'npm install react-foam';
  return (
    <section
      id="get-started"
      className="from-primary to-secondary bg-gradient-to-br py-20"
    >
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-primary-foreground mb-4 text-3xl font-bold sm:text-4xl">
          Ready to Get Started?
        </h2>
        <p className="text-primary-foreground/80 mx-auto mb-8 max-w-2xl text-xl">
          Install React Foam and start building better React applications today.
        </p>

        <div className="relative mx-auto mb-8 max-w-2xl rounded-lg bg-black/20 p-6">
          <CopyButton
            text={bashText}
            className="absolute top-1/2 right-3 -translate-y-1/2 not-dark:text-neutral-50"
          />
          <code className="text-lg text-white">{bashText}</code>
        </div>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/docs">
            <Button size="lg" className="cursor-pointer" variant="default">
              <BookOpen className="mr-2 h-5 w-5" />
              Read Documentation
            </Button>
          </Link>
          <Link href="https://github.com/pars-stack/react-foam" target="_blank">
            <Button
              size="lg"
              variant="outline"
              className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary cursor-pointer"
            >
              <Github className="mr-2 h-5 w-5" />
              View on GitHub
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GettingStartedSection;
