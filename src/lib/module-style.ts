import type { ModuleKey } from "./data";

/** Заливка модуля вместе с контрастным цветом текста. */
const FILL: Record<ModuleKey, string> = {
  m1: "bg-m1 text-ink",
  m2: "bg-m2 text-white",
  m3: "bg-m3 text-ink",
  m4: "bg-m4 text-white",
  m5: "bg-m5 text-white",
};

/** Только заливка: легенда, полоски прогресса, точки. */
const BG: Record<ModuleKey, string> = {
  m1: "bg-m1",
  m2: "bg-m2",
  m3: "bg-m3",
  m4: "bg-m4",
  m5: "bg-m5",
};

const STROKE: Record<ModuleKey, string> = {
  m1: "stroke-m1",
  m2: "stroke-m2",
  m3: "stroke-m3",
  m4: "stroke-m4",
  m5: "stroke-m5",
};

const SVG_FILL: Record<ModuleKey, string> = {
  m1: "fill-m1",
  m2: "fill-m2",
  m3: "fill-m3",
  m4: "fill-m4",
  m5: "fill-m5",
};

export const MODULE_KEYS: readonly ModuleKey[] = ["m1", "m2", "m3", "m4", "m5"];

export const moduleFill = (key: ModuleKey) => FILL[key];
export const moduleBg = (key: ModuleKey) => BG[key];
export const moduleStroke = (key: ModuleKey) => STROKE[key];
export const moduleSvgFill = (key: ModuleKey) => SVG_FILL[key];
