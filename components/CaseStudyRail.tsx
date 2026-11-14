"use client";

import { useEffect, useState } from "react";

const CASE_SECTIONS = [
  { id: "problem", code: "01", label: "Problem" },
  { id: "architecture", code: "02", label: "Architecture" },
  { id: "contributions", code: "03", label: "Contributions" },
  { id: "detection", code: "04", label: "Detection" },
  { id: "pb-01", code: "PB1", label: "Web Recon" },
  { id: "pb-02", code: "PB2", label: "Web Exploit" },
  { id: "pb-03", code: "PB3", label: "Shell Audit" },
  { id: "foundation", code: "07", label: "Foundation" },
  { id: "safe-automation", code: "08", label: "Safe Auto" },
  { id: "evidence", code: "09", label: "Evidence" },
  { id: "boundaries", code: "10", label: "Boundaries" },
  { id: "lessons", code: "11", label: "Lessons" },
] as const;

/**
 * Compact desktop side-rail navigator for the 11-section Mini SOC case study.
 */
export function CaseStudyRail() {
  const [activeId, setActiveId] = useState<string>("problem");
  const [progressPct, setProgressPct] = useState<number>(0);

  useEffect(() => {
    let rafId = 0;

    const updateScroll = () => {
      rafId = 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const ratio = Math.min(1, Math.max(0, (window.scrollY || 0) / max));
      setProgressPct(Math.round(ratio * 100));
    };

    const onScroll = () => {
      if (!rafId) rafId = window.requestAnimationFrame(updateScroll);
    };

    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.15, 0.35] }
    );

    CASE_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer.disconnect();
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <aside className="case-rail" aria-label="Case study quick navigation">
      <div className="case-rail-track">
        <span className="case-rail-code">SOC // NAV</span>
        <ul className="case-rail-list">
          {CASE_SECTIONS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`case-rail-node ${activeId === item.id ? "is-active" : ""}`}
                aria-current={activeId === item.id ? "location" : undefined}
              >
                <span className="rail-dot" aria-hidden="true" />
                <span className="rail-tooltip">
                  {item.code} · {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <span className="case-rail-pct">{String(progressPct).padStart(3, "0")}%</span>
      </div>
    </aside>
  );
}
