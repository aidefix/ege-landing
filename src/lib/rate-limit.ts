/**
 * Ограничитель на время жизни процесса: Map с TTL, без внешнего хранилища.
 * При перезапуске и на каждом инстансе счётчик свой — для одного сервера
 * этого достаточно, при масштабировании нужен Redis.
 */

export const RATE_LIMIT = {
  max: 3,
  windowMs: 10 * 60 * 1000,
} as const;

const hits = new Map<string, number[]>();

function sweep(now: number) {
  for (const [key, times] of hits) {
    const fresh = times.filter((t) => now - t < RATE_LIMIT.windowMs);
    if (fresh.length === 0) hits.delete(key);
    else hits.set(key, fresh);
  }
}

export type RateLimitVerdict = {
  readonly allowed: boolean;
  /** Через сколько секунд освободится слот. */
  readonly retryAfterSec: number;
};

export function hit(key: string, now: number = Date.now()): RateLimitVerdict {
  sweep(now);

  const times = hits.get(key) ?? [];

  if (times.length >= RATE_LIMIT.max) {
    const oldest = times[0];
    return {
      allowed: false,
      retryAfterSec: Math.max(
        1,
        Math.ceil((RATE_LIMIT.windowMs - (now - oldest)) / 1000),
      ),
    };
  }

  hits.set(key, [...times, now]);
  return { allowed: true, retryAfterSec: 0 };
}

/** Только для тестов и локальной отладки. */
export function reset() {
  hits.clear();
}
