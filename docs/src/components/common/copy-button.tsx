'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

import { Button } from '../ui/button';

interface Props {
  text: string;
  className?: string;
}

const CopyButton = ({ text, className }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button
      onClick={handleCopy}
      className={cn(
        `group inline-flex cursor-pointer items-center gap-2 rounded-lg bg-neutral-500/20 px-3 py-1.5 text-xs font-medium text-neutral-800 transition-colors hover:bg-neutral-400/20 dark:bg-neutral-700/20 dark:text-neutral-50 dark:hover:bg-neutral-600/20`,
        className,
      )}
      aria-label="Copy code"
      type="button"
    >
      <span className="relative inline-flex h-5 w-5 items-center justify-center">
        <AnimatePresence initial={false} mode="wait">
          {copied ? (
            <motion.span
              key="check"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="absolute inset-0 inline-flex items-center justify-center"
            >
              <Check className="h-4 w-4" />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="absolute inset-0 inline-flex items-center justify-center"
            >
              <Copy className="h-4 w-4" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      {/* <span>{copied ? "Copied" : "Copy"}</span> */}
    </Button>
  );
};

export default CopyButton;
