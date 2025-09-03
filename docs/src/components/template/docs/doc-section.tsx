// components/DocSection.tsx
'use client';

import { CodeBlock } from '@/components/common/code-block';
import { useTheme } from 'next-themes';

interface DocBlock {
  type: 'paragraph' | 'snippet' | 'list' | string;
  text?: string; // HTML allowed for paragraph
  language?: string;
  code?: string;
  items?: string[]; // list items (with inline HTML allowed)
}

interface DocSubSection {
  id: string;
  title: string;
  blocks: DocBlock[];
}

interface DocSectionProps {
  id: string;
  title: string;
  sections: DocSubSection[];
}

export default function DocSection({ id, title, sections }: DocSectionProps) {
  const { theme } = useTheme();
  return (
    <section id={id} className="mb-12 scroll-mt-24">
      <h2 className="mb-6 text-2xl font-semibold">{title}</h2>

      {sections.map((sub, i) => (
        <div key={i} id={sub.id} className="mb-10 scroll-mt-20">
          <h3 className="mb-4 text-xl font-medium">{sub.title}</h3>

          {sub.blocks.map((block, j) => {
            if (block.type === 'paragraph' && block.text) {
              return (
                <div
                  key={j}
                  className="prose prose-slate my-4 max-w-none"
                  dangerouslySetInnerHTML={{ __html: block.text }}
                />
              );
            }

            if (block.type === 'list' && block.items) {
              return (
                <ul
                  key={j}
                  className="prose prose-slate my-4 max-w-none list-disc pl-6"
                >
                  {block.items.map((li, k) => (
                    <li key={k} dangerouslySetInnerHTML={{ __html: li }} />
                  ))}
                </ul>
              );
            }

            if (block.type === 'snippet' && block.code && block.language) {
              return (
                <CodeBlock
                  key={j}
                  language={block.language}
                  code={block.code}
                  theme={theme}
                />
              );
            }

            return null;
          })}
        </div>
      ))}
    </section>
  );
}
