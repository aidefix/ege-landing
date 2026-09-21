"use client";

import { useState } from "react";

import { Button, H2, SectionTag, Sheet, Sticker } from "@/components/ui";
import { cn } from "@/lib/cn";
import { SECTIONS, moduleByKey } from "@/lib/data";
import type { ModuleKey } from "@/lib/data";
import { moduleBg, moduleFill } from "@/lib/module-style";
import { GOALS, reachGoal } from "@/lib/metrika";
import { QUIZ, QUIZ_COPY, QUIZ_STICKER } from "@/lib/quiz";

type Answers = ReadonlyArray<number | undefined>;

const START = -1;

function Pips({ step }: { step: number }) {
  return (
    <div
      className="mb-5 flex gap-[7px]"
      role="progressbar"
      aria-label="Прогресс тренажёра"
      aria-valuemin={0}
      aria-valuemax={QUIZ.length}
      aria-valuenow={Math.max(0, Math.min(step, QUIZ.length))}
    >
      {QUIZ.map((q, i) => (
        <div
          key={q.task}
          className={cn(
            "h-[9px] flex-1 rounded-[20px] border-2 border-ink",
            i < step
              ? moduleBg(q.key)
              : i === step
                ? "bg-[#c9c9d2]"
                : "bg-white",
          )}
        />
      ))}
    </div>
  );
}

function Verdict({
  title,
  fill,
  live = true,
  children,
}: {
  title: string;
  fill: string;
  /** Внутри итогового экрана живая область уже есть уровнем выше. */
  live?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      role={live ? "status" : undefined}
      aria-live={live ? "polite" : undefined}
      className="mt-[18px] overflow-hidden rounded-box border-[2.5px] border-ink bg-white shadow-ink-md"
    >
      <div
        className={cn(
          "border-b-[2.5px] border-ink px-4 py-[9px] font-display text-[14px] font-extrabold",
          fill,
        )}
      >
        {title}
      </div>
      <div className="px-[18px] py-4 text-[15px]">{children}</div>
    </div>
  );
}

function Question({
  step,
  answer,
  onPick,
  onNext,
}: {
  step: number;
  answer: number | undefined;
  onPick: (option: number) => void;
  onNext: () => void;
}) {
  const question = QUIZ[step];
  const answered = answer !== undefined;
  const right = answer === question.answer;

  return (
    <>
      <span
        className={cn(
          "inline-block -rotate-[1.2deg] rounded-chip border-[2.5px] border-ink px-[13px] py-[5px]",
          "font-display text-[12.5px] font-extrabold shadow-ink-sm",
          moduleFill(question.key),
        )}
      >
        {question.topic}
      </span>
      <span className="ml-3 font-hand text-[19px] font-bold text-ink-40">
        {QUIZ_COPY.taskNumber(question.task)}
      </span>

      <h3 className="mt-4 mb-5 font-display text-[clamp(18px,2.6vw,25px)] leading-[1.25] font-bold">
        {question.question}
      </h3>

      {question.options.map((option, i) => {
        const isRight = answered && i === question.answer;
        const isWrong = answered && i === answer && !right;

        return (
          <button
            key={option}
            type="button"
            disabled={answered}
            onClick={() => onPick(i)}
            className={cn(
              "mb-2.5 flex w-full items-start gap-[13px] rounded-box border-[2.5px] border-ink",
              "px-4 py-[14px] text-left text-[16px] shadow-hard-sm",
              answered
                ? "cursor-default"
                : "cursor-pointer hover:-translate-x-px hover:-translate-y-px hover:bg-[#fffbe8]",
              isRight && "bg-[#eaffd9]",
              isWrong && "bg-[#ffe9ef]",
              !isRight && !isWrong && "bg-white",
            )}
          >
            <span
              className={cn(
                "mt-px grid size-[21px] flex-none place-items-center rounded-[5px] border-[2.5px] border-ink",
                "font-hand text-[19px] leading-none font-bold",
                isRight && "text-ok",
                isWrong && "text-pen",
              )}
            >
              {isRight ? "✓" : isWrong ? "✗" : ""}
            </span>
            <span className="relative">
              {option}
              {isWrong && (
                <span
                  aria-hidden
                  className="absolute -inset-x-0.5 top-[52%] h-[2.5px] -rotate-[0.8deg] bg-pen"
                />
              )}
            </span>
          </button>
        );
      })}

      {answered && (
        <>
          <Verdict
            title={right ? QUIZ_COPY.verdictRight : QUIZ_COPY.verdictWrong}
            fill={right ? "bg-ok text-white" : "bg-pen text-white"}
          >
            <span className="mb-[5px] block font-hand text-[21px] font-bold text-pen">
              {right ? QUIZ_COPY.penRight : QUIZ_COPY.penWrong}
            </span>
            {question.explanation}
          </Verdict>
          <div className="mt-[18px] flex flex-wrap gap-2.5">
            <Button variant="aqua" onClick={onNext}>
              {step === QUIZ.length - 1 ? QUIZ_COPY.finish : QUIZ_COPY.next}
            </Button>
          </div>
        </>
      )}
    </>
  );
}

