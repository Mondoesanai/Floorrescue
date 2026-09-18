"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { HamburgerMenu } from "./HamburgerMenu";
import { SearchDrawer } from "@/components/browse/SearchDrawer";
import { useJourney } from "@/lib/journey/context";

/**
 * The logo IS the home button — clicking it always resets the journey and
 * returns to "/", from anywhere on the site. No separate "back" button next
 * to it; one clear affordance, not two doing the same thing.
 */
export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { dispatch } = useJourney();
  const [searchOpen, setSearchOpen] = useState(false);

  function goHome() {
    // The whole cinematic journey (space -> project -> deep dive) lives on
    // "/" the entire time — pathname alone can't tell "already home" apart
    // from "mid-journey", so always reset the journey state. Only skip the
    // navigation call itself when we're already on "/" (nothing to route to).
    dispatch({ type: "RESET" });
    if (pathname !== "/") router.push("/");
  }

  return (
    <>
      <div className="fixed top-5 left-5 z-40 flex items-center gap-2.5">
        <button
          type="button"
          onClick={goHome}
          className="flex h-11 items-center rounded-full border border-warm-white/25 bg-charcoal-950/55 px-4 backdrop-blur-md transition-transform duration-200 hover:-translate-y-0.5"
        >
          <Image
            src="/assets/images/floor-rescue-logo-transparent.png"
            alt="Floor Rescue — back to home"
            width={140}
            height={14}
            className="h-4 w-auto object-contain"
            priority
          />
        </button>
      </div>

      {/* Search lives on its own, outside the hamburger — it needs to be
          reachable in one press, not buried a menu-open away. */}
      <div className="fixed top-5 right-[4.75rem] z-40">
        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          aria-label="Search Floor Rescue"
          className="flex h-11 items-center gap-2 rounded-full border border-warm-white/25 bg-charcoal-950/55 px-4 text-sm text-warm-white/60 backdrop-blur-md transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-gold-300/50 hover:text-warm-white/80"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="flex-none text-gold-300">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <span className="hidden sm:inline">Search anything…</span>
        </button>
      </div>

      <HamburgerMenu dark />
      <SearchDrawer open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
