import { Button } from "@/components/ui";
import { HERO } from "@/lib/data";

const CHROME = [
  "font-display font-black tracking-[-0.02em] text-transparent bg-clip-text",
  "bg-[linear-gradient(180deg,#fff_0%,#e3edf8_24%,#93a9c2_46%,#5d7189_51%,#a9bed2_58%,#f4f9ff_78%,#cbd9e8_100%)]",
  "[-webkit-text-stroke:1.6px_#1c2a3a]",
  "[filter:drop-shadow(2px_3px_0_rgba(28,42,58,.5))]",
].join(" ");

export function Hero() {
  return (
    <section className="pt-[46px] pb-1">
      <span className="mb-3 inline-block -rotate-[1.6deg] font-hand text-[23px] font-bold text-pen">
        {HERO.kick}
      </span>

      <h1 className="m-0 text-[clamp(32px,7vw,74px)] leading-[1.04]">
        <span className={CHROME}>{HERO.titleChrome}</span>
        <span className="block font-display font-extrabold text-ink">
          {HERO.titleLines[0]}
          <br />
          {HERO.titleLines[1]}
          <em className="relative whitespace-nowrap not-italic">
            {HERO.titleCircled}
            {/* обводка красной ручкой: неровный овал */}
            <span
              aria-hidden
              className="pointer-events-none absolute -right-1 -left-1 top-[12%] bottom-[14%] -rotate-[1.4deg] border-[3.5px] border-pen"
              style={{ borderRadius: "52% 48% 50% 50% / 60% 55% 45% 40%" }}
            />
          </em>
          {HERO.titleTail}
        </span>
      </h1>

      <p className="mt-[26px] max-w-[44ch] text-[17px]">
        {HERO.lead.before}
        <mark className="bg-transparent bg-[linear-gradient(transparent_55%,var(--color-acid)_55%)] px-0.5 text-ink">
          {HERO.lead.marked}
        </mark>
        {HERO.lead.after}
      </p>

      <div className="mt-7 flex flex-wrap gap-3">
        {HERO.cta.map((cta, i) => (
          <Button
            key={cta.href}
            href={cta.href}
            variant={i === 0 ? "pink" : "default"}
          >
            {cta.label}
          </Button>
        ))}
      </div>

      <div className="mt-[38px] flex flex-wrap gap-x-[34px] gap-y-[26px]">
        {HERO.stats.map((stat) => (
          <div key={stat.caption} className="text-center">
            <b className="relative block font-display text-[40px] leading-none font-black">
              {stat.value}
              <span
                aria-hidden
                className="absolute -inset-x-[13px] -inset-y-[9px] -rotate-4 border-[3px] border-gel"
                style={{ borderRadius: "50% / 44%" }}
              />
            </b>
            <span className="mt-[14px] block font-hand text-[17px] font-semibold text-ink-60">
              {stat.caption}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
