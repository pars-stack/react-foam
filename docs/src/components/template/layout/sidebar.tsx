/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronRight, ChevronDown, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import docsData from '@/data/docs-data.json';

interface SidebarProps {
  mobileOpen?: boolean;
  setMobileOpen?: (prev: boolean) => void;
}

const Sidebar = ({ mobileOpen, setMobileOpen }: SidebarProps) => {
  const [activeId, setActiveId] = useState<string>('introduction');
  const [openSectionId, setOpenSectionId] = useState<string | null>(
    docsData[0]?.id || null,
  );
  const [activeSectionId, setActiveSectionId] = useState<string | null>(
    docsData[0]?.id || null,
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentId = entry.target.id;
            setActiveId(currentId);

            const parentSection = docsData.find((section) =>
              section.sections.some((sub: any) => sub.id === currentId),
            );

            if (parentSection) {
              setActiveSectionId(parentSection.id);
              setOpenSectionId(parentSection.id); // ensure always open
            } else {
              // top-level section
              setActiveSectionId(currentId);
              setOpenSectionId(currentId);
            }
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' },
    );

    docsData.forEach((section) => {
      const sectionEl = document.getElementById(section.id);
      if (sectionEl) observer.observe(sectionEl);

      section.sections.forEach((sub: any) => {
        const el = document.getElementById(sub.id);
        if (el) observer.observe(el);
      });
    });

    return () => observer.disconnect();
  }, []);

  const toggleSection = (id: string) => {
    if (id === activeSectionId) {
      setOpenSectionId(id); // keep it open
      return;
    }

    setOpenSectionId((prev) => (prev === id ? null : id)); // collapse others
  };

  return (
    <aside
      className={cn(
        'bg-sidebar text-sidebar-foreground border-sidebar-border fixed top-16 left-0 z-40 -my-8 -ml-4 h-screen w-64 transform overflow-y-auto border-r p-4 shadow-lg transition-transform sm:-ml-6 lg:sticky lg:-ml-8 lg:h-[calc(100vh-4rem)] lg:shadow-none',
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      )}
    >
      <div className="mb-4 flex items-center justify-between lg:hidden">
        <h2 className="text-lg font-semibold">Contents</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setMobileOpen?.(false)}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <nav className="space-y-2">
        {docsData.map((section) => {
          const isOpen = openSectionId === section.id;
          return (
            <div key={section.id}>
              <button
                onClick={() => toggleSection(section.id)}
                className={cn(
                  'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold transition-all',
                  activeId === section.id || activeSectionId === section.id
                    ? 'bg-sidebar-primary/10 text-sidebar-primary border-sidebar-primary border-l-4'
                    : 'hover:bg-sidebar-accent/10 text-sidebar-foreground',
                )}
              >
                <span className="flex items-center">
                  {isOpen ? (
                    <ChevronDown className="mr-2 h-4 w-4" />
                  ) : (
                    <ChevronRight className="mr-2 h-4 w-4" />
                  )}
                  {section.title}
                </span>
              </button>

              {isOpen && (
                <div className="mt-1 ml-6 space-y-1">
                  {section.sections.map((sub: any) => (
                    <a
                      key={sub.id}
                      href={`#${sub.id}`}
                      onClick={() => setMobileOpen?.(false)}
                      className={cn(
                        'block rounded-md px-3 py-1 text-sm transition-all',
                        activeId === sub.id
                          ? 'bg-sidebar-primary/10 text-sidebar-primary font-medium'
                          : 'hover:bg-sidebar-accent/10 text-sidebar-foreground',
                      )}
                    >
                      {sub.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
