import { Button } from "@/components/ui/Button";

export function QuoteSuccess({ devFallback }: { devFallback: boolean }) {
  return (
    <div className="rounded-md border border-gold-500/25 bg-gold-500/5 p-8 text-center">
      <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">Request Received</p>
      <h2 className="mt-3 text-2xl font-semibold text-warm-white">Thanks — that&apos;s in.</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-[1.7] text-warm-white/70">
        {devFallback
          ? "This is running in development without a live email connection, so your submission was logged locally instead of sent — nothing was lost."
          : "Your project details were sent to the Floor Rescue team. Expect a follow-up shortly."}
      </p>
      <Button href="/" variant="secondary" className="mt-6">
        Back to Floor Rescue
      </Button>
    </div>
  );
}
