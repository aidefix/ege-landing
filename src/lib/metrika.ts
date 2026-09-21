import { YANDEX_METRIKA_ID } from "./site";

export const GOALS = {
  quizStart: "quiz_start",
  quizFinish: "quiz_finish",
  tariffClick: "tariff_click",
  leadSubmit: "lead_submit",
  telegramClick: "telegram_click",
} as const;

export type Goal = (typeof GOALS)[keyof typeof GOALS];

declare global {
  interface Window {
    ym?: (counter: number, action: string, ...rest: unknown[]) => void;
  }
}

export function reachGoal(goal: Goal) {
  const counter = Number(YANDEX_METRIKA_ID);
  if (!counter || typeof window === "undefined" || !window.ym) return;
  window.ym(counter, "reachGoal", goal);
}
