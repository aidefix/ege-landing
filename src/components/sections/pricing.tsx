"use client";

import { useState } from "react";

import { H2, SectionTag, Sheet } from "@/components/ui";
import { cn } from "@/lib/cn";
import {
  PRICING_COPY,
  DEFAULT_TARIFF_INDEX,
  EXTRAS,
  LEGAL,
  SECTIONS,
  TARIFFS,
} from "@/lib/data";
import { GOALS, reachGoal } from "@/lib/metrika";
import { moduleFill } from "@/lib/module-style";

const EXTRA_BG = {
  acid: "bg-acid",
  sun: "bg-sun",
} as const;

export function Pricing() {
  const [selected, setSelected] = useState(DEFAULT_TARIFF_INDEX);

  return (
    <Sheet id={SECTIONS.price.id} tilt="right" tape="tr">
      <SectionTag>{SECTIONS.price.tag}</SectionTag>
      <H2>{SECTIONS.price.title}</H2>
      <p className="mb-[26px] max-w-[56ch] text-ink-70">{SECTIONS.price.lead}</p>

      <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
        {TARIFFS.map((tariff, i) => {
          const isSelected = i === selected;

          return (
            <button
              key={tariff.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => {
                reachGoal(GOALS.tariffClick);
                setSelected(i);
              }}
              className={cn(
                "relative flex cursor-pointer flex-col rounded-panel border-[2.5px] border-ink bg-white pb-[18px] text-left",
                isSelected
                  ? "shadow-[4px_5px_0_var(--color-pink),0_0_0_3px_var(--color-pink)]"
                  : "shadow-hard-lg",
              )}
            >
              {tariff.best && (
                <span className="absolute -top-[15px] -right-[10px] rotate-[7deg] rounded-chip border-[2.5px] border-ink bg-sun px-3 py-[5px] font-display text-[11px] font-extrabold shadow-ink-sm">
                  {PRICING_COPY.bestBadge}
                </span>
              )}

              <div
                className={cn(
                  "rounded-t-[7px] border-b-[2.5px] border-ink px-4 py-[13px] font-display text-[18px] font-extrabold",
                  moduleFill(tariff.accent),
                )}
              >
                {tariff.name}
              </div>

              <div className="px-4 pt-4 pb-0.5 font-display text-[29px] leading-none font-black">
                {tariff.price}
              </div>
              <div className="px-4 pb-[14px] font-hand text-[17px] font-semibold text-ink-50">
                {tariff.unit}
              </div>

              <ul className="flex-1 list-none px-4 text-[14px]">
                {tariff.features.map((feature, fi) => (
                  <li
                    key={feature.label}
                    className={cn(
                      "relative py-2 pl-[26px]",
                      fi > 0 && "border-t border-dashed border-ink/20",
                      !feature.included && "text-ink-20",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "absolute left-px font-hand text-[21px] leading-[1.1] font-bold",
                        feature.included ? "text-ok" : "text-pen",
                      )}
                    >
                      {feature.included ? "✓" : "✗"}
                    </span>
                    {feature.label}
                  </li>
                ))}
              </ul>

              <div className="px-4 pt-1.5">
                <span
                  className={cn(
                    "block w-full rounded-pill border-[2.5px] border-ink px-2 py-[11px] text-center",
                    "font-display text-[13px] font-bold shadow-ink-md",
                    isSelected ? "bg-pink text-white" : "bg-white",
                  )}
                >
                  {PRICING_COPY.select}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 max-md:grid-cols-1">
        {EXTRAS.map((extra) => (
          <div
            key={extra.id}
            className={cn(
              "flex items-center justify-between gap-[14px] rounded-panel border-[2.5px] border-ink px-[18px] py-4 shadow-hard-md",
              EXTRA_BG[extra.accent],
            )}
          >
            <div>
              <h4 className="m-0 font-display text-[16px] font-extrabold">
                {extra.title}
              </h4>
              <p className="mt-[3px] text-[13px] text-ink-70">{extra.note}</p>
            </div>
            <b className="font-display text-[22px] font-black whitespace-nowrap">
              {extra.price}
            </b>
          </div>
        ))}
      </div>

      <div className="mt-5 border-t-2 border-dashed border-ink/20 pt-[14px] text-[13px] leading-[1.7] text-ink-60">
        {LEGAL.terms.join(" ")}{" "}
        {PRICING_COPY.requisites(
          LEGAL.requisites.fullName,
          LEGAL.requisites.inn,
        )}
      </div>
    </Sheet>
  );
}
