import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { SITE } from "@/lib/site";

export const alt = SITE.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#1a1a22";
const PEN = "#e02b22";

const CHIPS = [
  { label: "94 занятия", background: "#ffc531", color: INK },
  { label: "22 — сочинение", background: "#ff4d97", color: "#fff" },
  { label: "до 8 в группе", background: "#1fc8dd", color: INK },
];

/** Картинка собирается на сборке, поэтому шрифты лежат в репозитории. */
async function font(file: string) {
  return readFile(join(process.cwd(), "src", "app", "_og", file));
}

export default async function OpengraphImage() {
  const [unbounded, golos] = await Promise.all([
    font("unbounded-800.woff"),
    font("golos-500.woff"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 56,
          backgroundColor: "#e8e3d3",
          fontFamily: "Golos",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#fbf9f2",
            border: `4px solid ${INK}`,
            borderRadius: 6,
            padding: "52px 56px",
            boxShadow: `16px 20px 0 rgba(26,26,34,.18)`,
            transform: "rotate(-0.6deg)",
          }}
        >
          <div style={{ display: "flex", fontSize: 28, color: PEN }}>
            курс подготовки к ЕГЭ по русскому языку
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Unbounded",
              fontSize: 72,
              lineHeight: 1.08,
              color: INK,
              marginTop: 22,
            }}
          >
            <div style={{ display: "flex" }}>Русский сдают все.</div>
            <div style={{ display: "flex" }}>
              <span>Готовят&nbsp;</span>
              <span style={{ color: PEN }}>последним.</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: 14, marginTop: 40 }}>
            {CHIPS.map((chip) => (
              <div
                key={chip.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontFamily: "Unbounded",
                  fontSize: 26,
                  padding: "12px 22px",
                  borderRadius: 40,
                  border: `4px solid ${INK}`,
                  backgroundColor: chip.background,
                  color: chip.color,
                }}
              >
                {chip.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Unbounded", data: unbounded, weight: 800, style: "normal" },
        { name: "Golos", data: golos, weight: 500, style: "normal" },
      ],
    },
  );
}
