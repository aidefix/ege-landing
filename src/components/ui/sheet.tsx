import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import { Tape } from "./tape";

const TILT = {
  left: "-rotate-[0.5deg]",
  right: "rotate-[0.45deg]",
  none: "",
} as const;

export function Sheet({
  id,
  tilt = "left",
  tape = "tl",
  ruled = false,
  className,
  children,
}: {
  id?: string;
  tilt?: keyof typeof TILT;
  tape?: "tl" | "tr" | "both" | "none";
  ruled?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative mb-[46px] rounded-sheet bg-card shadow-sheet",
        "px-8 pt-[34px] pb-9",
        "max-md:rotate-0 max-md:px-5 max-md:pt-7 max-md:pb-[30px]",
        ruled &&
          "bg-[repeating-linear-gradient(transparent_0_33px,rgba(43,77,255,.14)_33px_34px)]",
        TILT[tilt],
        className,
      )}
    >
      {(tape === "tl" || tape === "both") && <Tape side="tl" />}
      {(tape === "tr" || tape === "both") && <Tape side="tr" />}
      {children}
    </section>
  );
}
