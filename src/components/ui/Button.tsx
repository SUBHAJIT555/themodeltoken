import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "outline" | "signup" | "ghost";
type ButtonSize = "sm" | "lg";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--th-accent)] text-[var(--th-text-on-accent)] hover:bg-[var(--th-accent-hover)]",
  outline:
    "border border-black/15 bg-transparent text-[var(--th-heading)] hover:bg-black/5",
  signup:
    "bg-[var(--th-signup)] text-white hover:bg-[var(--th-signup)]",
  ghost:
    "bg-transparent text-[var(--th-text-secondary)] hover:text-[var(--th-text-primary)]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  lg: "h-10 px-4 text-base",
};

type SharedProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

type ButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = SharedProps & {
  href: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  children,
  className,
  variant = "primary",
  size = "lg",
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-[var(--th-radius-button)] font-medium transition-colors duration-200 ease-out disabled:pointer-events-none disabled:opacity-50",
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;

  return (
    <button
      className={classes}
      type={buttonProps.type ?? "button"}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
