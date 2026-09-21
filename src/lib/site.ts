/**
 * Домен нужен для canonical, OpenGraph, sitemap и robots.
 * До публикации выставить NEXT_PUBLIC_SITE_URL, иначе ссылки уедут на заглушку.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ege-russian.example.ru"
).replace(/\/$/, "");

export const SITE = {
  url: SITE_URL,
  name: "Русский ЕГЭ · курс [ИМЯ]",
  title: "Курс подготовки к ЕГЭ по русскому языку — [ИМЯ]",
  description:
    "Авторский курс подготовки к ЕГЭ по русскому языку: 94 занятия, из них 22 — только сочинение. Диагностика, разбор сочинений с пометками на полях, группы до 8 человек.",
  locale: "ru_RU",
  keywords: [
    "ЕГЭ русский язык",
    "подготовка к ЕГЭ",
    "репетитор по русскому",
    "сочинение ЕГЭ",
    "курс подготовки к ЕГЭ",
  ],
} as const;

/** Идентификатор счётчика Яндекс.Метрики; пусто — счётчик не подключается. */
export const YANDEX_METRIKA_ID = process.env.NEXT_PUBLIC_YM_ID ?? "";

export const absolute = (path: string) =>
  path.startsWith("http") ? path : `${SITE_URL}${path}`;
