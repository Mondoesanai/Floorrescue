"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { useJourney } from "@/lib/journey/context";
import { getSector } from "@/content/sectors";
import { getProblem } from "@/content/problems";
import { trackEvent } from "@/lib/analytics";
import { QuoteSuccess } from "./QuoteSuccess";

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

  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [devFallback, setDevFallback] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    if (environment) data.set("environment", environment);
    if (sector) {
      data.set("sectorId", sector.id);
      data.set("sectorLabel", sector.name);
    }
    if (projectState) data.set("projectState", projectState);
    concernIds.forEach((id) => data.append("concerns", id));
    if (otherDescription) data.set("otherDescription", otherDescription);
    data.set("landingRoute", window.location.pathname);

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
    <form onSubmit={handleSubmit} className="space-y-8">
      {knownSummary.length > 0 ? (
        <div className="rounded-md border border-gold-500/25 bg-gold-500/5 p-4">
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

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required autoComplete="name" />
        <Field label="Company (if relevant)" name="company" autoComplete="organization" />
        <Field label="Email" name="email" type="email" required autoComplete="email" />
        <Field label="Phone" name="phone" type="tel" required autoComplete="tel" />
        <Field label="Project Location" name="location" autoComplete="address-level2" />
        <Field label="Approximate Square Footage" name="squareFootage" />
        <Field label="Timeline / Downtime Window" name="timeline" className="sm:col-span-2" />
      </div>

      <div>
        <label htmlFor="notes" className="mb-1.5 block text-sm font-medium text-warm-white/80">
          Anything else we should know?
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          className="w-full rounded-md border border-warm-white/20 bg-charcoal-900 px-4 py-3 text-sm text-warm-white placeholder:text-warm-white/40 focus:border-gold-300 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="attachments" className="mb-1.5 block text-sm font-medium text-warm-white/80">
          Photos or plans (optional)
        </label>
        <input
          id="attachments"
          name="attachments"
          type="file"
          multiple
          accept="image/*,.pdf"
          className="block w-full text-sm text-warm-white/70 file:mr-4 file:rounded-sm file:border-0 file:bg-gold-500/15 file:px-4 file:py-2 file:text-sm file:font-medium file:text-gold-100 hover:file:bg-gold-500/25"
        />
        <p className="mt-1.5 text-xs text-warm-white/40">Up to 8MB per file, 15MB total.</p>
      </div>

      {status === "error" && errorMessage ? <p className="text-sm text-red-400">{errorMessage}</p> : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center rounded-sm bg-gradient-to-b from-gold-300 to-gold-700 px-8 py-3.5 text-sm font-medium tracking-wide text-charcoal-950 shadow-elevated transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-floating focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300 disabled:pointer-events-none disabled:opacity-50"
      >
        {status === "submitting" ? "Sending…" : "Request a Quote"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-warm-white/80">
        {label}
        {required ? <span className="text-gold-300"> *</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-md border border-warm-white/20 bg-charcoal-900 px-4 py-3 text-sm text-warm-white placeholder:text-warm-white/40 focus:border-gold-300 focus:outline-none"
      />
    </div>
  );
}
