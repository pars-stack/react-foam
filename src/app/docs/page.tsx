"use client";

import DocSection from "@/components/template/docs/doc-section";
import Sidebar from "@/components/template/layout/sidebar";
import { Button } from "@/components/ui/button";
import docsData from "@/data/docs-data.json";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function DocsPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Sidebar */}
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

        {/* Main content */}
        <main className="lg:col-span-3 prose prose-lg max-w-none text-foreground">
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
      <div className="lg:hidden fixed top-0 left-0 w-full bg-background border-b border-border px-4 py-3 flex justify-between items-center z-50">
        <h1 className="text-xl font-bold">Docs</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setMobileOpen(true)}
          className="border-border"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
