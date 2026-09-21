import {
  Accordion,
  AccordionItem,
  H2,
  SectionTag,
  Sheet,
  Star,
} from "@/components/ui";
import { cn } from "@/lib/cn";
import { MODULES, PROGRAM_COPY, SECTIONS } from "@/lib/data";
import { moduleFill } from "@/lib/module-style";

export function Program() {
  return (
    <Sheet id={SECTIONS.prog.id} tilt="left" tape="tr">
      <Star tone="lilac" className="-bottom-4 left-10 -rotate-[16deg]" />
      <SectionTag>{SECTIONS.prog.tag}</SectionTag>
      <H2>{SECTIONS.prog.title}</H2>
      <p className="mb-[26px] max-w-[56ch] text-ink-70">{SECTIONS.prog.lead}</p>

      <Accordion>
        {MODULES.map((m) => (
          <AccordionItem
            key={m.key}
            value={m.key}
            trigger={
              <>
                <span
                  className={cn(
                    "flex-none rounded-chip border-[2.5px] border-ink px-3 py-[5px]",
                    "font-display text-[13px] font-extrabold",
                    moduleFill(m.key),
                  )}
                >
                  {m.tasks}
                </span>
                <span className="flex-1 font-display text-[17px] font-bold">
                  {m.name}
                </span>
                <span className="flex-none font-hand text-[19px] font-bold text-ink-50 max-sm:hidden">
                  {PROGRAM_COPY.lessons(m.lessons)}
                </span>
                <span className="w-[26px] flex-none text-center font-display text-[19px] font-extrabold group-data-[state=open]:text-pen">
                  +
                </span>
              </>
            }
          >
            <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-x-[26px] gap-y-0.5 px-[18px] pb-[18px]">
              {m.topics.map((topic) => (
                <div
                  key={topic.title}
                  className="flex justify-between gap-3 border-b border-dashed border-ink/20 py-[7px] text-[14.5px]"
                >
                  <span>{topic.title}</span>
                  <span className="font-hand text-[17px] font-bold whitespace-nowrap text-ink-40">
                    {topic.lessons}
                  </span>
                </div>
              ))}
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </Sheet>
  );
}
