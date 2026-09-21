import { Button, Star } from "@/components/ui";
import { CONTACTS, FINAL } from "@/lib/data";
import { GOALS } from "@/lib/metrika";

export function Final() {
  return (
    <section className="pt-2.5 pb-10 text-center">
      <Star tone="pink" inline className="mb-2">
        ✦ ✦ ✦
      </Star>
      <h2 className="mx-auto max-w-[16ch] font-display text-[clamp(26px,5.4vw,52px)] leading-[1.08] font-black">
        {FINAL.title}
      </h2>
      <p className="mx-auto mt-[18px] mb-[26px] max-w-[44ch] text-ink-70">
        {FINAL.text}
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button variant="pink" href={CONTACTS.signup.href}>
          {CONTACTS.signup.label}
        </Button>
        <Button
          variant="aqua"
          href={CONTACTS.telegram.href}
          data-ym-goal={GOALS.telegramClick}
        >
          {CONTACTS.telegram.label}
        </Button>
      </div>
    </section>
  );
}
