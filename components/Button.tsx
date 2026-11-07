import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const variants = {
  dark: "bg-ink text-paper",
  light: "bg-paper text-ink",
  "outline-light": "border border-paper/80 text-paper",
  outline: "border border-ink/70 text-ink",
};

type Props = {
  href?: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
} & Omit<ComponentProps<"button">, "children" | "className">;

/** Pill button whose label rolls up on hover. */
export function Button({ href, children, variant = "dark", className = "", ...rest }: Props) {
  const label = (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-500 ease-soft group-hover:-translate-y-full group-focus-visible:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-soft group-hover:translate-y-0 group-focus-visible:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
  const cls = `group inline-flex h-11 shrink-0 items-center justify-center rounded-full px-[22px] text-label leading-none whitespace-nowrap ${variants[variant]} ${className}`;
  return href ? (
    <Link href={href} className={cls}>
      {label}
    </Link>
  ) : (
    <button className={cls} {...rest}>
      {label}
    </button>
  );
}
