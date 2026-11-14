"use client";

import { useEffect, useRef } from "react";

interface MeshNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hub: boolean;
}

/**
 * Lightweight, viewport-gated canvas rendering a subtle Blue Team telemetry mesh
 * behind the hero panel. Pauses automatically off-screen or under reduced motion.
 */
export function HeroTopologyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let visible = true;
    let rafId = 0;

    const nodes: MeshNode[] = Array.from({ length: 18 }, (_, index) => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00045,
      vy: (Math.random() - 0.5) * 0.00045,
      hub: index < 5,
    }));

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawFrame = (ts: number) => {
      ctx.clearRect(0, 0, width, height);

      for (const node of nodes) {
        if (!reducedMotion) {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < 0.06 || node.x > 0.94) node.vx *= -1;
          if (node.y < 0.06 || node.y > 0.94) node.vy *= -1;
        }
      }

      const maxDist = Math.min(width, height) * 0.42;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const ax = a.x * width;
        const ay = a.y * height;

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const bx = b.x * width;
          const by = b.y * height;
          const dist = Math.hypot(ax - bx, ay - by);
          if (dist > maxDist) continue;

          const alpha = (1 - dist / maxDist) * 0.24;
          const isAccentEdge = a.hub && b.hub;
          ctx.strokeStyle = isAccentEdge
            ? `rgba(120, 223, 173, ${(alpha * 1.15).toFixed(3)})`
            : `rgba(99, 213, 255, ${alpha.toFixed(3)})`;
          ctx.lineWidth = isAccentEdge ? 1.15 : 0.85;
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.stroke();

          if (!reducedMotion && isAccentEdge) {
            const pulseT = ((ts * 0.00045 + i * 0.27) % 1 + 1) % 1;
            const px = ax + (bx - ax) * pulseT;
            const py = ay + (by - ay) * pulseT;
            ctx.fillStyle = "rgba(120, 223, 173, 0.72)";
            ctx.beginPath();
            ctx.arc(px, py, 1.8, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const nx = node.x * width;
        const ny = node.y * height;
        ctx.fillStyle = node.hub
          ? "rgba(120, 223, 173, 0.72)"
          : "rgba(99, 213, 255, 0.48)";
        ctx.beginPath();
        ctx.arc(nx, ny, node.hub ? 2.4 : 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = (ts: number) => {
      if (visible && !reducedMotion) {
        drawFrame(ts);
        rafId = window.requestAnimationFrame(tick);
      }
    };

    resize();
    drawFrame(0);
    window.addEventListener("resize", resize, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
        if (visible && !reducedMotion && !rafId) {
          rafId = window.requestAnimationFrame(tick);
        } else if (!visible && rafId) {
          window.cancelAnimationFrame(rafId);
          rafId = 0;
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    if (!reducedMotion) {
      rafId = window.requestAnimationFrame(tick);
    }

    return () => {
      window.removeEventListener("resize", resize);
      observer.disconnect();
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-topology-canvas" aria-hidden="true" />;
}
