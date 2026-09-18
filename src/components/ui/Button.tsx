import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm font-medium tracking-wide transition-[transform,opacity,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-b from-gold-300 to-gold-700 text-charcoal-950 shadow-elevated hover:shadow-floating hover:-translate-y-0.5",
  secondary:
    "border border-gold-500/40 text-warm-white hover:border-gold-300 hover:text-gold-100 hover:-translate-y-0.5",
  ghost: "text-warm-white/80 hover:text-gold-100 underline-offset-4 hover:underline",
};

interface CommonProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type LinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href"> & { href: string };

export function Button(props: ButtonProps | LinkProps) {
  const { variant = "primary", children, className } = props;
  const classes = clsx(base, variants[variant], className);

  if ("href" in props && props.href) {
    const { href, variant: _variant, children: _children, className: _className, ...rest } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...rest } = props as ButtonProps;
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
