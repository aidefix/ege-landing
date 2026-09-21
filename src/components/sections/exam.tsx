import { H2, Note, SectionTag, Sheet, Star } from "@/components/ui";
import { cn } from "@/lib/cn";
import { MODULES, NOTES, SECTIONS } from "@/lib/data";
import type { ExamBar } from "@/lib/exam";
import { EXAM_BARS } from "@/lib/exam";
import { moduleBg, moduleFill } from "@/lib/module-style";

function Bar({ bar, className }: { bar: ExamBar; className?: string }) {
  return (
    <div className={cn("mb-[30px]", className)}>
      <div className="mb-[5px] flex justify-between font-hand text-[19px] font-bold">
        <span>{bar.label}</span>
        <i className="text-[16px] not-italic text-ink-40">{bar.hint}</i>
      </div>
      <div className="flex h-[46px] gap-[5px]">
        {bar.segments.map((segment) => (
          <div
            key={segment.key}
            style={{ flex: segment.value }}
            className={cn(
              "relative grid min-w-[38px] place-items-center rounded-card border-[2.5px] border-ink",
              "font-display text-[17px] font-extrabold shadow-hard-sm",
              moduleFill(segment.key),
            )}
          >
            {segment.value}
            {segment.caption && (
              <small className="absolute top-[calc(100%+6px)] left-0 font-hand text-[15px] font-semibold whitespace-nowrap text-ink-50">
                {segment.caption}
              </small>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Exam() {
  const [tasks, points] = EXAM_BARS;

  return (
    <Sheet id={SECTIONS.exam.id} tilt="left" tape="both" className="mt-10">
      <Star className="-top-[18px] right-[150px] rotate-12" />
      <SectionTag>{SECTIONS.exam.tag}</SectionTag>
      <H2>{SECTIONS.exam.title}</H2>
      <p className="mb-[26px] max-w-[56ch] text-ink-70">{SECTIONS.exam.lead}</p>

      <Bar bar={tasks} />
      <Bar bar={points} className="mt-[38px]" />

      <div className="mt-[26px] flex flex-wrap gap-x-[18px] gap-y-2 text-[13.5px]">
        {MODULES.map((m) => (
          <span key={m.key} className="inline-flex items-center gap-[7px]">
            <i
              className={cn(
                "size-[15px] rounded-[4px] border-2 border-ink",
                moduleBg(m.key),
              )}
            />
            {m.name}
          </span>
        ))}
      </div>

      <Note className="mt-10">
        <b className="font-display font-extrabold">{NOTES.exam.strong}</b>
        {NOTES.exam.text}
      </Note>
    </Sheet>
  );
}
