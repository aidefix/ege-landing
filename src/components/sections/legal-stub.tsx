import Link from "next/link";

import { H2, Note, SectionTag, Sheet } from "@/components/ui";
import { LEGAL_PAGES, LEGAL_STUB } from "@/lib/data";
import type { LegalPageKey } from "@/lib/data";

/** Каркас юридической страницы: заголовки разделов есть, текста ещё нет. */
export function LegalStub({ page }: { page: LegalPageKey }) {
  const { title, sections } = LEGAL_PAGES[page];

  return (
    <main className="pt-[46px]">
      <Sheet tilt="left" tape="tl">
        <SectionTag>{LEGAL_STUB.badge}</SectionTag>
        <H2>{title}</H2>

        <Note tone="sun" className="mb-8">
          {LEGAL_STUB.notice}
        </Note>

        {sections.map((heading, i) => (
          <section key={heading} className="mb-6">
            <h3 className="mb-1 font-display text-[16px] font-bold">
              {i + 1}. {heading}
            </h3>
            <p className="text-ink-40">{LEGAL_STUB.placeholder}</p>
          </section>
        ))}

        <Link href="/" className="font-hand text-[19px] font-bold text-gel">
          {LEGAL_STUB.back}
        </Link>
      </Sheet>
    </main>
  );
}
