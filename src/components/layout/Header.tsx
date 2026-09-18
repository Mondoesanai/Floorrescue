"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { HamburgerMenu } from "./HamburgerMenu";
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
    if (pathname === "/") return;
    dispatch({ type: "RESET" });
    router.push("/");
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
      <HamburgerMenu dark />
    </>
  );
}
