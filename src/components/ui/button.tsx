import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "quiet";
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type LinkButtonProps = {
  children: ReactNode;
  variant?: "primary" | "quiet";
  className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const classes = (variant: "primary" | "quiet", className = "") =>
  `button-${variant} ${className}`.trim();

export function Button({ children, variant = "primary", className, ...props }: ButtonProps) {
  return <button className={classes(variant, className)} {...props}>{children}</button>;
}

export function LinkButton({ children, variant = "primary", className, ...props }: LinkButtonProps) {
  return <a className={classes(variant, className)} {...props}>{children}</a>;
}
