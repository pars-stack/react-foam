'use client';

import DocSection from '@/components/template/docs/doc-section';
import Sidebar from '@/components/template/layout/sidebar';
import { Button } from '@/components/ui/button';
import docsData from '@/data/docs-data.json';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export default function DocsPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:px-8">
        {/* Sidebar */}
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

        {/* Main content */}
        <main className="prose prose-lg text-foreground max-w-none lg:col-span-3">
          {docsData.map((section, i) => (
            <DocSection
              key={i}
              id={section.id}
              title={section.title}
              sections={section.sections}
            />
          ))}
        </main>
      </div>

      {/* Mobile Header */}
      <div className="bg-background border-border fixed top-0 left-0 z-50 flex w-full items-center justify-between border-b px-4 py-3 lg:hidden">
        <h1 className="text-xl font-bold">Docs</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setMobileOpen(true)}
          className="border-border"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
