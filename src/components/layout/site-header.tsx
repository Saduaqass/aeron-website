"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";

const links = [
  ["design", "Design"],
  ["performance", "Performance"],
  ["interior", "Interior"],
  ["technology", "Technology"],
  ["configurator", "Configurator"],
];

export function SiteHeader() {
  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = ["home", ...links.map(([id]) => id), "contact"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.15, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header${compact ? " site-header--compact" : ""}`}>
      <div className="site-header__bar page-gutter">
        <Link className="brand-mark" href="#home" aria-label="AERON home" onClick={closeMenu}>
          AERON<span className="brand-mark__dot">.</span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([id, label]) => (
            <Link key={id} href={`#${id}`} className={active === id ? "is-active" : ""}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <div className="language-switch" aria-label="Language">
            <button type="button" aria-pressed="true">KZ</button>
            <button type="button" aria-pressed="false">RU</button>
            <button type="button" aria-pressed="false">EN</button>
          </div>
          <Link className="header-cta" href="#contact">
            <span>Contact</span><ArrowUpRight size={15} strokeWidth={1.7} aria-hidden="true" />
          </Link>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-navigation"
        className={`mobile-nav${menuOpen ? " mobile-nav--open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className="mobile-nav__links">
          {[["home", "Home"], ...links, ["contact", "Contact"]].map(([id, label], index) => (
            <Link key={id} href={`#${id}`} onClick={closeMenu} style={{ "--item-index": index } as CSSProperties}>
              <span>{label}</span><ArrowUpRight size={19} strokeWidth={1.6} aria-hidden="true" />
            </Link>
          ))}
        </div>
        <p className="mobile-nav__footnote">AERON ONE <span>·</span> BEYOND ELECTRIC</p>
      </nav>
    </header>
  );
}
