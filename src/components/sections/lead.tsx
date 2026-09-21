"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";

import { Button, H2, SectionTag, Sheet } from "@/components/ui";
import { cn } from "@/lib/cn";
import {
  CONTACTS,
  GRADE_OPTIONS,
  LEAD,
  LEAD_CONSENT,
  LEGAL_PAGES,
  LEVEL_OPTIONS,
} from "@/lib/data";
import { GOALS, reachGoal } from "@/lib/metrika";
import { leadSchema } from "@/lib/schema";
import type { LeadFieldErrors, LeadResponse } from "@/lib/schema";

type Status = "idle" | "submitting" | "success" | "error";

const CONTROL = cn(
  "w-full rounded-box border-[2.5px] border-ink bg-white px-[14px] py-3 text-[15px]",
  "shadow-[2px_3px_0_rgba(26,26,34,.18)] outline-none",
  "focus:border-pink focus:shadow-[2px_3px_0_var(--color-pink)]",
);

function Field({
  label,
  htmlFor,
  error,
  wide = false,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={cn("block", wide && "col-span-full")}>
      <label
        htmlFor={htmlFor}
        className="mb-[3px] block font-hand text-[19px] font-bold"
      >
        {label}
      </label>
      {children}
      {error && (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="mt-1 text-[13px] text-pen"
        >
          {error}
        </p>
      )}
    </div>
  );
}

function ConsentLabel() {
  return (
    <>
      {LEAD_CONSENT.map((segment, i) =>
        segment.kind === "text" ? (
          <span key={i}>{segment.text}</span>
        ) : (
          <a
            key={i}
            href={LEGAL_PAGES[segment.page].href}
            className="text-gel underline"
          >
            {LEGAL_PAGES[segment.page].short}
          </a>
        ),
      )}
    </>
  );
}

