import { cn } from "@/lib/cn";

const SIDE = {
  tl: "left-[26px] -rotate-5",
  tr: "right-[26px] rotate-4",
} as const;

export type TapeSide = keyof typeof SIDE;

export function Tape({
  side,
  className,
}: {
  side: TapeSide;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute -top-[13px] z-3 h-[30px] w-[118px]",
        "border-x border-dashed border-ink/14 bg-white/50 shadow-tape",
        "bg-[repeating-linear-gradient(90deg,rgba(255,255,255,.28)_0_3px,rgba(210,215,205,.22)_3px_6px)]",
        SIDE[side],
        className,
      )}
    />
  );
}
