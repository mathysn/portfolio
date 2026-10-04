import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { Children, isValidElement, type ComponentPropsWithoutRef, type ReactElement, type ReactNode } from "react";
import { CodeBlock, CodeFrame } from "@/components/mdx/CodeBlock";
import {
  Accordion,
  AccordionItem,
  Callout,
  Figure,
  LinkCard,
  Quote,
  Stats,
  Step,
  Steps,
  TechStack,
} from "@/components/mdx/MdxBlocks";
import { isExternal } from "@/lib/utils";

type DataProps = Record<string, unknown> & { children?: ReactNode };

const linkClass =
  "text-accent-light underline decoration-accent-light/40 underline-offset-4 transition-colors hover:text-accent-pale hover:decoration-accent-pale";

const components = {
  a: ({ href = "", children, ...props }: ComponentPropsWithoutRef<"a">) =>
    href.startsWith("/") ? (
      <Link href={href} className={linkClass} {...props}>
        {children}
      </Link>
    ) : (
      <a
        href={href}
        className={linkClass}
        {...(isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      >
        {children}
      </a>
    ),

  // Inline code only — code inside highlighted blocks carries data-language.
  code: (props: ComponentPropsWithoutRef<"code">) =>
    "data-language" in props ? (
      <code {...props} />
    ) : (
      <code
        className="rounded-md border border-white/8 bg-white/7 px-[7px] py-0.5 font-mono text-[.88em] text-accent-pale"
        {...props}
      />
    ),

  blockquote: ({ children }: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="mt-3.5 flex gap-4 font-display text-[clamp(22px,5.5vw,30px)] leading-[1.3] text-fg-soft italic">
      <span aria-hidden="true" className="font-display text-[64px] leading-[0.8] text-accent not-italic">
        “
      </span>
      <div>{children}</div>
    </blockquote>
  ),

  // ```fences → rehype-pretty-code <figure> → glass CodeFrame with title + copy.
  figure: ({ children, ...props }: DataProps) => {
    if (!("data-rehype-pretty-code-figure" in props)) return <figure {...props}>{children}</figure>;
    const nodes = Children.toArray(children) as ReactElement<DataProps>[];
    const caption = nodes.find((n) => isValidElement(n) && "data-rehype-pretty-code-title" in n.props);
    const body = nodes.filter((n) => n !== caption);
    const language = body.find((n) => isValidElement(n))?.props["data-language"] as string | undefined;
    return (
      <CodeFrame title={caption?.props.children} language={language}>
        {body}
      </CodeFrame>
    );
  },

  Accordion,
  AccordionItem,
  Callout,
  CodeBlock,
  Figure,
  LinkCard,
  Quote,
  Stats,
  Step,
  Steps,
  TechStack,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
