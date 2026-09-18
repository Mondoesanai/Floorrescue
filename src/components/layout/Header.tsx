"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import { Button } from "@/components/ui/Button";
import { SearchDrawer } from "@/components/browse/SearchDrawer";

const navLinks = [
  { href: "/residential", label: "Residential" },
  { href: "/commercial", label: "Commercial" },
  { href: "/industrial", label: "Industrial" },
  { href: "/systems", label: "Floor Systems" },
  { href: "/projects", label: "Projects" },
  { href: "/resources", label: "Resources" },
  { href: "/for-the-trade", label: "For the Trade" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-warm-white/10 bg-charcoal-950/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
            <Image
              src="/assets/images/floor-rescue-logo-reference.png"
              alt="Floor Rescue"
              width={140}
              height={24}
              className="h-5 w-auto object-contain"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-5 xl:gap-6 lg:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap text-[13px] xl:text-sm font-medium text-warm-white/75 transition-colors duration-200 hover:text-gold-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="I know what I need — search Floor Rescue"
              className="hidden items-center gap-1.5 whitespace-nowrap text-[13px] font-medium text-warm-white/75 transition-colors hover:text-gold-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300 lg:inline-flex"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span className="hidden xl:inline">I know what I need</span>
            </button>
            <Button href="/quote" className="hidden whitespace-nowrap sm:inline-flex" variant="primary">
              Request a Quote
            </Button>
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-sm text-warm-white lg:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-300"
            >
              <span className="sr-only">Menu</span>
              <div className="flex flex-col gap-1.5">
                <span className={clsx("h-px w-5 bg-current transition-transform", mobileOpen && "translate-y-[6.5px] rotate-45")} />
                <span className={clsx("h-px w-5 bg-current transition-opacity", mobileOpen && "opacity-0")} />
                <span className={clsx("h-px w-5 bg-current transition-transform", mobileOpen && "-translate-y-[6.5px] -rotate-45")} />
              </div>
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <div className="border-t border-warm-white/10 bg-charcoal-950 px-6 py-4 lg:hidden">
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-sm px-2 py-3 text-base font-medium text-warm-white/85 hover:bg-warm-white/5 hover:text-gold-100"
                >
                  {link.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  setSearchOpen(true);
                }}
                className="rounded-sm px-2 py-3 text-left text-base font-medium text-warm-white/85 hover:bg-warm-white/5 hover:text-gold-100"
              >
                I know what I need
              </button>
              <Button href="/quote" className="mt-3 w-full justify-center" onClick={() => setMobileOpen(false)}>
                Request a Quote
              </Button>
            </nav>
          </div>
        ) : null}
      </header>

      <SearchDrawer open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
