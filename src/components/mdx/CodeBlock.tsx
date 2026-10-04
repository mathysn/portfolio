import type { ReactNode } from "react";
import { codeToHtml, type ThemeRegistration } from "shiki";
import theme from "@/lib/shiki-theme.json";
import { CopyButton } from "./CopyButton";

const UNNUMBERED = new Set(["bash", "sh", "shell", "zsh", "console", "plaintext", "text", "txt"]);

/** Glass frame shared by ```fences (rehype-pretty-code) and <CodeBlock>. */
export function CodeFrame({ title, language, children }: { title?: ReactNode; language?: string; children: ReactNode }) {
  const numbered = !UNNUMBERED.has(language ?? "plaintext");
  return (
    <div data-code-frame="" data-numbered={numbered ? "" : undefined} className="glass my-2 overflow-hidden rounded-[18px]">
      <div className="flex items-center justify-between gap-4 border-b border-white/7 py-3 pr-4 pl-5 font-mono text-xs text-muted">
        <span className="truncate">{title ?? language}</span>
        <CopyButton size="xs" />
      </div>
      {children}
    </div>
  );
}

/** "5" or "1-3,7" → Set{1,2,3,7} */
function parseLines(spec?: string) {
  const lines = new Set<number>();
  for (const part of spec?.split(",") ?? []) {
    const [start, end = start] = part.split("-").map((n) => Number.parseInt(n, 10));
    for (let i = start; i <= end; i++) lines.add(i);
  }
  return lines;
}

type CodeBlockProps = {
  code: string;
  lang?: string;
  title?: string;
  /** Highlighted lines, e.g. "5" or "1-3,7". */
  highlight?: string;
};

/** JSX alternative to fenced code blocks, for MDX: <CodeBlock title="…" highlight="5" code={`…`} /> */
export async function CodeBlock({ code, lang = "ts", title, highlight }: CodeBlockProps) {
  const highlighted = parseLines(highlight);
  const html = await codeToHtml(code.trim(), {
    lang,
    theme: theme as ThemeRegistration,
    transformers: [
      {
        pre(node) {
          delete node.properties.style;
        },
        line(node, line) {
          node.properties["data-line"] = "";
          if (highlighted.has(line)) node.properties["data-highlighted-line"] = "";
        },
      },
    ],
  });

  return (
    <CodeFrame title={title} language={lang}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </CodeFrame>
  );
}
