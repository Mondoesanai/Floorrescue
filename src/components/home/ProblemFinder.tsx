"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { problems } from "@/content/problems";
import {
  FINDER_EXAMPLES,
  findFloorHelp,
  getFinderTarget,
  type FinderTarget,
} from "@/lib/floorFinder";

/**
 * "What are you dealing with?" — one search box in place of a wall of problem
 * cards. Typo-tolerant, understands everyday wording ("floor is breaking"),
 * and asks one follow-up question when the description is broad before
 * pointing at the right page. All problem pages stay linked underneath so
 * crawlers and browsers-by-hand still find them.
 */
export function ProblemFinder() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState<string | null>(null); // answer to a follow-up
  const [placeholder, setPlaceholder] = useState("");
  const [focused, setFocused] = useState(false);

  // Typewriter placeholder cycling through real examples while the box is idle.
  useEffect(() => {
    if (query || focused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPlaceholder(FINDER_EXAMPLES[0]);
      return;
    }
    let ex = 0;
    let ch = 0;
    let dir: 1 | -1 = 1;
    let timer: number;
    const tick = () => {
      const text = FINDER_EXAMPLES[ex];
      ch += dir;
      setPlaceholder(text.slice(0, ch));
      let wait = dir === 1 ? 60 : 28;
      if (dir === 1 && ch >= text.length) {
        dir = -1;
        wait = 1400;
      } else if (dir === -1 && ch <= 0) {
        dir = 1;
        ex = (ex + 1) % FINDER_EXAMPLES.length;
        wait = 350;
      }
      timer = window.setTimeout(tick, wait);
    };
    timer = window.setTimeout(tick, 400);
    return () => window.clearTimeout(timer);
  }, [query, focused]);

  const result = useMemo(() => findFloorHelp(query), [query]);
  const answered = picked ? getFinderTarget(picked) : undefined;

  function reset() {
    setQuery("");
    setPicked(null);
  }

  function onChange(v: string) {
    setQuery(v);
    setPicked(null);
  }

  const showQuestion = Boolean(result?.question) && !answered;
  const targets: FinderTarget[] = answered ? [answered] : (result?.targets ?? []);
  const noMatch = result !== null && !result.question && result.targets.length === 0;

  return (
    <section className="border-t border-warm-white/10 bg-charcoal-900 py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-xs font-semibold tracking-[0.25em] text-gold-300 uppercase">Have a Problem Right Now?</p>
        <h2 className="mt-3 text-balance text-3xl font-bold tracking-[-0.02em] text-warm-white sm:text-4xl">
          What are you dealing with?
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-[1.7] text-warm-white/60">
          Just say it however you&apos;d say it — &ldquo;the floor is breaking,&rdquo; &ldquo;it&apos;s slippery,&rdquo;
          &ldquo;I want it shiny.&rdquo; Spelling doesn&apos;t matter. We&apos;ll point you to the right page.
        </p>

        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            const t = targets[0];
            if (t) router.push(t.href);
          }}
          className="mt-8"
        >
          <label htmlFor="problem-finder" className="sr-only">
            Describe what you&apos;re dealing with
          </label>
          <div className="relative">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-gold-300"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
            <input
              id="problem-finder"
              type="text"
              value={query}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={placeholder || "Describe it in your own words"}
              autoComplete="off"
              className="h-16 w-full rounded-2xl border border-warm-white/20 bg-charcoal-950 pr-28 pl-14 text-base text-warm-white shadow-elevated outline-none transition-colors placeholder:text-warm-white/35 focus:border-gold-300"
            />
            {query ? (
              <button
                type="button"
                onClick={reset}
                className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full px-3 py-1.5 text-xs font-semibold text-warm-white/60 hover:text-gold-200"
              >
                Start over
              </button>
            ) : null}
          </div>
        </form>

        {!query ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {["My floor is breaking", "It's slippery", "Water coming up", "I want it shiny"].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => onChange(s)}
                className="rounded-full border border-warm-white/15 px-3.5 py-1.5 text-xs font-medium text-warm-white/70 transition-colors hover:border-gold-300 hover:text-gold-100"
              >
                {s}
              </button>
            ))}
          </div>
        ) : null}

        <div aria-live="polite" className="mt-6">
          {showQuestion && result?.question ? (
            <div className="rounded-2xl border border-gold-300/30 bg-charcoal-950 p-6">
              <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">One quick question</p>
              <p className="mt-2 text-lg font-bold text-warm-white">{result.question.question}</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {result.question.options.map((o) => (
                  <button
                    key={o.label}
                    type="button"
                    onClick={() => setPicked(o.targetId)}
                    className="rounded-xl border border-warm-white/15 bg-charcoal-900 px-4 py-3 text-left text-sm font-medium text-warm-white/85 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-gold-300/60 hover:text-warm-white"
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {targets.length > 0 && !showQuestion ? (
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">
                {answered ? "That sounds like" : "Closest matches"}
              </p>
              <ul className="mt-3 grid gap-3">
                {targets.map((t, i) => (
                  <li key={t.id}>
                    <Link
                      href={t.href}
                      className={
                        "group flex items-start justify-between gap-4 rounded-2xl border p-5 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-gold-300 " +
                        (i === 0 ? "border-gold-300/50 bg-charcoal-950" : "border-warm-white/10 bg-charcoal-950/60")
                      }
                    >
                      <span>
                        <span className="text-[10px] font-bold tracking-[0.18em] text-gold-300 uppercase">{t.kind}</span>
                        <span className="mt-1 block text-base font-bold text-warm-white">{t.title}</span>
                        <span className="mt-1 block text-sm leading-[1.6] text-warm-white/60">{t.blurb}</span>
                      </span>
                      <span className="mt-1 shrink-0 text-sm font-semibold text-gold-200 transition-transform group-hover:translate-x-0.5">
                        Open →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {noMatch ? (
            <div className="rounded-2xl border border-warm-white/10 bg-charcoal-950 p-6">
              <p className="text-base font-bold text-warm-white">We didn&apos;t catch that one — and that&apos;s fine.</p>
              <p className="mt-1.5 text-sm leading-[1.7] text-warm-white/60">
                Send it to us exactly as you wrote it and a real person will read it, or browse everything below.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href={`/quote?describe=${encodeURIComponent(query.trim())}`}
                  className="rounded-full bg-gold-300 px-5 py-2.5 text-sm font-bold text-charcoal-950 transition-transform hover:-translate-y-0.5"
                >
                  Send this to Floor Rescue
                </Link>
                <Link
                  href="/systems"
                  className="rounded-full border border-warm-white/20 px-5 py-2.5 text-sm font-semibold text-warm-white/80 hover:border-gold-300"
                >
                  Compare floor systems
                </Link>
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-10 border-t border-warm-white/10 pt-6">
          <p className="text-xs font-semibold tracking-[0.2em] text-warm-white/40 uppercase">Or browse by problem</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {problems.map((p) => (
              <Link
                key={p.id}
                href={`/problems/${p.id}`}
                className="rounded-full border border-warm-white/10 px-3 py-1.5 text-xs text-warm-white/60 transition-colors hover:border-gold-300/60 hover:text-gold-100"
              >
                {p.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
