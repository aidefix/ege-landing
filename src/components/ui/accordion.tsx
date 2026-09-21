"use client";

import * as Primitive from "@radix-ui/react-accordion";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/** Несколько блоков можно держать открытыми одновременно, как <details>. */
export function Accordion({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <Primitive.Root type="multiple" className={className}>
      {children}
    </Primitive.Root>
  );
}

const ITEM = {
  /** Закладка программы: карточка с обводкой и жёсткой тенью. */
  card: "mb-3 overflow-hidden rounded-box border-[2.5px] border-ink bg-white shadow-hard-md",
  /** Вопрос: только пунктирная линия снизу. */
  flush: "border-b-2 border-dashed border-ink/22 last:border-b-0",
} as const;

const TRIGGER = {
  card: "px-[18px] py-4",
  flush: "items-start px-1 py-4 hover:text-pen",
} as const;

export function AccordionItem({
  value,
  trigger,
  variant = "card",
  children,
}: {
  value: string;
  trigger: ReactNode;
  variant?: keyof typeof ITEM;
  children: ReactNode;
}) {
  return (
    <Primitive.Item value={value} className={ITEM[variant]}>
      <Primitive.Header className="flex">
        <Primitive.Trigger
          className={cn(
            "group flex w-full cursor-pointer items-center gap-[14px] text-left",
            TRIGGER[variant],
          )}
        >
          {trigger}
        </Primitive.Trigger>
      </Primitive.Header>
      <Primitive.Content>{children}</Primitive.Content>
    </Primitive.Item>
  );
}
