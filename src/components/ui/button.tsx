import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import { cn } from "@/lib/cn";

const VARIANT = {
  pink: "bg-pink text-white",
  aqua: "bg-aqua text-ink",
  sun: "bg-sun text-ink",
  default: "bg-white text-ink",
} as const;

export type ButtonVariant = keyof typeof VARIANT;

const BASE = cn(
  "inline-block cursor-pointer rounded-pill border-[2.5px] border-ink no-underline",
  "px-6 py-[15px] font-display text-[14.5px] font-bold",
  "shadow-ink-md transition-[transform,box-shadow] duration-[120ms]",
  "hover:-translate-x-px hover:-translate-y-px hover:shadow-ink-lg",
  "active:translate-x-[3px] active:translate-y-[4px] active:shadow-none",
);

type Common = {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
};

type LinkProps = Common &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

type ButtonProps = Common &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

export function Button(props: LinkProps | ButtonProps) {
  const { variant = "default", className, children, ...rest } = props;
  const classes = cn(BASE, VARIANT[variant], className);

  if (rest.href !== undefined) {
    return (
      <a {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      className={classes}
    >
      {children}
    </button>
  );
}
