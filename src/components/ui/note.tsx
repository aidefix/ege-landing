import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

const TONE = {
  acid: "bg-acid",
  aqua: "bg-aqua",
  sun: "bg-sun",
  white: "bg-white",
} as const;

export type NoteTone = keyof typeof TONE;

/** Приклеенная поверх листа записка с жёсткой тенью. */
export function Note({
  tone = "acid",
  tilt = "left",
  className,
  children,
}: {
  tone?: NoteTone;
  tilt?: "left" | "right";
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-card border-[2.5px] border-ink px-5 py-[18px] text-[15.5px] shadow-ink-md",
        tilt === "left" ? "-rotate-[0.4deg]" : "rotate-[0.35deg]",
        TONE[tone],
        className,
      )}
    >
      {children}
    </div>
  );
}