type Aggregate = {
  readonly key: ModuleKey;
  readonly name: string;
  readonly total: number;
  readonly correct: number;
};

function aggregate(answers: Answers): readonly Aggregate[] {
  const rows: Aggregate[] = [];

  QUIZ.forEach((question, i) => {
    const hit = answers[i] === question.answer ? 1 : 0;
    const row = rows.find((r) => r.key === question.key);

    if (row) {
      rows[rows.indexOf(row)] = {
        ...row,
        total: row.total + 1,
        correct: row.correct + hit,
      };
    } else {
      rows.push({
        key: question.key,
        name: moduleByKey(question.key).name,
        total: 1,
        correct: hit,
      });
    }
  });

  return rows;
}

function Score({ answers, onReset }: { answers: Answers; onReset: () => void }) {
  const rows = aggregate(answers);
  const correct = QUIZ.filter((q, i) => answers[i] === q.answer).length;
  const weak = rows
    .filter((r) => r.correct < r.total)
    .sort((a, b) => a.correct / a.total - b.correct / b.total)[0];

  return (
    <div role="status" aria-live="polite">
      <h3 className="mb-0.5 font-display text-[clamp(26px,5vw,42px)] font-black">
        {QUIZ_COPY.score(correct, QUIZ.length)}
      </h3>
      <p className="mb-5 font-hand text-[20px] font-semibold text-ink-50">
        {QUIZ_COPY.scoreHint}
      </p>

      {rows.map((row) => (
        <div
          key={row.key}
          className="mb-2.5 flex items-center gap-3 text-[14.5px]"
        >
          <div className="w-[145px] flex-none font-semibold max-sm:w-[96px]">
            {row.name}
          </div>
          <div className="h-[18px] flex-1 rounded-[20px] border-[2.5px] border-ink bg-white p-0.5">
            <div
              className={cn("h-full rounded-[20px]", moduleBg(row.key))}
              style={{ width: `${(row.correct / row.total) * 100}%` }}
            />
          </div>
          <div className="w-[38px] flex-none text-right font-display font-extrabold">
            {row.correct}/{row.total}
          </div>
        </div>
      ))}

      <Verdict
        title={weak ? QUIZ_COPY.weakTitle : QUIZ_COPY.perfectTitle}
        fill={weak ? moduleFill(weak.key) : "bg-ok text-white"}
        live={false}
      >
        {weak
          ? QUIZ_COPY.weakText(weak.name, moduleByKey(weak.key).lessons)
          : QUIZ_COPY.perfectText}
      </Verdict>

      <div className="mt-[18px] flex flex-wrap gap-2.5">
        <Button variant="pink" href={QUIZ_COPY.toDiagnostics.href}>
          {QUIZ_COPY.toDiagnostics.label}
        </Button>
        <Button onClick={onReset}>{QUIZ_COPY.restart}</Button>
      </div>
    </div>
  );
}

export function Quiz() {
  const [step, setStep] = useState(START);
  const [answers, setAnswers] = useState<Answers>([]);

  const pick = (option: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = option;
      return next;
    });
  };

  const reset = () => {
    setStep(START);
    setAnswers([]);
  };

  return (
    <Sheet id={SECTIONS.quiz.id} tilt="right" tape="tl">
      <Sticker tone="pink" className="-top-[34px] -right-[14px] rotate-[11deg] max-sm:-top-8 max-sm:-right-2">
        <span className="flex flex-col items-center leading-4 tracking-tight">
          {QUIZ_STICKER.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </span>
      </Sticker>

      <SectionTag>{SECTIONS.quiz.tag}</SectionTag>
      <H2 className="max-w-[20ch]">{SECTIONS.quiz.title}</H2>
      <p className="mb-[26px] max-w-[56ch] text-ink-70">{SECTIONS.quiz.lead}</p>

      {step === START && (
        <div>
          <Button
            variant="sun"
            onClick={() => {
              reachGoal(GOALS.quizStart);
              setStep(0);
            }}
          >
            {QUIZ_COPY.start}
          </Button>
          <p className="mt-4 font-hand text-[19px] font-semibold text-ink-50">
            {QUIZ_COPY.startHint}
          </p>
        </div>
      )}

      {step !== START && (
        <>
          <Pips step={step} />
          {step < QUIZ.length ? (
            <Question
              step={step}
              answer={answers[step]}
              onPick={pick}
              onNext={() => {
                if (step === QUIZ.length - 1) reachGoal(GOALS.quizFinish);
                setStep(step + 1);
              }}
            />
          ) : (
            <Score answers={answers} onReset={reset} />
          )}
        </>
      )}
    </Sheet>
  );
}
