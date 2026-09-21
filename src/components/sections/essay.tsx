"use client";

import { useState } from "react";

import { H2, Note, SectionTag, Sheet } from "@/components/ui";
import { cn } from "@/lib/cn";
import { SECTIONS } from "@/lib/data";
import type { EssayErrorId } from "@/lib/essay";
import {
  ESSAY_COPY,
  ESSAY_ERRORS,
  ESSAY_TEXT,
  essayErrorById,
} from "@/lib/essay";

/** Волнистое подчёркивание красной ручкой. */
const SQUIGGLE = {
  backgroundImage:
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='7' height='5'><path d='M0 3.5 Q1.75 0.5 3.5 3.5 T7 3.5' fill='none' stroke='%23e02b22' stroke-width='1.3'/></svg>\")",
  backgroundRepeat: "repeat-x",
  backgroundPosition: "0 96%",
} as const;

/** Линовка тетрадного листа. */
const RULED = {
  backgroundImage:
    "repeating-linear-gradient(transparent 0 33px, rgba(43,77,255,.16) 33px 34px)",
  backgroundPosition: "0 14px",
} as const;

export function Essay() {
  const [current, setCurrent] = useState<EssayErrorId>(1);
  const error = essayErrorById(current);

  return (
    <Sheet id={SECTIONS.doc.id} tilt="right" tape="both">
      <SectionTag>{SECTIONS.doc.tag}</SectionTag>
      <H2>{SECTIONS.doc.title}</H2>
      <p className="mb-[26px] max-w-[56ch] text-ink-70">{SECTIONS.doc.lead}</p>

      <div className="grid grid-cols-[1fr_250px] gap-[22px] max-md:grid-cols-1">
        <div
          style={RULED}
          className={cn(
            "relative rounded-card border-[2.5px] border-ink bg-white shadow-hard-lg",
            "py-[26px] pr-[26px] pl-[54px] max-md:pl-[44px]",
            "text-[17px] leading-[34px]",
          )}
        >
          {/* поля */}
          <span
            aria-hidden
            className="absolute top-0 bottom-0 left-[34px] w-0.5 bg-[rgba(224,43,34,.35)]"
          />
          {ESSAY_TEXT.map((segment, i) =>
            segment.kind === "text" ? (
              <span key={i}>{segment.text}</span>
            ) : (
              <button
                key={i}
                type="button"
                style={SQUIGGLE}
                onClick={() => setCurrent(segment.id)}
                aria-pressed={current === segment.id}
                aria-label={`«${essayErrorById(segment.id).was}» — ошибка ${segment.id}: ${essayErrorById(segment.id).rule}`}
                className={cn(
                  "inline cursor-pointer pb-[3px] text-left",
                  current === segment.id && "bg-[#fff0a8]",
                )}
              >
                {essayErrorById(segment.id).was}
              </button>
            ),
          )}
        </div>

        <div className="flex flex-col gap-3">
          <span className="-rotate-[1.5deg] font-hand text-[22px] font-bold text-pen">
            {ESSAY_COPY.marginTitle}
          </span>

          <div
            role="status"
            aria-live="polite"
            className="rounded-box border-[2.5px] border-ink bg-white px-[15px] py-[14px] shadow-hard-md"
          >
            <div className="mb-[5px] font-display text-[12px] font-bold text-pen">
              {error.rule}
            </div>
            <span className="font-hand text-[21px] font-bold text-ink-30 line-through decoration-pen decoration-2">
              {error.was}
            </span>
            <span className="mt-0.5 mb-2 block font-hand text-[23px] font-bold text-ok">
              {error.fix}
            </span>
            <div className="text-[13.5px] leading-[1.5] text-ink-70">
              {error.why}
            </div>
          </div>

          <div className="mt-1 flex flex-wrap gap-[7px]">
            {ESSAY_ERRORS.map((e) => (
              <button
                key={e.id}
                type="button"
                onClick={() => setCurrent(e.id)}
                aria-label={`Ошибка ${e.id}: ${e.rule}`}
                aria-pressed={current === e.id}
                className={cn(
                  "grid size-[30px] cursor-pointer place-items-center rounded-full border-[2.5px] border-ink",
                  "font-display text-[13px] font-extrabold",
                  current === e.id ? "bg-pen text-white" : "bg-white",
                )}
              >
                {e.id}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Note tone="aqua" className="mt-[30px]">
        {ESSAY_COPY.note}
      </Note>
    </Sheet>
  );
}
