"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { useJourney } from "@/lib/journey/context";
import { useSceneTransition } from "@/lib/journey/useSceneTransition";
import { preloadVideo } from "@/lib/video/preload";
import { resolveSceneAsset } from "@/lib/video/registry";
import { trackEvent } from "@/lib/analytics";

const cards = [
  {
    id: "commercial",
    eyebrow: "My Business",
    title: "Commercial",
    image: "/assets/images/card-commercial.jpg",
  },
  {
    id: "residential",
    eyebrow: "My Home",
    title: "Residential",
    image: "/assets/images/card-residential.jpg",
  },
  {
    id: "industrial",
    eyebrow: "My Facility",
    title: "Industrial",
    image: "/assets/images/card-industrial.jpg",
  },
] as const;

export function GarageIdleScene() {
  const { dispatch } = useJourney();
  const { leaving, transition } = useSceneTransition();
  const router = useRouter();

  useEffect(() => {
    preloadVideo(resolveSceneAsset("commercialBuild", "desktop").video);
  }, []);

  function choose(id: (typeof cards)[number]["id"]) {
    trackEvent("environment_selected", { environment: id });
    if (id === "commercial") {
      transition({ type: "CHOOSE_ENVIRONMENT", environment: "commercial" });
      return;
    }
    dispatch({ type: "CHOOSE_ENVIRONMENT", environment: id });
    // Not a CinematicStage transition (it's a real route change) — still fade
    // the UI first so the click doesn't feel like an instant hard cut.
    window.setTimeout(() => router.push(`/${id}`), 260);
  }

  function goToQuote() {
    trackEvent("quote_started", { source: "garage-idle-card" });
    window.setTimeout(() => router.push("/quote"), 260);
  }

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-end overflow-hidden px-6 pb-14 sm:pb-16">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-950/92 via-charcoal-950/10 to-transparent" />

      <div
        className={clsx(
          "relative z-10 w-full max-w-4xl text-center transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          leaving ? "translate-y-3 opacity-0" : "translate-y-0 opacity-100",
        )}
      >
        <p className="text-xs font-semibold tracking-[0.25em] text-gold-300 uppercase">Concrete Floors + Resinous Systems</p>
        <h1 className="mt-3 text-balance text-4xl font-semibold tracking-[-0.03em] text-warm-white sm:text-5xl">
          The Power Is in the Install.
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-base leading-[1.7] text-warm-white/75">
          Floor systems engineered around the slab, the space, and the way it actually gets used.
        </p>

        <p className="mt-8 text-sm font-medium tracking-wide text-warm-white/70">What are you looking for?</p>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {cards.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => choose(card.id)}
              className="group relative aspect-[3/4] overflow-hidden rounded-xl shadow-elevated transition-[transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] [perspective:900px] hover:-translate-y-1.5 hover:shadow-floating focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300"
            >
              <Image
                src={card.image}
                alt=""
                fill
                sizes="(min-width: 640px) 22vw, 45vw"
                className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/25 to-charcoal-950/10 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent" />
              <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 transition-[box-shadow] duration-300 group-hover:ring-gold-300/60" />
              <div className="absolute inset-x-0 bottom-0 p-3 text-left sm:p-4">
                <span className="block text-[10px] font-semibold tracking-[0.15em] text-gold-300 uppercase sm:text-xs">
                  {card.eyebrow}
                </span>
                <span className="mt-0.5 block text-base font-semibold text-warm-white sm:text-lg">{card.title}</span>
              </div>
            </button>
          ))}

          <button
            type="button"
            onClick={goToQuote}
            className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-gold-500/30 bg-gradient-to-br from-charcoal-900 via-charcoal-900 to-gold-900/25 shadow-elevated transition-[transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-floating hover:border-gold-300/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3 text-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-gold-300">
                <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
              </svg>
              <span className="text-[10px] font-semibold tracking-[0.15em] text-gold-300 uppercase sm:text-xs">I Already Know</span>
              <span className="text-sm font-semibold text-warm-white sm:text-base">Request a Quote Now</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
