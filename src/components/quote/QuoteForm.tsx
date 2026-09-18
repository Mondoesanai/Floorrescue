"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import { useJourney } from "@/lib/journey/context";
import { getSector } from "@/content/sectors";
import { getProblem } from "@/content/problems";
import { trackEvent } from "@/lib/analytics";
import { QuoteSuccess } from "./QuoteSuccess";

type Step = 1 | 2 | 3;

interface FormValues {
  name: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  squareFootage: string;
  timeline: string;
  notes: string;
}

const emptyValues: FormValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  location: "",
  squareFootage: "",
  timeline: "",
  notes: "",
};

export function QuoteForm() {
  const { state } = useJourney();
  const searchParams = useSearchParams();

  const environment = state.environment ?? (searchParams.get("environment") as typeof state.environment) ?? null;
  const sectorId = state.sectorId ?? searchParams.get("sector");
  const sector = sectorId ? getSector(sectorId) : undefined;
  const projectState = state.projectState;
  const concernIds = state.concerns.length ? state.concerns : searchParams.get("concern") ? [searchParams.get("concern")!] : [];
  const concerns = concernIds.map(getProblem).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const otherDescription = state.otherSectorText || state.otherProjectText || null;
  const systemHint = searchParams.get("system");

  const knownSummary = useMemo(
    () =>
      [
        environment ? `Environment: ${environment}` : null,
        sector ? `Space: ${sector.name}` : null,
        projectState ? `Project: ${projectState.replace("-", " ")}` : null,
        concerns.length ? `Concerns: ${concerns.map((c) => c.label).join(", ")}` : null,
        systemHint ? `System of interest: ${systemHint}` : null,
      ].filter(Boolean) as string[],
    [environment, sector, projectState, concerns, systemHint],
  );

  const [step, setStep] = useState<Step>(1);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [devFallback, setDevFallback] = useState(false);

  function set<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function goTo(next: Step) {
    setDirection(next > step ? "forward" : "back");
    setStep(next);
  }

  const step1Valid = values.name.trim() && values.email.trim() && values.phone.trim();

  async function handleSubmit() {
    setStatus("submitting");
    setErrorMessage(null);

    const data = new FormData();
    data.set("name", values.name);
    data.set("company", values.company);
    data.set("email", values.email);
    data.set("phone", values.phone);
    data.set("location", values.location);
    data.set("squareFootage", values.squareFootage);
    data.set("timeline", values.timeline);
    data.set("notes", values.notes);
    if (environment) data.set("environment", environment);
    if (sector) {
      data.set("sectorId", sector.id);
      data.set("sectorLabel", sector.name);
    }
    if (projectState) data.set("projectState", projectState);
    concernIds.forEach((id) => data.append("concerns", id));
    if (otherDescription) data.set("otherDescription", otherDescription);
    data.set("landingRoute", window.location.pathname);
    files.forEach((file) => data.append("attachments", file));

    trackEvent("quote_started");

    try {
      const res = await fetch("/api/quote", { method: "POST", body: data });
      const json = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(typeof json.error === "string" ? json.error : "Something went wrong. Please try again.");
        return;
      }
      trackEvent("quote_submitted", { devFallback: json.devFallback });
      setDevFallback(Boolean(json.devFallback));
      setStatus("done");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  if (status === "done") return <QuoteSuccess devFallback={devFallback} />;

  return (
    <div>
      {knownSummary.length > 0 ? (
        <div className="mb-8 rounded-md border border-gold-500/25 bg-gold-500/5 p-4">
          <p className="text-xs font-semibold tracking-[0.15em] text-gold-300 uppercase">Already on file — no need to repeat it</p>
          <ul className="mt-2 space-y-1">
            {knownSummary.map((line) => (
              <li key={line} className="text-sm text-warm-white/75">
                {line}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <ol className="mb-8 flex items-center gap-3" aria-label="Quote steps">
        {(["Contact", "Project", "Confirm"] as const).map((label, i) => {
          const n = (i + 1) as Step;
          const state2 = n < step ? "done" : n === step ? "active" : "upcoming";
          return (
            <li key={label} className="flex flex-1 flex-col gap-1.5">
              <div
                className={clsx(
                  "h-1 rounded-full transition-colors duration-500",
                  state2 === "upcoming" ? "bg-warm-white/15" : "bg-gold-500",
                )}
              />
              <span className={clsx("text-[11px] font-semibold tracking-[0.1em] uppercase", state2 === "upcoming" ? "text-warm-white/35" : "text-gold-200")}>
                {label}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="relative overflow-hidden">
        <div
          key={step}
          className="animate-[quote-step-in_450ms_cubic-bezier(0.22,1,0.36,1)]"
          style={{ "--enter-x": direction === "forward" ? "18px" : "-18px" } as CSSProperties}
        >
          {step === 1 ? (
            <div className="space-y-5">
              <h2 className="text-xl font-semibold text-warm-white">Who are we sending this to?</h2>
              <Field label="Name" value={values.name} onChange={(v) => set("name", v)} required autoComplete="name" />
              <Field label="Company (if relevant)" value={values.company} onChange={(v) => set("company", v)} autoComplete="organization" />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Email" type="email" value={values.email} onChange={(v) => set("email", v)} required autoComplete="email" />
                <Field label="Phone" type="tel" value={values.phone} onChange={(v) => set("phone", v)} required autoComplete="tel" />
              </div>
              <button
                type="button"
                disabled={!step1Valid}
                onClick={() => goTo(2)}
                className="inline-flex items-center justify-center rounded-sm bg-gradient-to-b from-gold-300 to-gold-700 px-8 py-3.5 text-sm font-medium tracking-wide text-charcoal-950 shadow-elevated transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-floating disabled:pointer-events-none disabled:opacity-40"
              >
                Next
              </button>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="space-y-5">
              <h2 className="text-xl font-semibold text-warm-white">What&apos;s the project?</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Project Location" value={values.location} onChange={(v) => set("location", v)} autoComplete="address-level2" />
                <Field label="Approximate Square Footage" value={values.squareFootage} onChange={(v) => set("squareFootage", v)} />
              </div>
              <Field label="Timeline / Downtime Window" value={values.timeline} onChange={(v) => set("timeline", v)} />
              <div>
                <label htmlFor="notes" className="mb-1.5 block text-sm font-medium text-warm-white/80">
                  Anything else we should know?
                </label>
                <textarea
                  id="notes"
                  rows={4}
                  value={values.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  className="w-full rounded-md border border-warm-white/20 bg-charcoal-900 px-4 py-3 text-sm text-warm-white placeholder:text-warm-white/40 focus:border-gold-300 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="attachments" className="mb-1.5 block text-sm font-medium text-warm-white/80">
                  Photos or plans (optional)
                </label>
                <input
                  id="attachments"
                  type="file"
                  multiple
                  accept="image/*,.pdf"
                  onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
                  className="block w-full text-sm text-warm-white/70 file:mr-4 file:rounded-sm file:border-0 file:bg-gold-500/15 file:px-4 file:py-2 file:text-sm file:font-medium file:text-gold-100 hover:file:bg-gold-500/25"
                />
                <p className="mt-1.5 text-xs text-warm-white/40">Up to 8MB per file, 15MB total.</p>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => goTo(1)} className="text-sm font-medium text-warm-white/60 hover:text-warm-white">
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => goTo(3)}
                  className="inline-flex items-center justify-center rounded-sm bg-gradient-to-b from-gold-300 to-gold-700 px-8 py-3.5 text-sm font-medium tracking-wide text-charcoal-950 shadow-elevated transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-floating"
                >
                  Next
                </button>
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="space-y-5">
              <h2 className="text-xl font-semibold text-warm-white">Confirm and send.</h2>
              <div className="rounded-md border border-warm-white/10 bg-charcoal-900 p-5">
                <dl className="grid gap-3 sm:grid-cols-2">
                  <SummaryRow label="Name" value={values.name} />
                  <SummaryRow label="Company" value={values.company || "—"} />
                  <SummaryRow label="Email" value={values.email} />
                  <SummaryRow label="Phone" value={values.phone} />
                  <SummaryRow label="Location" value={values.location || "—"} />
                  <SummaryRow label="Square Footage" value={values.squareFootage || "—"} />
                  <SummaryRow label="Timeline" value={values.timeline || "—"} />
                  <SummaryRow label="Photos/Plans" value={files.length ? `${files.length} attached` : "None"} />
                </dl>
                {values.notes ? (
                  <p className="mt-4 border-t border-warm-white/10 pt-4 text-sm text-warm-white/70">{values.notes}</p>
                ) : null}
              </div>

              {status === "error" && errorMessage ? <p className="text-sm text-red-400">{errorMessage}</p> : null}

              <div className="flex gap-3">
                <button type="button" onClick={() => goTo(2)} className="text-sm font-medium text-warm-white/60 hover:text-warm-white">
                  Back
                </button>
                <button
                  type="button"
                  disabled={status === "submitting"}
                  onClick={handleSubmit}
                  className="inline-flex items-center justify-center rounded-sm bg-gradient-to-b from-gold-300 to-gold-700 px-8 py-3.5 text-sm font-medium tracking-wide text-charcoal-950 shadow-elevated transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-floating disabled:pointer-events-none disabled:opacity-50"
                >
                  {status === "submitting" ? "Sending…" : "Submit"}
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold tracking-[0.1em] text-warm-white/40 uppercase">{label}</dt>
      <dd className="mt-0.5 text-sm text-warm-white/85">{value}</dd>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  const id = `quote-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-warm-white/80">
        {label}
        {required ? <span className="text-gold-300"> *</span> : null}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-warm-white/20 bg-charcoal-900 px-4 py-3 text-sm text-warm-white placeholder:text-warm-white/40 focus:border-gold-300 focus:outline-none"
      />
    </div>
  );
}
