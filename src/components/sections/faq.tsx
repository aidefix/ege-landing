import { Accordion, AccordionItem, H2, SectionTag, Sheet } from "@/components/ui";
import { FAQ, FAQ_SECTION } from "@/lib/data";

export function Faq() {
  return (
    <Sheet id={FAQ_SECTION.id} tilt="right" tape="tl">
      <SectionTag>{FAQ_SECTION.tag}</SectionTag>
      <H2>{FAQ_SECTION.title}</H2>
      <p className="mb-[26px] max-w-[56ch] text-ink-70">{FAQ_SECTION.lead}</p>

      <Accordion>
        {FAQ.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            variant="flush"
            trigger={
              <>
                <span
                  aria-hidden
                  className="w-[22px] flex-none font-hand text-[28px] leading-[0.9] font-bold text-pen"
                >
                  <span className="group-data-[state=open]:hidden">+</span>
                  <span className="hidden group-data-[state=open]:inline">
                    −
                  </span>
                </span>
                <span className="font-display text-[16px] leading-[1.35] font-bold">
                  {item.question}
                </span>
              </>
            }
          >
            <p className="px-1 pb-[18px] pl-10 text-[15px] text-ink-70">
              {item.answer}
            </p>
          </AccordionItem>
        ))}
      </Accordion>
    </Sheet>
  );
}
