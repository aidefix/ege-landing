import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

const TONE = {
  pink: "bg-pink text-white",
  lilac: "bg-lilac text-white",
  aqua: "bg-aqua text-ink",
  sun: "bg-sun text-ink",
  acid: "bg-acid text-ink",
} as const;

export type StickerTone = keyof typeof TONE;

/** Круглый стикер. Позиция и поворот задаются через className на месте. */
export function Sticker({
  tone = "pink",
  className,
  children,
}: {
  tone?: StickerTone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "absolute z-5 grid size-[135px] place-items-center rounded-full p-2.5",
        "text-center font-display text-sm leading-[1.05] font-extrabold",
        "max-sm:size-[92px] max-sm:p-1.5 max-sm:text-[10.5px]",
        "shadow-sticker",
        TONE[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
