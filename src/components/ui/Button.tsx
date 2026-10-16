import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn, isExternal, isInternalRoute } from "@/lib/utils";

type Variant = "primary" | "glass" | "soft" | "link";
/** lg 58 · hero 52 · md 46 · sm 40/36 · xs 30 (heights in px) · adaptive: md on phones, lg from `sm` */
type Size = "lg" | "hero" | "md" | "sm" | "xs" | "adaptive";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  /** Trailing icon. On primary buttons (except sm) it sits in a dark circle. */
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = BaseProps & { href: string } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof BaseProps | "href"
  >;
type NativeButtonProps = BaseProps & { href?: never } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    keyof BaseProps
  >;
export type ButtonProps = LinkButtonProps | NativeButtonProps;

const variantClasses: Record<Variant, string> = {
  primary: "btn-primary",
  glass: "glass btn-glass",
  soft: "btn-soft justify-center",
  link: "gap-2 border-b border-accent-light/35 pb-1 text-accent-light transition-[border-color,gap] duration-200 hover:gap-3 hover:border-accent-light",
};

// Primary buttons with a trailing circle are asymmetric (tight right padding).
const primaryWithDot: Partial<Record<Size, string>> = {
  lg: "h-[58px] gap-4 pl-7 pr-[7px] text-base",
  hero: "h-[52px] gap-3.5 pl-[22px] pr-1.5 text-[15px]",
  md: "h-[46px] gap-2.5 pl-[18px] pr-1.5 text-sm",
  adaptive:
    "h-[46px] gap-2.5 pl-[18px] pr-1.5 text-sm sm:h-[58px] sm:gap-4 sm:pl-7 sm:pr-[7px] sm:text-base",
};

const dotClasses: Partial<Record<Size, string>> = {
  lg: "size-11 text-[18px]",
  hero: "size-10 text-[18px]",
  md: "size-[34px] text-[15px]",
  adaptive: "size-[34px] text-[15px] sm:size-11 sm:text-[18px]",
};

const sizeClasses: Record<Exclude<Variant, "link">, Partial<Record<Size, string>>> = {
  primary: {
    lg: "h-[58px] gap-3 px-7 text-base",
    hero: "h-[52px] gap-3 px-[22px] text-[15px]",
    md: "h-[46px] gap-3 px-5 text-sm",
    sm: "h-10 gap-2 px-[18px] text-sm",
    adaptive: "h-[46px] gap-3 px-5 text-sm sm:h-[58px] sm:px-7 sm:text-base",
  },
  glass: {
    lg: "h-[58px] gap-2 px-7 text-base",
    hero: "h-[52px] gap-2 px-[22px] text-[15px]",
    md: "h-[46px] gap-2 px-5 text-sm",
    adaptive: "h-[46px] gap-2 px-5 text-sm sm:h-[58px] sm:px-7 sm:text-base",
  },
  soft: {
    md: "h-[46px] gap-2 px-4 text-sm",
    sm: "h-9 gap-2 px-3.5 text-[13px] pointer-coarse:h-11",
    xs: "h-[30px] gap-1.5 px-3 text-xs",
  },
};

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", icon, className, children, ...rest } = props;
  const withDot = variant === "primary" && icon != null && size in dotClasses;

  const classes = cn(
    "inline-flex shrink-0 items-center whitespace-nowrap rounded-full font-medium select-none",
    variantClasses[variant],
    variant === "link"
      ? size === "sm" && "text-[15px]"
      : withDot
        ? primaryWithDot[size]
        : sizeClasses[variant][size],
    className,
  );

  const content = (
    <>
      {children}
      {icon != null &&
        (withDot ? <span className={cn("btn-primary-dot", dotClasses[size])}>{icon}</span> : icon)}
    </>
  );

  if (rest.href !== undefined) {
    const { href, ...anchorProps } = rest as Omit<LinkButtonProps, keyof BaseProps>;
    if (isInternalRoute(href)) {
      return (
        <Link href={href} className={classes} {...anchorProps}>
          {content}
        </Link>
      );
    }
    const externalProps =
      isExternal(href) && !href.startsWith("mailto:") ? { target: "_blank", rel: "noopener noreferrer" } : {};
    return (
      <a href={href} className={classes} {...externalProps} {...anchorProps}>
        {content}
      </a>
    );
  }

  const { type = "button", ...buttonProps } = rest as Omit<NativeButtonProps, keyof BaseProps>;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
