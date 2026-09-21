import { z } from "zod";

import { GRADE_VALUES, LEVEL_VALUES } from "./data";

/**
 * Одна схема на клиент и сервер. Клиент валидирует, чтобы показать ошибки
 * у полей; сервер — потому что клиенту верить нельзя.
 */

/** Быстрее этого форму заполняет только бот. */
export const MIN_FILL_MS = 3000;

const personName = z
  .string()
  .trim()
  .min(2, { error: "Слишком короткое имя" })
  .max(80, { error: "Слишком длинное имя" });

const PHONE = /^\+?[\d\s()-]{10,20}$/;
const TELEGRAM = /^@?[a-zA-Z0-9_]{5,32}$/;
const TELEGRAM_LINK = /^(https?:\/\/)?t\.me\/[a-zA-Z0-9_]{5,32}\/?$/;

const contact = z
  .string()
  .trim()
  .min(5, { error: "Оставьте телефон или телеграм" })
  .max(120, { error: "Слишком длинно" })
  .refine(
    (value) =>
      PHONE.test(value) || TELEGRAM.test(value) || TELEGRAM_LINK.test(value),
    { error: "Похоже на опечатку: нужен телефон или @username" },
  );

export const leadSchema = z.object({
  parentName: personName,
  studentName: personName,
  contact,
  grade: z.enum(GRADE_VALUES, { error: "Выберите класс" }),
  level: z.enum(LEVEL_VALUES, { error: "Выберите уровень" }),
  comment: z.string().trim().max(1000, { error: "Не больше 1000 символов" }),
  consent: z.literal(true, {
    error: "Без согласия на обработку данных отправить нельзя",
  }),
  /**
   * Ловушка для ботов: поле скрыто от людей, поэтому схема его пропускает,
   * а решение принимает роут — заполнено, значит бот.
   */
  company: z.string().max(200).optional(),
  /** Миллисекунды от монтирования формы до отправки. */
  elapsedMs: z.number().int().min(0).max(1000 * 60 * 60 * 24),
});

export type LeadInput = z.infer<typeof leadSchema>;

/** Данные заявки без служебных полей — их и отправляем в уведомления. */
export type Lead = Omit<LeadInput, "company" | "elapsedMs" | "consent">;

export type LeadFieldErrors = Partial<Record<keyof LeadInput, string[]>>;

export type LeadResponse =
  | { readonly ok: true }
  | {
      readonly ok: false;
      readonly error:
        | "bad_request"
        | "invalid"
        | "too_fast"
        | "rate_limited"
        | "not_delivered";
      readonly fields?: LeadFieldErrors;
    };
