"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Binds scroll-reveal choreography, 3D holographic diorama card tilt + spotlight,
 * magnetic CTAs, and interactive 3D geodesic network spheres across routes.
 */
export function MotionEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = false;
    const panels = Array.from(
      document.querySelectorAll<HTMLElement>(".ks-inview, .reveal-item")
    );

    document
      .querySelectorAll<HTMLElement>(".ks-bento, .ks-steps, .reveal-group")
      .forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>(".ks-inview, .reveal-item");
        items.forEach((item, index) => {
          item.style.setProperty("--reveal-delay", `${Math.min(index * 65, 260)}ms`);
        });
      });

    let revealObserver: IntersectionObserver | null = null;
    if (!reducedMotion && "IntersectionObserver" in window) {
      document.documentElement.classList.add("ks-ready", "motion-ready");
      revealObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("ks-visible", "is-visible");
              revealObserver?.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -30px 0px", threshold: 0.04 }
      );

      panels.forEach((panel) => {
        if (panel.getBoundingClientRect().top < window.innerHeight * 0.96) {
          panel.classList.add("ks-visible", "is-visible");
        } else {
          revealObserver?.observe(panel);
        }
      });
    } else {
      panels.forEach((panel) => panel.classList.add("ks-visible", "is-visible"));
    }

    const cleanups: Array<() => void> = [];

    if (!reducedMotion) {
      // 1. 3D Holographic Diorama Tilt + Spotlight Surface on Cards
      const spotlightCards = Array.from(
        document.querySelectorAll<HTMLElement>("[data-spotlight]")
      );
      for (const card of spotlightCards) {
        let rafId = 0;
        let lastX = 0;
        let lastY = 0;
        const isLargeFeature =
          card.classList.contains("ks-work-feature") ||
          card.classList.contains("ks-contact-wrap");
        const maxTilt = isLargeFeature ? 3.2 : 5.4;
        const maxParallax = isLargeFeature ? 8 : 11;

        const onMove = (event: PointerEvent) => {
          if (event.pointerType === "touch") return;
          lastX = event.clientX;
          lastY = event.clientY;
          if (!rafId) {
            rafId = window.requestAnimationFrame(() => {
              rafId = 0;
              const rect = card.getBoundingClientRect();
              if (!rect.width || !rect.height) return;
              const x = lastX - rect.left;
              const y = lastY - rect.top;
              const nx = (x / rect.width) * 2 - 1;
              const ny = (y / rect.height) * 2 - 1;

              const tiltX = (-ny * maxTilt).toFixed(2);
              const tiltY = (nx * maxTilt).toFixed(2);
              const px = (nx * maxParallax).toFixed(1);
              const py = (ny * maxParallax).toFixed(1);

              card.style.setProperty("--spot-x", `${x.toFixed(1)}px`);
              card.style.setProperty("--spot-y", `${y.toFixed(1)}px`);
              card.style.setProperty("--tilt-x", `${tiltX}deg`);
              card.style.setProperty("--tilt-y", `${tiltY}deg`);
              card.style.setProperty("--parallax-x", `${px}px`);
              card.style.setProperty("--parallax-y", `${py}px`);
            });
          }
        };

        const onLeave = () => {
          card.style.setProperty("--tilt-x", "0deg");
          card.style.setProperty("--tilt-y", "0deg");
          card.style.setProperty("--parallax-x", "0px");
          card.style.setProperty("--parallax-y", "0px");
        };

        card.addEventListener("pointermove", onMove, { passive: true });
        card.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("pointermove", onMove);
          card.removeEventListener("pointerleave", onLeave);
          if (rafId) window.cancelAnimationFrame(rafId);
        });
      }

      // 2. Magnetic Buttons
      const magneticNodes = Array.from(
        document.querySelectorAll<HTMLElement>("[data-magnetic]")
      );
      for (const node of magneticNodes) {
        const onMove = (event: PointerEvent) => {
          if (event.pointerType === "touch") return;
          const rect = node.getBoundingClientRect();
          const dx = event.clientX - (rect.left + rect.width / 2);
          const dy = event.clientY - (rect.top + rect.height / 2);
          const mx = Math.max(-7, Math.min(7, dx * 0.16));
          const my = Math.max(-5, Math.min(5, dy * 0.22));
          node.style.setProperty("--mag-x", `${mx.toFixed(2)}px`);
          node.style.setProperty("--mag-y", `${my.toFixed(2)}px`);
        };
        const onLeave = () => {
          node.style.setProperty("--mag-x", "0px");
          node.style.setProperty("--mag-y", "0px");
        };
        node.addEventListener("pointermove", onMove, { passive: true });
        node.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          node.removeEventListener("pointermove", onMove);
          node.removeEventListener("pointerleave", onLeave);
        });
      }

      // 3. Interactive 3D Geodesic Multi-Domain Network Spheres
      const geodesicCanvases = Array.from(
        document.querySelectorAll<HTMLCanvasElement>("[data-geodesic]")
      );
      if (geodesicCanvases.length > 0) {
        const phi = (1 + Math.sqrt(5)) / 2;
        const rawV: Array<[number, number, number]> = [
          [-1, phi, 0],
          [1, phi, 0],
          [-1, -phi, 0],
          [1, -phi, 0],
          [0, -1, phi],
          [0, 1, phi],
          [0, -1, -phi],
          [0, 1, -phi],
          [phi, 0, -1],
          [phi, 0, 1],
          [-phi, 0, -1],
          [-phi, 0, 1],
        ].map(([x, y, z]) => {
          const l = Math.hypot(x, y, z);
          return [x / l, y / l, z / l];
        });

        const faces: Array<[number, number, number]> = [
          [0, 11, 5],
          [0, 5, 1],
          [0, 1, 7],
          [0, 7, 10],
          [0, 10, 11],
          [1, 5, 9],
          [5, 11, 4],
          [11, 10, 2],
          [10, 7, 6],
          [7, 1, 8],
          [3, 9, 4],
          [3, 4, 2],
          [3, 2, 6],
          [3, 6, 8],
          [3, 8, 9],
          [4, 9, 5],
          [2, 4, 11],
          [6, 2, 10],
          [8, 6, 7],
          [9, 8, 1],
        ];

        const verts = rawV.slice();
        const midCache = new Map<string, number>();
        const getMidpoint = (a: number, b: number) => {
          const key = a < b ? `${a}_${b}` : `${b}_${a}`;
          const cached = midCache.get(key);
          if (cached !== undefined) return cached;
          const va = verts[a];
          const vb = verts[b];
          const mx = (va[0] + vb[0]) * 0.5;
          const my = (va[1] + vb[1]) * 0.5;
          const mz = (va[2] + vb[2]) * 0.5;
          const l = Math.hypot(mx, my, mz);
          const idx = verts.length;
          verts.push([mx / l, my / l, mz / l]);
          midCache.set(key, idx);
          return idx;
        };

        const subFaces: Array<[number, number, number]> = [];
        for (const [a, b, c] of faces) {
          const ab = getMidpoint(a, b);
          const bc = getMidpoint(b, c);
          const ca = getMidpoint(c, a);
          subFaces.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]);
        }

        const edgeSet = new Set<string>();
        const edges: Array<[number, number]> = [];
        for (const [a, b, c] of subFaces) {
          for (const [u, v] of [
            [a, b],
            [b, c],
            [c, a],
          ] as const) {
            const key = u < v ? `${u}_${v}` : `${v}_${u}`;
            if (!edgeSet.has(key)) {
              edgeSet.add(key);
              edges.push([u, v]);
            }
          }
        }

        interface GeoInst {
          canvas: HTMLCanvasElement;
          ctx: CanvasRenderingContext2D;
          mode: string | null;
          visible: boolean;
          w: number;
          h: number;
          rotX: number;
          rotY: number;
          velX: number;
          velY: number;
          pulsePhase: number;
        }

        const instances: GeoInst[] = [];

        for (const canvas of geodesicCanvases) {
          const ctx = canvas.getContext("2d");
          if (!ctx) continue;
          const mode = canvas.getAttribute("data-geodesic");
          const inst: GeoInst = {
            canvas,
            ctx,
            mode,
            visible: true,
            w: 0,
            h: 0,
            rotX: mode === "contact" ? 0.45 : -0.25,
            rotY: mode === "contact" ? 1.1 : 0.3,
            velX: 0,
            velY: 0,
            pulsePhase: Math.random() * Math.PI * 2,
          };

          const resize = () => {
            const parent = canvas.parentElement;
            if (!parent) return;
            const rect = parent.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            inst.w = Math.max(1, rect.width);
            inst.h = Math.max(1, rect.height);
            canvas.width = Math.round(inst.w * dpr);
            canvas.height = Math.round(inst.h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          };
          resize();
          window.addEventListener("resize", resize, { passive: true });
          cleanups.push(() => window.removeEventListener("resize", resize));

          const host = canvas.closest<HTMLElement>("[data-spotlight]") || canvas.parentElement;
          if (host) {
            const onHostMove = (e: PointerEvent) => {
              const rect = host.getBoundingClientRect();
              const nx = ((e.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1;
              const ny = ((e.clientY - rect.top) / Math.max(1, rect.height)) * 2 - 1;
              inst.velY = nx * 0.018;
              inst.velX = -ny * 0.014;
            };
            host.addEventListener("pointermove", onHostMove, { passive: true });
            cleanups.push(() => host.removeEventListener("pointermove", onHostMove));
          }

          instances.push(inst);
        }

        const geoObs = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              const match = instances.find((i) => i.canvas === entry.target);
              if (match) match.visible = entry.isIntersecting;
            }
          },
          { rootMargin: "120px 0px", threshold: 0.01 }
        );
        instances.forEach((i) => geoObs.observe(i.canvas));
        cleanups.push(() => geoObs.disconnect());

        let geoRaf = 0;
        const renderGeodesic = () => {
          for (const inst of instances) {
            if (!inst.visible) continue;
            const { ctx, w, h, mode } = inst;
            ctx.clearRect(0, 0, w, h);

            inst.rotY += 0.0042 + inst.velY;
            inst.rotX += 0.0018 + inst.velX;
            inst.velX *= 0.94;
            inst.velY *= 0.94;
            inst.pulsePhase += 0.035;

            const radius = Math.min(w, h) * (mode === "contact" ? 0.39 : 0.38);
            const cx = w * 0.5;
            const cy = h * 0.5;
            const fov = 520;

            const cosY = Math.cos(inst.rotY);
            const sinY = Math.sin(inst.rotY);
            const cosX = Math.cos(inst.rotX);
            const sinX = Math.sin(inst.rotX);

            const proj = verts.map(([vx, vy, vz]) => {
              const x1 = vx * cosY - vz * sinY;
              const z1 = vz * cosY + vx * sinY;
              const y2 = vy * cosX - z1 * sinX;
              const z2 = z1 * cosX + vy * sinX;

              const px = x1 * radius;
              const py = y2 * radius;
              const pz = z2 * radius;
              const scale = fov / (fov + pz + 160);
              return {
                sx: cx + px * scale,
                sy: cy + py * scale,
                z: z2,
                scale,
              };
            });

            for (let i = 0; i < edges.length; i++) {
              const [u, v] = edges[i];
              const p1 = proj[u];
              const p2 = proj[v];
              const avgZ = (p1.z + p2.z) * 0.5;
              const depthFactor = Math.max(0.08, Math.min(1, (1 - avgZ) * 0.52));
              const isHighlight = i % 7 === 0 && avgZ < 0.1;

              ctx.strokeStyle = isHighlight
                ? `rgba(120, 223, 173, ${(depthFactor * 0.52).toFixed(3)})`
                : `rgba(99, 213, 255, ${(depthFactor * 0.34).toFixed(3)})`;
              ctx.lineWidth = isHighlight ? 1.35 : 0.9;
              ctx.beginPath();
              ctx.moveTo(p1.sx, p1.sy);
              ctx.lineTo(p2.sx, p2.sy);
              ctx.stroke();
            }

            for (let i = 0; i < proj.length; i++) {
              const p = proj[i];
              const depthFactor = Math.max(0.1, Math.min(1, (1 - p.z) * 0.55));
              const isMintHub = i < 12;
              const r = (isMintHub ? 2.8 : 1.7) * p.scale;

              if (isMintHub && p.z < 0.15) {
                const pulse = 0.5 + 0.5 * Math.sin(inst.pulsePhase + i);
                ctx.fillStyle = `rgba(120, 223, 173, ${(depthFactor * 0.88).toFixed(3)})`;
                ctx.beginPath();
                ctx.arc(p.sx, p.sy, r + pulse * 1.4, 0, Math.PI * 2);
                ctx.fill();
              } else {
                ctx.fillStyle = `rgba(214, 244, 255, ${(depthFactor * 0.58).toFixed(3)})`;
                ctx.beginPath();
                ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
                ctx.fill();
              }
            }
          }
          geoRaf = window.requestAnimationFrame(renderGeodesic);
        };
        geoRaf = window.requestAnimationFrame(renderGeodesic);
        cleanups.push(() => window.cancelAnimationFrame(geoRaf));
      }
    }

    return () => {
      revealObserver?.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, [pathname]);

  return null;
}
