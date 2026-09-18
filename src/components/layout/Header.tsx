"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { HamburgerMenu } from "./HamburgerMenu";
import { useJourney } from "@/lib/journey/context";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { dispatch } = useJourney();
  const onHome = pathname === "/";

  return (
    <>
      <div className="fixed top-5 left-5 z-40 flex items-center gap-2.5">
        <Link
          href="/"
          className="flex h-11 items-center rounded-full border border-warm-white/25 bg-charcoal-950/55 px-4 backdrop-blur-md transition-transform duration-200 hover:-translate-y-0.5"
        >
          <Image
            src="/assets/images/floor-rescue-logo-transparent.png"
            alt="Floor Rescue"
            width={140}
            height={14}
            className="h-4 w-auto object-contain"
            priority
          />
        </Link>
        {!onHome ? (
          <button
            type="button"
            onClick={() => {
              dispatch({ type: "RESET" });
              router.push("/");
            }}
            className="hidden h-11 items-center rounded-full border border-warm-white/25 bg-charcoal-950/55 px-4 text-xs font-semibold tracking-wide text-warm-white/85 backdrop-blur-md transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-gold-300 hover:text-gold-100 sm:flex"
          >
            Back to Experience
          </button>
        ) : null}
      </div>
      <HamburgerMenu dark />
    </>
  );
}
