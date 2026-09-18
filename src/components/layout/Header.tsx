"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { HamburgerMenu } from "./HamburgerMenu";
import { InlineSearch } from "./InlineSearch";
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
          aria-label="Floor Rescue — back to home"
          className="group flex h-11 items-center gap-2 rounded-full border border-warm-white/25 bg-charcoal-950/55 px-4 backdrop-blur-md transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-gold-300/50 hover:bg-charcoal-900/80"
        >
          <Image
            src="/assets/images/floor-rescue-logo-transparent.png"
            alt=""
            width={140}
            height={14}
            className="h-4 w-auto object-contain"
            priority
          />
          <span className="max-w-0 overflow-hidden text-xs font-semibold whitespace-nowrap text-gold-200 opacity-0 transition-[max-width,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:max-w-[4rem] group-hover:opacity-100">
            Home
          </span>
        </button>
      </div>

      {/* Search lives on its own, outside the hamburger — it needs to be
          reachable in one press, not buried a menu-open away. */}
      <InlineSearch />

      <HamburgerMenu dark />
    </>
  );
}
