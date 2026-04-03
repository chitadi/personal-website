"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { primarySections } from "@/content/site-data";

export function SiteHeader() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState(primarySections[0]?.id ?? "");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const sectionElements = primarySections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!sectionElements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((entryA, entryB) => entryB.intersectionRatio - entryA.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.2, 0.4, 0.7],
      },
    );

    sectionElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-header__brand">
          <span className="site-header__brand-mark">C</span>
          <span className="site-header__brand-copy">
            <strong>Chittem</strong>
          </span>
        </Link>

        <button
          type="button"
          className={`site-header__menu-toggle${
            isMenuOpen ? " site-header__menu-toggle--open" : ""
          }`}
          onClick={() => setIsMenuOpen((current) => !current)}
          aria-controls="site-primary-nav"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close section menu" : "Open section menu"}
        >
          <span className="site-header__menu-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        <nav
          id="site-primary-nav"
          className={`site-header__nav${isMenuOpen ? " site-header__nav--open" : ""}`}
          aria-label="Primary"
        >
          {primarySections.map((section) => {
            const href = pathname === "/" ? `/#${section.id}` : `/#${section.id}`;
            const isActive = pathname === "/" && activeSection === section.id;

            return (
              <Link
                key={section.id}
                href={href}
                className={`site-header__link ${isActive ? "site-header__link--active" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {section.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
