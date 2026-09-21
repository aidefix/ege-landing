import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

const TONE = {
  sun: "text-sun",
  pink: "text-pink",
  aqua: "text-aqua",
  lilac: "text-lilac",
} as const;

export type StarTone = keyof typeof TONE;

/** Звёздочка-глиф. По умолчанию абсолютная: позиция и поворот — через className. */
export function Star({
  tone = "sun",
  inline = false,
  className,
  children = "✦",
}: {
  tone?: StarTone;
  inline?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "z-4 text-[26px] [text-shadow:2px_2px_0_rgba(26,26,34,.2)]",
        inline ? "static inline-block" : "absolute",
        TONE[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
