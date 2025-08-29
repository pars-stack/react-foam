import { Highlight, themes } from "prism-react-renderer";
import React from "react";
import CopyButton from "./copy-button";

type CodeBlockProps = {
  code: string;
  language:
  | "jsx"
  | "tsx"
  | "js"
  | "ts"
  | "json"
  | "bash"
  | "css"
  | "html"
  | (string);
  title?: string;
  wrap?: boolean;
  theme?: "dark" | "light" | string;
};

export function CodeBlock({
  code,
  language,
  title,
  wrap = false,
  theme = "dark",
}: CodeBlockProps) {
  const usedTheme = theme === "dark" ? themes.nightOwl : themes.github;

  return (
    <div className="rounded-2xl border border-neutral-200/70 dark:border-neutral-800/70 shadow-sm overflow-hidden bg-white/60 dark:bg-neutral-900/60 backdrop-blur">
      {/* Header */}
      <div className="flex h-10 items-center justify-between px-4 py-2 bg-neutral-100/70 dark:bg-neutral-800/60">
        <div className="flex items-center gap-2 text-sm">
          <span className="inline-flex size-2.5 rounded-full bg-rose-500" />
          <span className="inline-flex size-2.5 rounded-full bg-amber-500" />
          <span className="inline-flex size-2.5 rounded-full bg-emerald-500" />
          <span className="ml-3 font-medium tabular-nums opacity-80">
            {title ?? language}
          </span>
        </div>
        <CopyButton text={code} className="size-8" />
      </div>

      {/* Code */}
      <Highlight theme={usedTheme} code={code.trimEnd()} language={language as string}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`pretty-scrollbar ${className} m-0 p-4 text-[13px] leading-6 font-mono
                        ${wrap ? "whitespace-pre-wrap break-words" : "whitespace-pre"}
                        overflow-auto max-h-[28rem]`}
            style={style as React.CSSProperties}
          >
            <code className="inline-block min-w-full">
              {tokens.map((line, i) => (
                <div
                  key={i}
                  {...getLineProps({ line })}
                  className="table w-full table-fixed"
                >
                  {/* line numbers */}
                  <span className="table-cell w-12 pr-4 select-none text-right text-neutral-400">
                    {i + 1}
                  </span>
                  {/* line content */}
                  <span className="table-cell">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  );
}