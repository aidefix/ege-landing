export type EssayErrorId = 1 | 2 | 3 | 4 | 5;

export type EssayError = {
  readonly id: EssayErrorId;
  /** Как написано в работе. */
  readonly was: string;
  /** Как должно быть. */
  readonly fix: string;
  readonly rule: string;
  readonly why: string;
};

export const ESSAY_ERRORS: readonly EssayError[] = [
  {
    id: 1,
    was: "о том",
    fix: "того",
    rule: "Управление",
    why: "Проблема ЧЕГО, а не О ЧЁМ. Существительное «проблема» требует родительного падежа.",
  },
  {
    id: 2,
    was: "считает что",
    fix: "считает, что",
    rule: "Запятая в СПП",
    why: "Придаточное изъяснительное отделяется запятой. Перед союзом «что» запятая нужна.",
  },
  {
    id: 3,
    was: "актуальная",
    fix: "актуальна",
    rule: "Краткая форма",
    why: "В роли сказуемого при подлежащем «проблема» нужна краткая форма прилагательного.",
  },
  {
    id: 4,
    was: "потому-что",
    fix: "потому что",
    rule: "Составной союз",
    why: "«Потому что» пишется в два слова. Дефис здесь — грубая ошибка.",
  },
  {
    id: 5,
    was: "природа это",
    fix: "природа — это",
    rule: "Тире",
    why: "Между подлежащим и сказуемым-существительным перед «это» ставится тире.",
  },
];

/** Текст работы: обычные куски и врезки с ошибками, кликабельные на лендинге. */
export type EssaySegment =
  | { readonly kind: "text"; readonly text: string }
  | { readonly kind: "error"; readonly id: EssayErrorId };

export const ESSAY_TEXT: readonly EssaySegment[] = [
  { kind: "text", text: "В тексте поднимается проблема " },
  { kind: "error", id: 1 },
  { kind: "text", text: ", как человек относится к природе. Автор " },
  { kind: "error", id: 2 },
  { kind: "text", text: " природа нуждается в защите. Эта проблема очень " },
  { kind: "error", id: 3 },
  { kind: "text", text: " в наше время. Я согласен с автором, " },
  { kind: "error", id: 4 },
  { kind: "text", text: " " },
  { kind: "error", id: 5 },
  { kind: "text", text: " наш дом." },
];

export function essayErrorById(id: EssayErrorId): EssayError {
  const found = ESSAY_ERRORS.find((e) => e.id === id);
  if (!found) throw new Error(`Неизвестная ошибка сочинения: ${id}`);
  return found;
}

export const ESSAY_COPY = {
  marginTitle: "на полях →",
  note: "Это демонстрационный пример. На боевом лендинге здесь будет разворот настоящей проверенной работы с её почерком — это убеждает сильнее любого текста «о преподавателе».",
} as const;
