import Link from "next/link";

import { CONTACTS, FOOTER, LEGAL_PAGES } from "@/lib/data";
import { GOALS } from "@/lib/metrika";

export function Footer() {
  return (
    <footer className="border-t-2 border-dashed border-ink/20 pt-5 pb-2 text-[13px] text-ink-60">
      <p className="m-0">{FOOTER.teacher}</p>
      <p className="mt-1 mb-3">{FOOTER.requisites}</p>
      <nav className="flex flex-wrap gap-x-5 gap-y-1.5">
        {FOOTER.links.map((key) => (
          <Link
            key={key}
            href={LEGAL_PAGES[key].href}
            className="text-gel underline"
          >
            {LEGAL_PAGES[key].title}
          </Link>
        ))}
        <a
          href={CONTACTS.telegram.href}
          data-ym-goal={GOALS.telegramClick}
          className="text-gel underline"
        >
          {CONTACTS.telegram.label}
        </a>
      </nav>
    </footer>
  );
}
