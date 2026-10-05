"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/Button";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { href: "/#stage", label: "3D Viewer" },
  { href: "/editor", label: "3D Studio" },
  { href: "/tools/3d-model-viewer", label: "Tools" },
  { href: "/blog", label: "Articles" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl hairline-border-b">
      <div className="container-atelier h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-4 lg:gap-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 font-semibold tracking-tight text-on-surface text-sm uppercase group"
          >
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 shrink-0 group-hover:scale-105 transition-transform">
              <Image
                src="/logo.png"
                alt="Showcase 3D Web Studio Logo"
                fill
                priority
                sizes="32px"
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xs sm:text-sm tracking-tight leading-none text-on-surface font-headline">
                Showcase
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-widest text-on-surface-variant font-mono uppercase mt-0.5">
                3D Web Studio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-1 pl-5 border-l border-border-hairline"
          >
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href.replace(/#.*$/, ""));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors ${
                    isActive
                      ? "text-on-surface bg-surface-container-high font-semibold"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Utility Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <ThemeToggle />

          {/* Desktop CTA Button */}
          <div className="hide-below-lg shrink-0">
            <Button
              href="/editor"
              variant="primary"
              size="sm"
              iconRight={<ArrowUpRight className="w-3.5 h-3.5" />}
            >
              Open 3D Studio
            </Button>
          </div>

          {/* Mobile & Tablet Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-nav-toggle-btn"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="hide-from-lg shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-sm hairline-border bg-surface text-on-surface hover:bg-surface-container cursor-pointer transition-colors"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Drawer */}
      <div
        className={`lg:hidden drawer-panel-top overflow-hidden bg-background hairline-border-b px-4 sm:px-6 transition-all duration-200 ${
          mobileMenuOpen
            ? "max-h-96 opacity-100 py-4 pointer-events-auto visible"
            : "max-h-0 opacity-0 py-0 pointer-events-none invisible"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="space-y-1.5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium rounded-sm text-on-surface hover:bg-surface-container transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-border-hairline">
            <Button
              href="/editor"
              variant="primary"
              size="md"
              className="w-full justify-center"
              onClick={() => setMobileMenuOpen(false)}
              iconRight={<ArrowUpRight className="w-4 h-4" />}
            >
              Open 3D Studio
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
