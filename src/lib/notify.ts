import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

import { GRADE_OPTIONS, LEVEL_OPTIONS } from "./data";
import type { Lead } from "./schema";

/**
 * Уведомления о заявке. Секреты берутся только из env и наружу не уходят:
 * в ошибках — код ответа и имя канала, без токенов и без персональных данных.
 */

const TIMEOUT_MS = 8000;

const label = <T extends string>(
  options: readonly { value: T; label: string }[],
  value: T,
) => options.find((o) => o.value === value)?.label ?? value;

export function formatLead(lead: Lead): string {
  return [
    "Заявка на диагностику",
    `Родитель: ${lead.parentName}`,
    `Ученик: ${lead.studentName}`,
    `Связь: ${lead.contact}`,
    `Класс: ${label(GRADE_OPTIONS, lead.grade)}`,
    `Уровень: ${label(LEVEL_OPTIONS, lead.level)}`,
    lead.comment ? `Комментарий: ${lead.comment}` : "Комментарий: —",
  ].join("\n");
}

export async function notifyTelegram(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) throw new Error("telegram: not configured");

  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    },
  );

  // тело ответа не читаем: Telegram возвращает в нём исходное сообщение
  if (!response.ok) {
    throw new Error(`telegram: http ${response.status}`);
  }
}

let transport: Transporter | null = null;

function smtpTransport(): Transporter {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);

  if (!host || !Number.isFinite(port)) throw new Error("smtp: not configured");

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  transport ??= nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: user && pass ? { user, pass } : undefined,
    connectionTimeout: TIMEOUT_MS,
    greetingTimeout: TIMEOUT_MS,
    socketTimeout: TIMEOUT_MS,
  });

  return transport;
}

export async function notifyEmail(
  subject: string,
  text: string,
): Promise<void> {
  const from = process.env.SMTP_FROM;
  const to = process.env.SMTP_TO;

  if (!from || !to) throw new Error("smtp: not configured");

  try {
    await smtpTransport().sendMail({ from, to, subject, text });
  } catch (cause) {
    // сообщение библиотеки может содержать адреса — наружу только код
    const code =
      typeof cause === "object" && cause !== null && "code" in cause
        ? String((cause as { code: unknown }).code)
        : "unknown";
    throw new Error(`smtp: ${code}`);
  }
}
