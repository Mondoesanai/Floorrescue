"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SceneVideo } from "./SceneVideo";
import { MuteButton } from "./MuteButton";
import { useJourney } from "@/lib/journey/context";
import { useAudio } from "@/lib/audio/context";
import { playClick, startAmbientHum, stopAmbientHum } from "@/lib/audio/sfx";
import { preloadVideo } from "@/lib/video/preload";
import { resolveSceneAsset } from "@/lib/video/registry";
import { Button } from "@/components/ui/Button";
import { SearchDrawer } from "@/components/browse/SearchDrawer";
import { trackEvent } from "@/lib/analytics";

export function GarageIdleScene() {
  const { dispatch } = useJourney();
  const { muted, unlock } = useAudio();
  const [searchOpen, setSearchOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Commercial is the built-out path — warm its cache while the visitor
    // reads the idle scene, per implementation/performance-budget.md's relay strategy.
    preloadVideo(resolveSceneAsset("commercialBuild", "desktop").video);
    if (!muted) startAmbientHum();
    return () => stopAmbientHum();
  }, [muted]);

  function chooseCommercial() {
    unlock();
    if (!muted) playClick();
    trackEvent("environment_selected", { environment: "commercial" });
    dispatch({ type: "CHOOSE_ENVIRONMENT", environment: "commercial" });
  }

  return (
    <SceneVideo sceneKey="garageIdle" loop className="relative h-[100svh] w-full overflow-hidden bg-charcoal-950">
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/20 to-transparent" />

      <div className="absolute top-6 right-6">
        <MuteButton />
      </div>

      <div className="absolute inset-x-0 bottom-0 px-6 pb-14 sm:px-10 sm:pb-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.25em] text-gold-300 uppercase">Concrete Floors + Resinous Systems</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-[-0.03em] text-warm-white sm:text-5xl">
            The Power Is in the Install.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-[1.7] text-warm-white/75">
            Floor systems engineered around the slab, the space, and the way it actually gets used.
          </p>

          <p className="mt-9 text-sm font-medium tracking-wide text-warm-white/70">Where does your project live?</p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <button
              type="button"
              onClick={chooseCommercial}
              className="group rounded-md border border-warm-white/15 bg-charcoal-950/50 px-6 py-4 text-left backdrop-blur-sm transition-[transform,border-color,background-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-gold-300 hover:bg-charcoal-900/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-300"
            >
              <span className="block text-xs font-semibold tracking-[0.15em] text-gold-300 uppercase">My Business</span>
              <span className="mt-1 block text-lg font-medium text-warm-white">Commercial</span>
            </button>

            <a
              href="/residential"
              className="group rounded-md border border-warm-white/15 bg-charcoal-950/50 px-6 py-4 text-left backdrop-blur-sm transition-[transform,border-color,background-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-gold-300 hover:bg-charcoal-900/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-300"
              onClick={(e) => {
                e.preventDefault();
                unlock();
                if (!muted) playClick();
                trackEvent("environment_selected", { environment: "residential" });
                dispatch({ type: "CHOOSE_ENVIRONMENT", environment: "residential" });
                router.push("/residential");
              }}
            >
              <span className="block text-xs font-semibold tracking-[0.15em] text-gold-300 uppercase">My Home</span>
              <span className="mt-1 block text-lg font-medium text-warm-white">Residential</span>
            </a>

            <a
              href="/industrial"
              className="group rounded-md border border-warm-white/15 bg-charcoal-950/50 px-6 py-4 text-left backdrop-blur-sm transition-[transform,border-color,background-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-gold-300 hover:bg-charcoal-900/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-300"
              onClick={(e) => {
                e.preventDefault();
                unlock();
                if (!muted) playClick();
                trackEvent("environment_selected", { environment: "industrial" });
                dispatch({ type: "CHOOSE_ENVIRONMENT", environment: "industrial" });
                router.push("/industrial");
              }}
            >
              <span className="block text-xs font-semibold tracking-[0.15em] text-gold-300 uppercase">My Facility</span>
              <span className="mt-1 block text-lg font-medium text-warm-white">Industrial</span>
            </a>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="text-sm font-medium text-warm-white/60 underline-offset-4 transition-colors hover:text-gold-100 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300"
            >
              I know what I need
            </button>
            <Link
              href="/explore"
              className="text-sm font-medium text-warm-white/60 underline-offset-4 transition-colors hover:text-gold-100 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300"
            >
              Explore Floor Rescue
            </Link>
          </div>

          <Button href="/quote" variant="secondary" className="mt-8">
            Request a Quote
          </Button>
        </div>
      </div>

      <SearchDrawer open={searchOpen} onClose={() => setSearchOpen(false)} />
    </SceneVideo>
  );
}
