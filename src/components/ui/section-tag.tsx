import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export function SectionTag({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "mb-1.5 inline-block -rotate-[1.4deg] font-hand text-xl font-bold text-pen",
        className,
      )}
    >
      {children}
    </span>
  );
}
