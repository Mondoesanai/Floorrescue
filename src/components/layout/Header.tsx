"use client";

import Link from "next/link";
import Image from "next/image";
import { HamburgerMenu } from "./HamburgerMenu";

export function Header() {
  return (
    <>
      <Link
        href="/"
        className="fixed top-5 left-5 z-40 flex h-11 items-center rounded-full border border-warm-white/25 bg-charcoal-950/55 px-4 backdrop-blur-md transition-transform duration-200 hover:-translate-y-0.5"
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
      <HamburgerMenu dark />
    </>
  );
}
