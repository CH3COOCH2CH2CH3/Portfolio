"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Binds scroll-reveal choreography and subtle pointer spotlight tracking across cards.
 * Re-initializes cleanly on client-side route transitions.
 */
export function MotionEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>(".reveal-item"));

    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach((el) => el.classList.add("is-visible"));
    } else {
      document.documentElement.classList.add("motion-ready");

      document.querySelectorAll<HTMLElement>(".reveal-group").forEach((group) => {
        const children = group.querySelectorAll<HTMLElement>(".reveal-item");
        children.forEach((item, index) => {
          item.style.setProperty("--reveal-delay", `${Math.min(index * 55, 220)}ms`);
        });
      });

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -28px 0px", threshold: 0.05 }
      );

      revealItems.forEach((item) => {
        if (item.getBoundingClientRect().top < window.innerHeight * 0.94) {
          item.classList.add("is-visible");
        } else {
          observer.observe(item);
        }
      });

      const spotlightCards = Array.from(
        document.querySelectorAll<HTMLElement>("[data-spotlight]")
      );
      const cleanups: Array<() => void> = [];

      for (const card of spotlightCards) {
        let rafId = 0;
        let lastX = 0;
        let lastY = 0;

        const onMove = (event: PointerEvent) => {
          if (event.pointerType === "touch") return;
          lastX = event.clientX;
          lastY = event.clientY;
          if (rafId) return;
          rafId = window.requestAnimationFrame(() => {
            rafId = 0;
            const rect = card.getBoundingClientRect();
            if (!rect.width || !rect.height) return;
            const x = lastX - rect.left;
            const y = lastY - rect.top;
            card.style.setProperty("--spot-x", `${x.toFixed(1)}px`);
            card.style.setProperty("--spot-y", `${y.toFixed(1)}px`);
          });
        };

        card.addEventListener("pointermove", onMove, { passive: true });
        cleanups.push(() => {
          card.removeEventListener("pointermove", onMove);
          if (rafId) window.cancelAnimationFrame(rafId);
        });
      }

      return () => {
        observer.disconnect();
        cleanups.forEach((fn) => fn());
      };
    }
  }, [pathname]);

  return null;
}
