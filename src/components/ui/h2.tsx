import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export function H2({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <h2
      className={cn(
        "mb-2 font-display text-[clamp(24px,4vw,38px)] leading-[1.1] font-extrabold",
        className,
      )}
    >
      {children}
    </h2>
  );
}