export function Lead() {
  const [status, setStatus] = useState<Status>("idle");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<LeadFieldErrors>({});
  const [errorText, setErrorText] = useState<string>(LEAD.error.text);
  const mountedAt = useRef(0);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const data = new FormData(event.currentTarget);
    const values = {
      parentName: String(data.get("parentName") ?? ""),
      studentName: String(data.get("studentName") ?? ""),
      contact: String(data.get("contact") ?? ""),
      grade: String(data.get("grade") ?? ""),
      level: String(data.get("level") ?? ""),
      comment: String(data.get("comment") ?? ""),
      consent,
      company: String(data.get("company") ?? ""),
      elapsedMs: Date.now() - mountedAt.current,
    };

    const parsed = leadSchema.safeParse(values);
    if (!parsed.success) {
      const flat: LeadFieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        // у поля может быть несколько нарушений — показываем первое
        if (typeof key === "string" && !flat[key as keyof LeadFieldErrors]) {
          flat[key as keyof LeadFieldErrors] = [issue.message];
        }
      }
      setErrors(flat);
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await response.json()) as LeadResponse;

      if (result.ok) {
        reachGoal(GOALS.leadSubmit);
        setStatus("success");
        return;
      }

      if (result.error === "invalid" && result.fields) {
        setErrors(result.fields);
        setStatus("idle");
        return;
      }

      setErrorText(
        result.error === "rate_limited"
          ? LEAD.errors.rateLimited
          : LEAD.error.text,
      );
      setStatus("error");
    } catch {
      setErrorText(LEAD.error.text);
      setStatus("error");
    }
  }

  return (
    <Sheet id={LEAD.id} tilt="left" tape="both">
      <SectionTag>{LEAD.tag}</SectionTag>
      <H2 className="max-w-[24ch]">{LEAD.title}</H2>
      <p className="mb-[26px] max-w-[56ch] text-ink-70">{LEAD.lead}</p>

      {status === "success" ? (
        <div
          role="status"
          aria-live="polite"
          className="-rotate-[0.4deg] rounded-panel border-[2.5px] border-ink bg-acid px-[26px] py-6 shadow-ink-lg"
        >
          <h3 className="mb-2 font-display text-[21px] font-extrabold">
            {LEAD.success.title}
          </h3>
          <p>{LEAD.success.text}</p>
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="grid grid-cols-2 gap-3.5 max-md:grid-cols-1">
          <Field
            label={LEAD.fields.parentName.label}
            htmlFor="parentName"
            error={errors.parentName?.[0]}
          >
            <input
              id="parentName"
              name="parentName"
              autoComplete="name"
              placeholder={LEAD.fields.parentName.placeholder}
              aria-invalid={Boolean(errors.parentName)}
              aria-describedby={errors.parentName ? "parentName-error" : undefined}
              className={CONTROL}
            />
          </Field>

          <Field
            label={LEAD.fields.studentName.label}
            htmlFor="studentName"
            error={errors.studentName?.[0]}
          >
            <input
              id="studentName"
              name="studentName"
              placeholder={LEAD.fields.studentName.placeholder}
              aria-invalid={Boolean(errors.studentName)}
              aria-describedby={errors.studentName ? "studentName-error" : undefined}
              className={CONTROL}
            />
          </Field>

          <Field
            label={LEAD.fields.contact.label}
            htmlFor="contact"
            error={errors.contact?.[0]}
          >
            <input
              id="contact"
              name="contact"
              inputMode="tel"
              autoComplete="tel"
              placeholder={LEAD.fields.contact.placeholder}
              aria-invalid={Boolean(errors.contact)}
              aria-describedby={errors.contact ? "contact-error" : undefined}
              className={CONTROL}
            />
          </Field>

          <Field
            label={LEAD.fields.grade.label}
            htmlFor="grade"
            error={errors.grade?.[0]}
          >
            <select
              id="grade"
              name="grade"
              defaultValue=""
              aria-invalid={Boolean(errors.grade)}
              aria-describedby={errors.grade ? "grade-error" : undefined}
              className={CONTROL}
            >
              <option value="" disabled>
                {LEAD.selectPlaceholder}
              </option>
              {GRADE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>

          <Field
            label={LEAD.fields.level.label}
            htmlFor="level"
            error={errors.level?.[0]}
          >
            <select
              id="level"
              name="level"
              defaultValue=""
              aria-invalid={Boolean(errors.level)}
              aria-describedby={errors.level ? "level-error" : undefined}
              className={CONTROL}
            >
              <option value="" disabled>
                {LEAD.selectPlaceholder}
              </option>
              {LEVEL_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>

          <Field
            label={LEAD.fields.comment.label}
            htmlFor="comment"
            error={errors.comment?.[0]}
            wide
          >
            <textarea
              id="comment"
              name="comment"
              rows={3}
              placeholder={LEAD.fields.comment.placeholder}
              aria-invalid={Boolean(errors.comment)}
              aria-describedby={errors.comment ? "comment-error" : undefined}
              className={cn(CONTROL, "min-h-[84px] resize-y")}
            />
          </Field>

          {/* ловушка для ботов: людям не видна и не доступна с клавиатуры */}
          <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="company">Компания</label>
            <input id="company" name="company" tabIndex={-1} autoComplete="off" />
          </div>

          <label className="col-span-full mt-1 flex items-start gap-3 text-[13.5px] leading-[1.5] text-ink-70">
            <span className="relative mt-px grid size-6 flex-none place-items-center rounded-md border-[2.5px] border-ink bg-white">
              <input
                type="checkbox"
                name="consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="peer absolute inset-0 size-full cursor-pointer appearance-none focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-pink"
              />
              <span className="pointer-events-none font-hand text-[23px] leading-none font-bold text-pen opacity-0 peer-checked:opacity-100">
                ✓
              </span>
            </span>
            <span>
              <ConsentLabel />
            </span>
          </label>

          {status === "error" && (
            <div
              role="alert"
              className="col-span-full mt-1 -rotate-[0.4deg] rounded-panel border-[2.5px] border-pen bg-[#fff6f5] px-5 py-4 text-[15px] shadow-hard-md"
            >
              <h3 className="mb-1 font-display text-[16px] font-extrabold text-pen">
                {LEAD.error.title}
              </h3>
              <p className="mb-3">{errorText}</p>
              <a
                href={CONTACTS.telegram.href}
                data-ym-goal={GOALS.telegramClick}
                className="font-display text-[14px] font-bold text-gel underline"
              >
                {CONTACTS.telegram.label}
              </a>
            </div>
          )}

          <div className="col-span-full mt-1.5 flex flex-wrap items-center gap-3">
            <Button
              variant="pink"
              type="submit"
              disabled={!consent || status === "submitting"}
              className={cn(
                (!consent || status === "submitting") &&
                  "cursor-not-allowed opacity-60 hover:translate-x-0 hover:translate-y-0 hover:shadow-ink-md",
              )}
            >
              {status === "submitting"
                ? LEAD.submitting
                : status === "error"
                  ? LEAD.error.retry
                  : LEAD.submit}
            </Button>
            <span className="font-hand text-[18px] font-semibold text-ink-40">
              {LEAD.hint}
            </span>
          </div>
        </form>
      )}
    </Sheet>
  );
}
