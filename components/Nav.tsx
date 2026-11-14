"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const HOME_SECTIONS = ["about", "skills", "contact"] as const;

/**
 * Sticky site header with scroll progress meter, active section indicator,
 * and accessible mobile navigation drawer.
 */
export function Nav() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string>("");

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    let rafId = 0;

    const updateScroll = () => {
      rafId = 0;
      const top = window.scrollY || 0;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = height > 0 ? Math.min(1, Math.max(0, top / height)) : 0;
      headerRef.current?.classList.toggle("is-scrolled", top > 20);
      headerRef.current?.style.setProperty("--scroll-ratio", ratio.toFixed(4));
    };

    const onScroll = () => {
      if (!rafId) rafId = window.requestAnimationFrame(updateScroll);
    };

    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveHash("");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveHash(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-22% 0px -55% 0px", threshold: [0, 0.15, 0.4] }
    );

    HOME_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const mq = window.matchMedia("(min-width: 721px)");
    const onResize = () => {
      if (mq.matches) setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    mq.addEventListener("change", onResize);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      mq.removeEventListener("change", onResize);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header ref={headerRef} className="site-header">
      <div className="scroll-progress" aria-hidden="true" />
      <div className="container nav-wrap">
        <Link className="brand" href="/" aria-label="Mạnh Đức home" onClick={closeMenu}>
          <span className="brand-mark">MD</span>
          <span>Mạnh Đức</span>
        </Link>
<<<<<<< HEAD

        <nav
          id="primary-navigation"
          className={`nav-links ${menuOpen ? "is-open" : ""}`}
          aria-label="Primary navigation"
        >
          <Link
            href="/#about"
            onClick={closeMenu}
            aria-current={pathname === "/" && activeHash === "#about" ? "location" : undefined}
          >
            About
          </Link>
          <Link
            href="/#skills"
            onClick={closeMenu}
            aria-current={pathname === "/" && activeHash === "#skills" ? "location" : undefined}
          >
            Skills
          </Link>
          <Link
            href="/projects/mini-soc"
            onClick={closeMenu}
            aria-current={pathname === "/projects/mini-soc" ? "page" : undefined}
          >
            Case Study
          </Link>
          <Link
            href="/#contact"
            onClick={closeMenu}
            aria-current={pathname === "/" && activeHash === "#contact" ? "location" : undefined}
          >
            Contact
          </Link>
=======
        <nav className="nav-links" aria-label="Primary navigation">
          <Link href="/#about">About</Link>
          <Link href="/#skills">Skills</Link>
          <Link href="/#research">Research</Link>
          <Link href="/projects/mini-soc">Case Study</Link>
          <Link href="/#contact">Contact</Link>
>>>>>>> 2c92c10ad66c0062a52dab88c6826db7fdc188b5
        </nav>

        <button
          type="button"
          className="menu-toggle"
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>
    </header>
  );
}
