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

// A fanned showcase, not a flat grid — each card tilts on a different
// diagonal so the row reads as a spread of physical cards facing the
// visitor from slightly different angles, left to right.
const cards = [
  {
    id: "commercial",
    eyebrow: "My Business",
    title: "Commercial",
    image: "/assets/images/card-commercial.jpg",
    tilt: "sm:[transform:perspective(1800px)_rotate3d(1,-1,0,14deg)] sm:hover:[transform:perspective(1800px)_rotate3d(1,-1,0,5deg)_translateY(-6px)]",
  },
  {
    id: "residential",
    eyebrow: "My Home",
    title: "Residential",
    image: "/assets/images/card-residential.jpg",
    tilt: "sm:[transform:perspective(1800px)_rotate3d(1,0,0,7deg)] sm:hover:[transform:perspective(1800px)_rotate3d(1,0,0,2deg)_translateY(-6px)]",
  },
  {
    id: "industrial",
    eyebrow: "My Facility",
    title: "Industrial",
    image: "/assets/images/card-industrial.jpg",
    tilt: "sm:[transform:perspective(1800px)_rotate3d(1,1,0,14deg)] sm:hover:[transform:perspective(1800px)_rotate3d(1,1,0,5deg)_translateY(-6px)]",
  },
] as const;

const quoteTilt =
  "sm:[transform:perspective(1800px)_rotate3d(1,0.6,0,10deg)] sm:hover:[transform:perspective(1800px)_rotate3d(1,0.6,0,3deg)_translateY(-6px)]";

/**
 * "You can click this" affordance — a persistent bottom bar baked into the
 * card, not a hover-only or corner-badge cue. It has to read as clickable
 * before anyone interacts with it, on touch devices too.
 */
function SelectHint() {
  return (
    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-charcoal-950/95 via-charcoal-950/50 to-transparent px-2.5 pt-6 pb-2 sm:px-3.5 sm:pb-3">
      <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.14em] text-gold-200 uppercase sm:text-xs">
        <span className="h-1.5 w-1.5 flex-none animate-pulse rounded-full bg-gold-300" />
        Select
      </span>
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        className="text-gold-200 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 sm:h-4 sm:w-4"
      >
        <path d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
}

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
      transition({ type: "CHOOSE_ENVIRONMENT", environment: id });
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
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-end overflow-hidden px-4 pb-6 sm:px-6 sm:pb-10 lg:pb-12">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/35 to-transparent sm:from-charcoal-950/92 sm:via-charcoal-950/10" />

      <div
        className={clsx(
          "relative z-10 w-full max-w-5xl text-center transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          leaving ? "translate-y-3 opacity-0" : "translate-y-0 opacity-100",
        )}
      >
        <p className="hidden text-xs font-semibold tracking-[0.3em] text-gold-300 uppercase sm:block">
          Concrete Floors + Resinous Systems
        </p>
        <h1 className="text-3d-gold mx-auto mt-1 text-balance text-3xl font-black tracking-[-0.02em] sm:mt-3 sm:text-6xl lg:text-7xl">
          Take Pride in Your Floors.
        </h1>

        <div className="mx-auto mt-3 flex flex-col items-center gap-1 sm:mt-6 sm:gap-1.5">
          <p className="text-sm font-extrabold tracking-[0.06em] text-gold-200 uppercase sm:text-xl lg:text-2xl">
            Select Your Space
          </p>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="animate-bounce text-gold-300 sm:h-5 sm:w-5"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>

        <div className="mx-auto mt-2.5 grid max-w-[92rem] grid-cols-2 gap-3 sm:mt-6 sm:flex sm:flex-row sm:items-start sm:justify-center sm:gap-7 sm:[perspective:1800px] sm:px-4">
          {cards.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => choose(card.id)}
              className={clsx(
                "group flex flex-col overflow-hidden rounded-xl border border-warm-white/10 bg-charcoal-900 text-left shadow-elevated transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-gold-300/50 hover:shadow-floating focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300 sm:w-64 lg:w-72",
                card.tilt,
              )}
            >
              <div className="flex-none px-3 pt-2.5 pb-1.5 sm:px-4 sm:pt-4 sm:pb-2">
                <span className="block truncate text-[9px] font-semibold tracking-[0.1em] text-gold-300 uppercase sm:text-[11px] sm:tracking-[0.15em]">
                  {card.eyebrow}
                </span>
                <span className="mt-0.5 block text-base font-extrabold text-warm-white sm:text-2xl">{card.title}</span>
              </div>
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 18rem, 45vw"
                  className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/50 via-transparent to-transparent" />
                <SelectHint />
              </div>
            </button>
          ))}

          <button
            type="button"
            onClick={goToQuote}
            className={clsx(
              "group flex flex-col overflow-hidden rounded-xl border border-gold-500/30 bg-charcoal-900 text-left shadow-elevated transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-gold-300/70 hover:shadow-floating focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300 sm:w-64 lg:w-72",
              quoteTilt,
            )}
          >
            <div className="flex-none px-3 pt-2.5 pb-1.5 sm:px-4 sm:pt-4 sm:pb-2">
              <span className="block truncate text-[9px] font-semibold tracking-[0.1em] text-gold-300 uppercase sm:text-[11px] sm:tracking-[0.15em]">
                I Already Know
              </span>
              <span className="mt-0.5 block text-base font-extrabold text-warm-white sm:text-2xl">Request a Quote</span>
            </div>
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src="/assets/images/card-install.jpg"
                alt=""
                fill
                sizes="(min-width: 640px) 18rem, 45vw"
                className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/50 via-transparent to-transparent" />
              <SelectHint />
            </div>
          </button>
        </div>

        <a
          href="#learn-more"
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-warm-white/60 transition-colors hover:text-gold-200 sm:mt-7 sm:text-sm"
        >
          Who We Are
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </a>
      </div>
    </div>
  );
}
