import { H2, Note, SectionTag, Sheet } from "@/components/ui";
import { cn } from "@/lib/cn";
import { NOTES, RESULTS, RESULTS_AXIS, SECTIONS } from "@/lib/data";
import { MODULE_KEYS, moduleStroke, moduleSvgFill } from "@/lib/module-style";

type Dims = {
  readonly W: number;
  readonly H: number;
  readonly PAD: {
    readonly left: number;
    readonly right: number;
    readonly top: number;
    readonly bottom: number;
  };
};

/** Широкий график для десктопа: подписи осей помещаются внутри SVG. */
const DESKTOP: Dims = {
  W: 900,
  H: 360,
  PAD: { left: 86, right: 86, top: 40, bottom: 28 },
};

/** Более квадратный график для мобильного: при узкой ширине не сплющивается. */
const MOBILE: Dims = {
  W: 520,
  H: 460,
  PAD: { left: 72, right: 72, top: 30, bottom: 26 },
};

/** Клетка тетради в подложке графика. */
const GRID = {
  backgroundImage:
    "linear-gradient(rgba(43,77,255,.13) 1px, transparent 1px), linear-gradient(90deg, rgba(43,77,255,.13) 1px, transparent 1px)",
  backgroundSize: "22px 22px",
} as const;

function Chart({
  dims,
  showHeader,
  className,
}: {
  dims: Dims;
  /** Подписи осей внутри SVG. На мобильном они вынесены наружу в HTML. */
  showHeader: boolean;
  className?: string;
}) {
  const { W, H, PAD } = dims;
  const RIGHT = W - PAD.right;
  const y = (score: number) =>
    PAD.top + ((100 - score) / 60) * (H - PAD.top - PAD.bottom);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Изменение баллов учеников: входной балл и результат ЕГЭ"
      className={cn("block h-auto w-full font-hand font-bold", className)}
    >
      {RESULTS_AXIS.ticks.map((tick) => (
        <g key={tick} className="fill-ink-40">
          <text x={PAD.left - 14} y={y(tick) + 5} textAnchor="end">
            {tick}
          </text>
          <text x={RIGHT + 14} y={y(tick) + 5}>
            {tick}
          </text>
        </g>
      ))}

      <line
        x1={PAD.left}
        y1={PAD.top}
        x2={PAD.left}
        y2={H - PAD.bottom}
        className="stroke-ink"
        strokeWidth={2.5}
      />
      <line
        x1={RIGHT}
        y1={PAD.top}
        x2={RIGHT}
        y2={H - PAD.bottom}
        className="stroke-ink"
        strokeWidth={2.5}
      />

      {showHeader && (
        <>
          <text
            x={PAD.left}
            y={PAD.top - 16}
            textAnchor="middle"
            className="fill-pen text-[18px]"
          >
            {RESULTS_AXIS.from}
          </text>
          <text
            x={RIGHT}
            y={PAD.top - 16}
            textAnchor="middle"
            className="fill-pen text-[18px]"
          >
            {RESULTS_AXIS.to}
          </text>
        </>
      )}

      {RESULTS.map((row, i) => {
        const down = row.after <= row.before;
        const key = MODULE_KEYS[i % MODULE_KEYS.length];
        const stroke = down ? "stroke-ink-20" : moduleStroke(key);
        const dot = down ? "fill-ink-20" : moduleSvgFill(key);

        return (
          <g key={`${row.before}-${row.after}-${i}`}>
            <line
              x1={PAD.left}
              y1={y(row.before)}
              x2={RIGHT}
              y2={y(row.after)}
              className={stroke}
              strokeWidth={down ? 2 : 3.4}
              strokeLinecap="round"
              strokeDasharray={down ? "7 6" : undefined}
            />
            <circle
              cx={PAD.left}
              cy={y(row.before)}
              r={5}
              className={`fill-white ${stroke}`}
              strokeWidth={2.5}
            />
            <circle
              cx={RIGHT}
              cy={y(row.after)}
              r={6}
              className={`${dot} stroke-ink`}
              strokeWidth={1.5}
            />
          </g>
        );
      })}
    </svg>
  );
}

export function Results() {
  return (
    <Sheet id={SECTIONS.res.id} tilt="left" tape="tl">
      <SectionTag>{SECTIONS.res.tag}</SectionTag>
      <H2>{SECTIONS.res.title}</H2>
      <p className="mb-[26px] max-w-[56ch] text-ink-70">{SECTIONS.res.lead}</p>

      <div
        style={GRID}
        className="rounded-card border-[2.5px] border-ink bg-white p-3 shadow-hard-lg max-md:p-4"
      >
        <div className="mb-3 hidden justify-between px-2 font-hand text-[18px] font-bold text-pen max-md:flex">
          <span>{RESULTS_AXIS.from}</span>
          <span>{RESULTS_AXIS.to}</span>
        </div>
        <Chart
          dims={DESKTOP}
          showHeader
          className="text-[15px] max-md:hidden"
        />
        <Chart
          dims={MOBILE}
          showHeader={false}
          className="text-[22px] md:hidden"
        />
      </div>

      <Note tone="white" tilt="right" className="mt-10">
        {NOTES.results}
      </Note>
    </Sheet>
  );
}
