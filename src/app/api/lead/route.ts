import { z } from "zod";

import { formatLead, notifyEmail, notifyTelegram } from "@/lib/notify";
import { hit } from "@/lib/rate-limit";
import { MIN_FILL_MS, leadSchema } from "@/lib/schema";
import type { LeadResponse } from "@/lib/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function reply(body: LeadResponse, status: number, headers?: HeadersInit) {
  return Response.json(body, { status, headers });
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const limit = hit(clientIp(request));
  if (!limit.allowed) {
    return reply({ ok: false, error: "rate_limited" }, 429, {
      "retry-after": String(limit.retryAfterSec),
    });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return reply({ ok: false, error: "bad_request" }, 400);
  }

  const parsed = leadSchema.safeParse(payload);
  if (!parsed.success) {
    return reply(
      {
        ok: false,
        error: "invalid",
        fields: z.flattenError(parsed.error).fieldErrors,
      },
      400,
    );
  }

  const { company, elapsedMs, consent, ...lead } = parsed.data;
  void consent;

  // ловушка сработала: боту отвечаем как будто всё хорошо
  if (company) return reply({ ok: true }, 200);

  if (elapsedMs < MIN_FILL_MS) {
    return reply({ ok: false, error: "too_fast" }, 400);
  }

  const text = formatLead(lead);
  const channels = await Promise.allSettled([
    notifyTelegram(text),
    notifyEmail("Заявка на диагностику", text),
  ]);

  const delivered = channels.some((c) => c.status === "fulfilled");

  if (!delivered) {
    // в лог только причины отказа каналов, без содержимого заявки
    console.error(
      "lead: not delivered",
      channels.map((c) =>
        c.status === "rejected" ? String(c.reason?.message ?? c.reason) : "ok",
      ),
    );
    return reply({ ok: false, error: "not_delivered" }, 502);
  }

  return reply({ ok: true }, 200);
}
