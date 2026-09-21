import type { ModuleKey } from "./data";

export type ExamSegment = {
  readonly key: ModuleKey;
  /** Доля сегмента в полосе, она же подпись внутри него. */
  readonly value: number;
  /** Подпись под сегментом, если она есть в прототипе. */
  readonly caption?: string;
};

export type ExamBar = {
  readonly id: string;
  readonly label: string;
  readonly hint: string;
  readonly segments: readonly ExamSegment[];
  /**
   * Месяц последней сверки данных с демоверсией и спецификацией ФИПИ.
   * Есть только у полос, чьи цифры ежегодно меняются.
   */
  readonly verifiedAt?: `${number}-${number}`;
};

export const TASKS_BAR: ExamBar = {
  id: "tasks",
  label: "по количеству заданий",
  hint: "всего 27",
  segments: [
    { key: "m1", value: 8, caption: "задания 1–8" },
    { key: "m2", value: 7, caption: "9–15" },
    { key: "m3", value: 6, caption: "16–21" },
    { key: "m4", value: 5, caption: "22–26" },
    { key: "m5", value: 1, caption: "27" },
  ],
};

/**
 * ВНИМАНИЕ: первичные баллы пересматриваются ФИПИ каждый год — меняется и вес
 * сочинения, и максимум за работу. Цифры ниже взяты из прототипа и показывают
 * пропорцию, а не действующую шкалу. Перед публикацией сверить с демоверсией и
 * спецификацией текущего года и обновить verifiedAt.
 */
export const POINTS_BAR: ExamBar = {
  id: "points",
  label: "по первичным баллам",
  hint: "пропорции · проверить",
  verifiedAt: "2026-09",
  segments: [
    { key: "m1", value: 11 },
    { key: "m2", value: 10 },
    { key: "m3", value: 9 },
    { key: "m4", value: 8 },
    { key: "m5", value: 21, caption: "одно сочинение" },
  ],
};

export const EXAM_BARS: readonly ExamBar[] = [TASKS_BAR, POINTS_BAR];
