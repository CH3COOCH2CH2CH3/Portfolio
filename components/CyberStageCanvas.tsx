"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

let introHasPlayedInMemory = false;

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

interface SpineNode {
  x: number;
  y: number;
  z: number;
  wx: number;
  wy: number;
  wz: number;
  tx: number;
  ty: number;
  tz: number;
  nx: number;
  ny: number;
  nz: number;
  bx: number;
  by: number;
  bz: number;
}

interface WakeParticle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  life: number;
  decay: number;
  size: number;
  colorType: number;
}

interface ShockRipple {
  x: number;
  y: number;
  z: number;
  rx: number;
  maxRx: number;
  aspectY: number;
  alpha: number;
  delay: number;
  speed: number;
  born: number;
}

interface SparkDroplet {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  gravity: number;
  landY: number;
  r: number;
  alpha: number;
}

interface SurfaceGlint {
  x: number;
  y: number;
  z: number;
  width: number;
  maxWidth: number;
  alpha: number;
}

const HOME_WAYPOINTS = [
  { id: "top", code: "00 · HERO", meta: "00 // HERO STAGE" },
  { id: "about", code: "01 · ABOUT", meta: "01 // SYSTEM THINKING" },
  { id: "pillars", code: "02 · CHAIN", meta: "02 // DEFENSE CHAIN" },
  { id: "skills", code: "03 · BENTO", meta: "03 // CAPABILITIES" },
  { id: "research", code: "04 · SOICT", meta: "04 // SOICT 2026 PAPER" },
  { id: "featured", code: "05 · SOC LAB", meta: "05 // MINI SOC CAPSTONE" },
  { id: "contact", code: "06 · CONTACT", meta: "06 // DIRECT CHANNEL" },
] as const;

const CASE_WAYPOINTS = [
  { id: "publication", code: "00 · SOICT", meta: "00 // SOICT 2026 PAPER" },
  { id: "problem", code: "01 · PROBLEM", meta: "01 // PROBLEM SCOPE" },
  { id: "architecture", code: "02 · ARCH", meta: "02 // SOC ARCHITECTURE" },
  { id: "contributions", code: "03 · ROLE", meta: "03 // CONTRIBUTIONS" },
  { id: "pb-01", code: "PB1 · RECON", meta: "04 // PB-01 WEB RECON" },
  { id: "pb-02", code: "PB2 · EXPLOIT", meta: "05 // PB-02 INLINE IPS" },
  { id: "pb-03", code: "PB3 · SHELL", meta: "06 // PB-03 AUDITD AR" },
  { id: "safe-automation", code: "08 · POLICY", meta: "08 // SAFE AUTOMATION" },
  { id: "lessons", code: "11 · LESSONS", meta: "11 // CONCLUSIONS" },
] as const;

/**
 * Unified 3D Cyber-Vault Shared-Element Morph Intro + Full-Viewport 3D Aegis Sentinel Stage
 * + 3D Horizon Defense Grid + Side-Corridor Lattice Pillars + Live HUD Side-Rails.
 */
export function CyberStageCanvas() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const waypoints = isHome ? HOME_WAYPOINTS : CASE_WAYPOINTS;

  const preloaderRef = useRef<HTMLDivElement | null>(null);
  const preloadFrameRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sideAmbientRef = useRef<HTMLDivElement | null>(null);
  const railMeterFillRef = useRef<HTMLElement | null>(null);
  const railDepthPctRef = useRef<HTMLSpanElement | null>(null);
  const railSectionLabelRef = useRef<HTMLSpanElement | null>(null);
  const railCoordsRef = useRef<HTMLSpanElement | null>(null);

  const [showPreloader, setShowPreloader] = useState<boolean>(() => !introHasPlayedInMemory && isHome);
  const [activeSectionId, setActiveSectionId] = useState<string>(waypoints[0].id);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const preloader = preloaderRef.current;
    const preloadFrame = preloadFrameRef.current;
    const stage = document.querySelector<HTMLElement>(".ks-hero-stage");
    const card = stage?.querySelector<HTMLElement>("[data-hero-tilt]");
    const upper = stage?.querySelector<HTMLElement>('[data-motion-piece="top"]');
    const lower = stage?.querySelector<HTMLElement>('[data-motion-piece="bottom"]');
    const depthLayers = stage ? Array.from(stage.querySelectorAll<HTMLElement>("[data-depth]")) : [];

    let diveStartTime = 0;
    let diveStarted = false;
    let heroMorphComplete = false;
    let heroMorphFinishTime = 0;
    let morphTimer = 0;
    let diveTimer = 0;
    let dockTimer = 0;
    let removeTimer = 0;

    const triggerDiveStart = () => {
      if (diveStarted) return;
      diveStarted = true;
      diveStartTime = performance.now();
    };

    const finishIntroImmediately = () => {
      introHasPlayedInMemory = true;
      document.body.classList.remove("ks-intro-active");
      heroMorphComplete = true;
      heroMorphFinishTime = performance.now();
      triggerDiveStart();
      setShowPreloader(false);
    };

    if (!isHome || introHasPlayedInMemory || reducedMotion || !preloader) {
      finishIntroImmediately();
    } else {
      document.body.classList.add("ks-intro-active");

      const startSharedElementMorph = () => {
        if (!preloader) {
          finishIntroImmediately();
          return;
        }

        if (upper && lower) {
          upper.style.transform = "translate(0px, 0px) rotate(0deg)";
          lower.style.transform = "translate(0px, 0px) rotate(0deg)";
        }

        if (preloadFrame && card && (window.scrollY || 0) < 220) {
          const r1 = preloadFrame.getBoundingClientRect();
          const r2 = card.getBoundingClientRect();
          if (r1.width > 0 && r2.width > 0) {
            const dx = r2.left + r2.width * 0.5 - (r1.left + r1.width * 0.5);
            const dy = r2.top + r2.height * 0.5 - (r1.top + r1.height * 0.5);
            const scale = r2.width / r1.width;
            preloadFrame.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0) rotate(-16deg) scale(${scale.toFixed(4)})`;
          }
        }

        preloader.classList.add("is-morphing");
        diveTimer = window.setTimeout(triggerDiveStart, 340);

        dockTimer = window.setTimeout(() => {
          introHasPlayedInMemory = true;
          document.body.classList.remove("ks-intro-active");
          preloader.classList.add("is-docked");
          heroMorphComplete = true;
          heroMorphFinishTime = performance.now();

          removeTimer = window.setTimeout(() => {
            setShowPreloader(false);
          }, 260);
        }, 840);
      };

      morphTimer = window.setTimeout(startSharedElementMorph, 1720);
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !heroMorphComplete) {
        window.clearTimeout(morphTimer);
        window.clearTimeout(diveTimer);
        window.clearTimeout(dockTimer);
        window.clearTimeout(removeTimer);
        finishIntroImmediately();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    // Section Observer for Right/Left HUD Side-Rails
    const secObs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSectionId(id);
            const matched = waypoints.find((w) => w.id === id);
            if (matched && railSectionLabelRef.current) {
              railSectionLabelRef.current.textContent = matched.meta;
            }
          }
        }
      },
      { rootMargin: "-35% 0px -48% 0px", threshold: 0 }
    );

    waypoints.forEach((w) => {
      const el = document.getElementById(w.id);
      if (el) secObs.observe(el);
    });

    // Part 1: Hero 3D Construct & Multi-Plane Parallax
    const period = 3400;
    const smoothstep = (v: number) => {
      const x = Math.max(0, Math.min(1, v));
      return x * x * (3 - 2 * x);
    };
    const timeline = (time: number) => {
      const p = (((time % period) + period) % period) / period;
      if (p < 0.12) return 0;
      if (p < 0.38) return smoothstep((p - 0.12) / 0.26);
      if (p < 0.65) return 1;
      if (p < 0.91) return 1 - smoothstep((p - 0.65) / 0.26);
      return 0;
    };

    let heroSplit = 0;
    let heroTargetX = 0;
    let heroTargetY = 0;
    let heroCurX = 0;
    let heroCurY = 0;

    const onStagePointerMove = (event: PointerEvent) => {
      if (!stage || event.pointerType === "touch") return;
      const r = stage.getBoundingClientRect();
      if (r.bottom < -100 || r.top > window.innerHeight + 100) return;
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      heroTargetX = Math.max(-10, Math.min(10, ((event.clientX - cx) / (r.width / 2)) * 9));
      heroTargetY = Math.max(-9, Math.min(9, ((cy - event.clientY) / (r.height / 2)) * 8));
    };

    if (stage) {
      window.addEventListener("pointermove", onStagePointerMove, { passive: true });
    }

    function updateHeroConstruct(ts: number, dt: number) {
      if (!stage || !card || !upper || !lower || !heroMorphComplete) return;
      const lerpFactor = 1 - Math.exp(-dt / 105);
      const localElapsed = Math.max(0, ts - heroMorphFinishTime);
      const target = timeline(localElapsed);
      heroSplit += (target - heroSplit) * lerpFactor;
      heroCurX += (heroTargetX - heroCurX) * lerpFactor;
      heroCurY += (heroTargetY - heroCurY) * lerpFactor;

      upper.style.transform = `translate(${-28 * heroSplit}px, ${-20 * heroSplit}px) rotate(${-14 * heroSplit}deg)`;
      lower.style.transform = `translate(${28 * heroSplit}px, ${20 * heroSplit}px) rotate(${14 * heroSplit}deg)`;
      card.style.setProperty("--ks-rx", `${heroCurY.toFixed(2)}deg`);
      card.style.setProperty("--ks-ry", `${heroCurX.toFixed(2)}deg`);
      stage.style.setProperty("--ks-split", heroSplit.toFixed(3));

      for (const layer of depthLayers) {
        const depth = parseFloat(layer.dataset.depth || "0");
        const px = heroCurX * depth * 2.4;
        const py = -heroCurY * depth * 2.4;
        layer.style.setProperty("--dx", `${px.toFixed(2)}px`);
        layer.style.setProperty("--dy", `${py.toFixed(2)}px`);
      }
    }

    // Part 2: Full-Viewport 3D Cyber-Sentinel & Horizon Defense Mesh
    const canvas = canvasRef.current;
    if (!canvas) {
      return () => {
        window.removeEventListener("keydown", onKeyDown);
        window.removeEventListener("pointermove", onStagePointerMove);
        secObs.disconnect();
      };
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let vw = window.innerWidth;
    let vh = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resizeCanvas = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(vw * dpr);
      canvas.height = Math.floor(vh * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    let targetScroll = 0;
    let smoothScroll = 0;
    let scrollVelocity = 0;
    let pointerX = 0;
    let pointerY = 0;
    let smoothPtrX = 0;
    let smoothPtrY = 0;

    const readScrollRatio = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      targetScroll = Math.max(0, Math.min(1, (window.scrollY || 0) / maxScroll));
    };
    readScrollRatio();
    window.addEventListener("scroll", readScrollRatio, { passive: true });

    const onGlobalPointerMove = (e: PointerEvent) => {
      pointerX = (e.clientX / Math.max(1, vw) - 0.5) * 2;
      pointerY = (e.clientY / Math.max(1, vh) - 0.5) * 2;
    };
    window.addEventListener("pointermove", onGlobalPointerMove, { passive: true });

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

    const catmullRom3D = (p0: Vec3, p1: Vec3, p2: Vec3, p3: Vec3, t: number): Vec3 => {
      const t2 = t * t;
      const t3 = t2 * t;
      const f0 = -0.5 * t3 + t2 - 0.5 * t;
      const f1 = 1.5 * t3 - 2.5 * t2 + 1.0;
      const f2 = -1.5 * t3 + 2.0 * t2 + 0.5 * t;
      const f3 = 0.5 * t3 - 0.5 * t2;
      return {
        x: p0.x * f0 + p1.x * f1 + p2.x * f2 + p3.x * f3,
        y: p0.y * f0 + p1.y * f1 + p2.y * f2 + p3.y * f3,
        z: p0.z * f0 + p1.z * f1 + p2.z * f2 + p3.z * f3,
      };
    };

    const SPLINE_WAYPOINTS: Vec3[] = [
      { x: 0.34, y: 0.24, z: 15 },
      { x: 0.38, y: -0.06, z: -25 },
      { x: -0.38, y: 0.12, z: 20 },
      { x: 0.35, y: -0.1, z: -15 },
      { x: 0.28, y: 0.04, z: -35 },
      { x: -0.36, y: -0.05, z: 15 },
      { x: -0.34, y: 0.14, z: -10 },
      { x: 0.33, y: 0.12, z: -20 },
    ];

    const sampleScrollSpline = (u: number): Vec3 => {
      const n = SPLINE_WAYPOINTS.length - 1;
      const scaled = clamp(u, 0, 1) * n;
      const idx = Math.min(n - 1, Math.floor(scaled));
      const frac = scaled - idx;
      const p0 = SPLINE_WAYPOINTS[Math.max(0, idx - 1)];
      const p1 = SPLINE_WAYPOINTS[idx];
      const p2 = SPLINE_WAYPOINTS[Math.min(n, idx + 1)];
      const p3 = SPLINE_WAYPOINTS[Math.min(n, idx + 2)];
      const pt = catmullRom3D(p0, p1, p2, p3, frac);
      const spreadX = Math.min(vw * 0.92, 1360);
      const spreadY = vh * 0.82;
      return {
        x: pt.x * spreadX,
        y: pt.y * spreadY,
        z: pt.z,
      };
    };

    // 3D Volumetric Aegis Cyber-Sentinel Geometry (24 spine segments, delta cyber-wings & armored tail)
    const NUM_SEGMENTS = 24;
    const RING_SIDES = 8;
    const SEG_LENGTH = 8.6;

    const getSentinelProfile = (i: number) => {
      const t = i / (NUM_SEGMENTS - 1);
      if (t < 0.12) {
        const k = t / 0.12;
        const r = lerp(3.8, 15.5, Math.pow(k, 0.7));
        return { rx: r * 1.25, ry: r * 0.68 };
      }
      if (t < 0.32) {
        const k = (t - 0.12) / 0.2;
        const r = lerp(15.5, 21.0, Math.sin(k * Math.PI * 0.5));
        return { rx: r * 1.32, ry: r * 0.72 };
      }
      if (t < 0.76) {
        const k = (t - 0.32) / 0.44;
        const r = lerp(21.0, 4.0, Math.pow(k, 1.15));
        return { rx: r * 1.05, ry: r * 0.85 };
      }
      const k = (t - 0.76) / 0.24;
      return {
        rx: lerp(4.0, 1.4, k),
        ry: lerp(4.8, 22.0, Math.sin(k * Math.PI * 0.85)),
      };
    };

    const spine: SpineNode[] = [];
    const initSpineAtStart = () => {
      const scaleFactor = clamp(vw / 1440, 0.46, 0.72);
      const segDist = SEG_LENGTH * scaleFactor;
      const startX = -vw * 0.44;
      const startY = -vh * 0.18;
      const dirX = 0.94;
      const dirY = -0.34;
      spine.length = 0;
      for (let i = 0; i < NUM_SEGMENTS; i++) {
        spine.push({
          x: startX - i * segDist * dirX,
          y: startY - i * segDist * dirY,
          z: -35 + i * 1.2,
          wx: startX - i * segDist * dirX,
          wy: startY - i * segDist * dirY,
          wz: -35 + i * 1.2,
          tx: dirX,
          ty: dirY,
          tz: -0.05,
          nx: -dirY,
          ny: dirX,
          nz: 0,
          bx: 0,
          by: 0,
          bz: 1,
        });
      }
    };
    initSpineAtStart();

    const ambientOrbs = Array.from({ length: 34 }, (_, idx) => ({
      x: (Math.random() - 0.5) * 1450,
      y: (Math.random() - 0.5) * 1150,
      z: (Math.random() - 0.5) * 380,
      r: idx < 4 ? 10 + Math.random() * 11 : 1.1 + Math.random() * 1.8,
      isGlassOrb: idx < 4,
      hueType: idx % 3,
      phase: Math.random() * Math.PI * 2,
    }));

    const telemetryNodes = Array.from({ length: 18 }, (_, idx) => {
      const side = idx % 2 === 0 ? -1 : 1;
      return {
        x: side * (240 + Math.random() * 520),
        y: (Math.random() - 0.5) * 1300,
        z: -190 + (idx / 18) * 560,
        shape: idx % 3,
        phase: Math.random() * Math.PI * 2,
      };
    });

    const wakeParticles: WakeParticle[] = [];
    const shockRipples: ShockRipple[] = [];
    const sparkDroplets: SparkDroplet[] = [];
    const surfaceGlints: SurfaceGlint[] = [];
    let flightPhase = 0;
    let splashTriggered = false;
    let diveCompleted = false;

    const spawnWake = (
      x: number,
      y: number,
      z: number,
      vx: number,
      vy: number,
      vz: number,
      colorType: number
    ) => {
      if (wakeParticles.length > 60) wakeParticles.shift();
      wakeParticles.push({
        x,
        y,
        z,
        vx: vx + (Math.random() - 0.5) * 0.5,
        vy: vy + (Math.random() - 0.5) * 0.5,
        vz: vz + (Math.random() - 0.5) * 0.5,
        life: 1.0,
        decay: 0.017 + Math.random() * 0.012,
        size: 1.5 + Math.random() * 2.1,
        colorType,
      });
    };

    const spawnRipple = (
      x: number,
      y: number,
      z: number,
      startRx: number,
      maxRx: number,
      alpha: number,
      delay: number,
      speed = 0.036
    ) => {
      shockRipples.push({
        x,
        y,
        z,
        rx: startRx,
        maxRx,
        aspectY: 0.36,
        alpha,
        delay,
        speed,
        born: performance.now(),
      });
    };

    const triggerBarrierBreachSplash = (x: number, y: number, z: number) => {
      for (let k = 0; k < 4; k++) {
        spawnRipple(x, y, z, 8 + k * 5, 94 + k * 34, 0.8 - k * 0.13, k * 130, 0.033);
      }
      surfaceGlints.push({ x, y, z, width: 26, maxWidth: 215, alpha: 0.76 });

      for (let d = 0; d < 14; d++) {
        const spread = (d / 13 - 0.5) * 2;
        const vx = spread * (1.8 + Math.random() * 1.6) + (Math.random() - 0.5) * 0.5;
        const vy = -(3.4 + Math.random() * 2.4);
        const gravity = 0.082 + Math.random() * 0.018;
        const landOffsetY = (Math.random() - 0.5) * 32;
        const landOffsetZ = (Math.random() - 0.5) * 24;

        sparkDroplets.push({
          x: x + spread * 10,
          y: y - 2,
          z: z + landOffsetZ,
          vx,
          vy,
          gravity,
          landY: y + landOffsetY,
          r: 2.0 + Math.random() * 1.5,
          alpha: 0.95,
        });
      }
    };

    const FOV = 760;
    const CAM_Z = 520;
    const project3D = (x: number, y: number, z: number) => {
      const dz = CAM_Z - z;
      if (dz <= 40) return null;
      const scale = FOV / dz;
      return {
        sx: vw * 0.5 + x * scale,
        sy: vh * 0.5 + y * scale,
        scale,
        depth: dz,
      };
    };

    const sampleEntranceDive = (u: number): Vec3 => {
      const endPt = sampleScrollSpline(0);
      const divePoints: Vec3[] = [
        { x: -vw * 0.54, y: -vh * 0.12, z: -20 },
        { x: -vw * 0.42, y: -vh * 0.18, z: -35 },
        { x: -vw * 0.27, y: -vh * 0.3, z: -95 },
        { x: -vw * 0.13, y: -vh * 0.1, z: 35 },
        { x: -vw * 0.02, y: -vh * 0.24, z: -80 },
        { x: vw * 0.04, y: vh * 0.05, z: -10 },
        { x: vw * 0.19, y: vh * 0.28, z: 25 },
        endPt,
        { x: endPt.x + 55, y: endPt.y - 20, z: endPt.z },
      ];

      const easedU = 0.22 * u + 0.78 * (u * u * (3 - 2 * u));
      const numSegs = 6;
      const s = clamp(easedU, 0, 1) * numSegs;
      const idx = Math.min(numSegs - 1, Math.floor(s));
      const frac = s - idx;

      return catmullRom3D(
        divePoints[idx],
        divePoints[idx + 1],
        divePoints[idx + 2],
        divePoints[idx + 3],
        frac
      );
    };

    const updateSentinelKinematics = (ts: number, dt: number) => {
      const timeSec = ts * 0.001;
      const scrollDelta = targetScroll - smoothScroll;
      smoothScroll += scrollDelta * (1 - Math.exp(-dt / 95));
      scrollVelocity = scrollDelta * 60;

      smoothPtrX += (pointerX - smoothPtrX) * 0.05;
      smoothPtrY += (pointerY - smoothPtrY) * 0.05;

      if (!diveStarted) return;

      const diveElapsed = ts - diveStartTime;
      const diveDuration = 4200;
      const diveU = clamp(diveElapsed / diveDuration, 0, 1);

      const speedBoost = (diveU < 1 ? 1.25 : 1) + Math.min(2.6, Math.abs(scrollVelocity) * 6.0);
      flightPhase += dt * 0.0052 * speedBoost;

      let headTargetX: number;
      let headTargetY: number;
      let headTargetZ: number;

      if (diveU < 1 && smoothScroll < 0.06) {
        const divePt = sampleEntranceDive(diveU);
        headTargetX = divePt.x;
        headTargetY = divePt.y;
        headTargetZ = divePt.z;

        if (!splashTriggered && diveU >= 0.66) {
          splashTriggered = true;
          triggerBarrierBreachSplash(divePt.x, divePt.y, divePt.z);
        }
      } else {
        if (!diveCompleted) {
          diveCompleted = true;
          if (!splashTriggered) {
            splashTriggered = true;
            triggerBarrierBreachSplash(vw * 0.04, vh * 0.05, -10);
          }
        }
        const basePos = sampleScrollSpline(smoothScroll);
        const orbitRadiusX = clamp(vw * 0.042, 32, 64);
        const orbitRadiusY = clamp(vh * 0.038, 24, 48);
        const orbitBlend = clamp((diveElapsed - diveDuration) / 900, 0, 1);
        const idleX = (Math.cos(timeSec * 1.1) * orbitRadiusX + smoothPtrX * 28) * orbitBlend;
        const idleY = (Math.sin(timeSec * 2.2) * (orbitRadiusY * 0.55) + smoothPtrY * 22) * orbitBlend;
        const idleZ = Math.sin(timeSec * 1.1) * 38 * orbitBlend;

        headTargetX = basePos.x + idleX;
        headTargetY = basePos.y + idleY;
        headTargetZ = basePos.z + idleZ;
      }

      const head = spine[0];
      const steerLerp = 1 - Math.exp(-dt / 85);
      const prevHeadX = head.x;
      const prevHeadY = head.y;
      const prevHeadZ = head.z;

      head.x = lerp(head.x, headTargetX, steerLerp);
      head.y = lerp(head.y, headTargetY, steerLerp);
      head.z = lerp(head.z, headTargetZ, steerLerp);

      let vx = head.x - prevHeadX;
      let vy = head.y - prevHeadY;
      let vz = head.z - prevHeadZ;
      let vLen = Math.hypot(vx, vy, vz);
      if (vLen < 0.001) {
        vx = -Math.sin(timeSec * 1.1);
        vy = Math.cos(timeSec * 2.2) * 0.5;
        vz = Math.cos(timeSec * 1.1) * 0.4;
        vLen = Math.hypot(vx, vy, vz) || 1;
      }
      head.tx = vx / vLen;
      head.ty = vy / vLen;
      head.tz = vz / vLen;

      const scaleFactor = clamp(vw / 1440, 0.46, 0.72);
      const segDist = SEG_LENGTH * scaleFactor;

      for (let i = 1; i < NUM_SEGMENTS; i++) {
        const prev = spine[i - 1];
        const cur = spine[i];
        const dx = cur.x - prev.x;
        const dy = cur.y - prev.y;
        const dz = cur.z - prev.z;
        const dist = Math.hypot(dx, dy, dz) || 1;
        cur.x = prev.x + (dx / dist) * segDist;
        cur.y = prev.y + (dy / dist) * segDist;
        cur.z = prev.z + (dz / dist) * segDist;
        cur.tx = -dx / dist;
        cur.ty = -dy / dist;
        cur.tz = -dz / dist;
      }

      for (let i = 0; i < NUM_SEGMENTS; i++) {
        const s = spine[i];
        const bankAngle = clamp(-s.tx * 0.4, -0.5, 0.5);
        const upX = Math.sin(bankAngle);
        const upY = -Math.cos(bankAngle);
        const upZ = 0;

        let bx = s.ty * upZ - s.tz * upY;
        let by = s.tz * upX - s.tx * upZ;
        let bz = s.tx * upY - s.ty * upX;
        const bLen = Math.hypot(bx, by, bz) || 1;
        bx /= bLen;
        by /= bLen;
        bz /= bLen;

        const nx = by * s.tz - bz * s.ty;
        const ny = bz * s.tx - bx * s.tz;
        const nz = bx * s.ty - by * s.tx;

        s.nx = nx;
        s.ny = ny;
        s.nz = nz;
        s.bx = bx;
        s.by = by;
        s.bz = bz;

        const tNorm = i / (NUM_SEGMENTS - 1);
        const waveAmp = (2.0 + Math.pow(tNorm, 1.35) * 15.5) * scaleFactor;
        const wavePhase = flightPhase - i * 0.36;
        const latDisp = Math.sin(wavePhase) * waveAmp;
        const vertDisp = Math.cos(wavePhase * 0.5) * (waveAmp * 0.28);

        s.wx = s.x + bx * latDisp + nx * vertDisp;
        s.wy = s.y + by * latDisp + ny * vertDisp;
        s.wz = s.z + bz * latDisp + nz * vertDisp;
      }

      const tail = spine[NUM_SEGMENTS - 1];
      if (Math.random() < 0.62) {
        spawnWake(
          tail.wx,
          tail.wy,
          tail.wz,
          -tail.tx * 1.0,
          -tail.ty * 1.0,
          -tail.tz * 1.0,
          smoothScroll > 0.35 && smoothScroll < 0.75 ? 1 : 0
        );
      }
    };

    const renderScene = (ts: number) => {
      ctx.clearRect(0, 0, vw, vh);
      if (!diveStarted) return;

      const timeSec = ts * 0.001;
      const scaleFactor = clamp(vw / 1440, 0.46, 0.72);
      const holoWeight = smoothstep(1 - Math.abs(smoothScroll - 0.52) / 0.24);
      const bioWeight = smoothstep((smoothScroll - 0.68) / 0.22);

      // 0. 3D Cyber-Horizon Defense Grid
      const gridCols = 13;
      const gridRows = 7;
      const gridSpanX = vw * 0.68;
      const gridYBase = vh * 0.27;
      const headRef = spine[0];
      const gridPts: Array<
        Array<{
          proj: ReturnType<typeof project3D>;
          inf: number;
          depthFade: number;
        }>
      > = [];

      for (let r = 0; r < gridRows; r++) {
        const rowArr = [];
        const zVal = -110 + (r / (gridRows - 1)) * 540;
        const depthFade = 1 - (r / (gridRows - 1)) * 0.72;
        for (let c = 0; c < gridCols; c++) {
          const uCol = c / (gridCols - 1) - 0.5;
          const xVal = uCol * gridSpanX * 2;
          let waveY = Math.sin(timeSec * 1.35 + c * 0.55 + r * 0.45) * 6.5;

          const dxS = xVal - headRef.wx;
          const dyS = gridYBase - headRef.wy;
          const dzS = zVal - headRef.wz;
          const distS = Math.hypot(dxS, dyS * 0.65, dzS);
          const inf = Math.max(0, 1 - distS / 290);
          if (inf > 0) {
            waveY += Math.sin(distS * 0.055 - timeSec * 5.0) * 16 * inf * inf;
          }

          rowArr.push({
            proj: project3D(xVal, gridYBase + waveY, zVal),
            inf,
            depthFade,
          });
        }
        gridPts.push(rowArr);
      }

      ctx.lineWidth = 0.85;
      for (let r = 0; r < gridRows; r++) {
        for (let c = 0; c < gridCols; c++) {
          const cur = gridPts[r][c];
          if (!cur.proj) continue;
          if (c + 1 < gridCols && gridPts[r][c + 1].proj) {
            const nxt = gridPts[r][c + 1];
            const inf = Math.max(cur.inf, nxt.inf);
            const alpha = (0.032 + inf * 0.16) * cur.depthFade;
            ctx.strokeStyle =
              inf > 0.25
                ? `rgba(120, 223, 173, ${alpha.toFixed(3)})`
                : `rgba(99, 213, 255, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(cur.proj.sx, cur.proj.sy);
            ctx.lineTo(nxt.proj!.sx, nxt.proj!.sy);
            ctx.stroke();
          }
          if (r + 1 < gridRows && gridPts[r + 1][c].proj) {
            const deep = gridPts[r + 1][c];
            const inf = Math.max(cur.inf, deep.inf);
            const alpha = (0.028 + inf * 0.14) * cur.depthFade;
            ctx.strokeStyle =
              inf > 0.25
                ? `rgba(120, 223, 173, ${alpha.toFixed(3)})`
                : `rgba(99, 213, 255, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(cur.proj.sx, cur.proj.sy);
            ctx.lineTo(deep.proj!.sx, deep.proj!.sy);
            ctx.stroke();
          }
          if (cur.inf > 0.18) {
            ctx.fillStyle = `rgba(120, 223, 173, ${(cur.inf * 0.45 * cur.depthFade).toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(cur.proj.sx, cur.proj.sy, 1.8 * cur.proj.scale, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // 0B. Synchronize HUD Side-Rails & Ambient Side-Beams
      const pctNum = Math.round(smoothScroll * 100);
      if (railMeterFillRef.current) {
        railMeterFillRef.current.style.setProperty("--rail-progress", `${Math.max(18, pctNum)}%`);
      }
      if (railDepthPctRef.current) {
        railDepthPctRef.current.textContent = `${String(pctNum).padStart(3, "0")}%`;
      }
      if (railCoordsRef.current && headRef) {
        const zInt = Math.round(headRef.wz);
        const sign = zInt >= 0 ? "+" : "-";
        railCoordsRef.current.textContent = `Z · ${sign}${String(Math.abs(zInt)).padStart(3, "0")}m`;
      }
      if (sideAmbientRef.current) {
        sideAmbientRef.current.style.setProperty("--beam-left-y", `${(22 + smoothScroll * 62).toFixed(1)}%`);
        sideAmbientRef.current.style.setProperty("--beam-right-y", `${(78 - smoothScroll * 58).toFixed(1)}%`);
      }

      // 0C. 3D Perspective Side-Corridor Lattice Pillars
      if (vw >= 1100) {
        const bayCount = 8;
        const baySpanY = 1280;
        const bayStepY = baySpanY / (bayCount - 1);
        const corridorScroll = (smoothScroll * 950) % bayStepY;
        const zFront = -55;
        const zBack = 195;

        for (const side of [-1, 1]) {
          const baseX = side * (vw * 0.445);
          const frontNodes = [];
          const backNodes = [];

          for (let b = 0; b < bayCount; b++) {
            const rawY = -baySpanY * 0.5 + b * bayStepY - corridorScroll;
            const dxS = baseX - headRef.wx;
            const dyS = rawY - headRef.wy;
            const distFlank = Math.hypot(dxS * 0.65, dyS);
            const flankInf = Math.max(0, 1 - distFlank / 330);

            const flexX = baseX - side * (flankInf * 18 + Math.sin(timeSec * 1.4 + b * 0.7) * 4);
            frontNodes.push({ p: project3D(flexX, rawY, zFront), inf: flankInf });
            backNodes.push({ p: project3D(flexX * 1.06, rawY, zBack), inf: flankInf });
          }

          for (let b = 0; b < bayCount; b++) {
            const fn = frontNodes[b];
            const bn = backNodes[b];
            if (!fn.p || !bn.p) continue;

            const baseAlpha = 0.055 + fn.inf * 0.24;
            ctx.strokeStyle =
              fn.inf > 0.22
                ? `rgba(120, 223, 173, ${baseAlpha.toFixed(3)})`
                : `rgba(99, 213, 255, ${baseAlpha.toFixed(3)})`;
            ctx.lineWidth = (0.95 + fn.inf * 0.6) * fn.p.scale;
            ctx.beginPath();
            ctx.moveTo(fn.p.sx, fn.p.sy);
            ctx.lineTo(bn.p.sx, bn.p.sy);
            ctx.stroke();

            if (b + 1 < bayCount) {
              const fnNext = frontNodes[b + 1];
              const bnNext = backNodes[b + 1];
              if (fnNext.p && bnNext.p) {
                const segInf = Math.max(fn.inf, fnNext.inf);
                const vAlpha = 0.048 + segInf * 0.2;
                ctx.strokeStyle =
                  segInf > 0.22
                    ? `rgba(120, 223, 173, ${vAlpha.toFixed(3)})`
                    : `rgba(99, 213, 255, ${vAlpha.toFixed(3)})`;
                ctx.lineWidth = 0.9 * fn.p.scale;
                ctx.beginPath();
                ctx.moveTo(fn.p.sx, fn.p.sy);
                ctx.lineTo(fnNext.p.sx, fnNext.p.sy);
                ctx.moveTo(bn.p.sx, bn.p.sy);
                ctx.lineTo(bnNext.p.sx, bnNext.p.sy);
                ctx.stroke();

                if (b % 2 === 0) {
                  ctx.strokeStyle = `rgba(120, 223, 173, ${(0.032 + segInf * 0.16).toFixed(3)})`;
                  ctx.beginPath();
                  ctx.moveTo(fn.p.sx, fn.p.sy);
                  ctx.lineTo(bnNext.p.sx, bnNext.p.sy);
                  ctx.stroke();
                }
              }
            }

            ctx.fillStyle =
              fn.inf > 0.2
                ? `rgba(120, 223, 173, ${(0.28 + fn.inf * 0.55).toFixed(3)})`
                : "rgba(186, 230, 255, 0.22)";
            ctx.beginPath();
            ctx.arc(fn.p.sx, fn.p.sy, (1.6 + fn.inf * 1.4) * fn.p.scale, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // 0D. Quantized Bit-Matrix Micro-LEDs in Outer Gutters
      if (vw >= 1220) {
        const gutterWidth = Math.max(76, (vw - 1360) * 0.5 - 8);
        const rows = 26;
        const stepY = vh / rows;
        const bitTick = Math.floor(timeSec * 7.5);

        for (const side of [-1, 1]) {
          const colBaseX = side === -1 ? 68 : vw - 68;
          const dir = side === -1 ? 1 : -1;

          for (let r = 0; r < rows; r++) {
            const sy = (((r * stepY - ((smoothScroll * 420) % stepY)) % vh) + vh) % vh;
            const edgeMask = Math.sin((sy / vh) * Math.PI);
            if (edgeMask < 0.12) continue;

            const seed = r * 37 + (side === -1 ? 13 : 29);
            const wave = Math.sin(timeSec * 3.4 + seed * 0.7) * Math.cos(timeSec * 1.9 - r * 0.35);
            const bitOn = (seed + bitTick) % 5 === 0 || wave > 0.42;
            if (!bitOn) continue;

            const isMint = (seed + Math.floor(bitTick * 0.5)) % 3 === 0;
            const alpha = clamp((0.1 + Math.abs(wave) * 0.24) * edgeMask, 0.05, 0.34);

            ctx.fillStyle = isMint
              ? `rgba(120, 223, 173, ${alpha.toFixed(3)})`
              : `rgba(99, 213, 255, ${alpha.toFixed(3)})`;

            const x1 = colBaseX + dir * 4;
            ctx.fillRect(x1, sy, 3.5, 3.5);

            if (gutterWidth > 95 && seed % 2 === 0) {
              const x2 = colBaseX + dir * 14;
              const barW = seed % 4 === 0 ? 9 : 3.5;
              ctx.fillStyle = isMint
                ? `rgba(99, 213, 255, ${(alpha * 0.78).toFixed(3)})`
                : `rgba(120, 223, 173, ${(alpha * 0.78).toFixed(3)})`;
              ctx.fillRect(side === -1 ? x2 : x2 - barW, sy, barW, 3.5);
            }
          }
        }
      }

      // 1. Depth-of-Field Telemetry Crosshairs & Ambient Orbs
      const scrollOffsetY = (smoothScroll - 0.5) * 620;
      for (const node of telemetryNodes) {
        const parallaxMult = clamp((550 - node.z) / 450, 0.35, 1.65);
        const ny = (((node.y - scrollOffsetY * parallaxMult + 650) % 1300) + 1300) % 1300 - 650;
        const nx = node.x + Math.sin(timeSec * 0.45 + node.phase) * 10;
        const nz = node.z + Math.cos(timeSec * 0.4 + node.phase) * 12;
        const p = project3D(nx, ny, nz);
        if (!p) continue;

        const dofAlpha = clamp((580 - p.depth) / 620, 0.06, 0.24);
        const sz = Math.max(2.5, 4.8 * p.scale);
        ctx.strokeStyle =
          node.shape === 1
            ? `rgba(120, 223, 173, ${dofAlpha.toFixed(3)})`
            : `rgba(99, 213, 255, ${dofAlpha.toFixed(3)})`;
        ctx.lineWidth = Math.max(0.8, 1.15 * p.scale);

        if (node.shape === 0) {
          ctx.beginPath();
          ctx.moveTo(p.sx - sz, p.sy);
          ctx.lineTo(p.sx + sz, p.sy);
          ctx.moveTo(p.sx, p.sy - sz);
          ctx.lineTo(p.sx, p.sy + sz);
          ctx.stroke();
        } else if (node.shape === 1) {
          ctx.beginPath();
          ctx.moveTo(p.sx, p.sy - sz);
          ctx.lineTo(p.sx + sz, p.sy);
          ctx.lineTo(p.sx, p.sy + sz);
          ctx.lineTo(p.sx - sz, p.sy);
          ctx.closePath();
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, sz * 0.85, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      for (const orb of ambientOrbs) {
        const oy = (((orb.y - scrollOffsetY + 575) % 1150) + 1150) % 1150 - 575;
        const ox = orb.x + Math.sin(timeSec * 0.65 + orb.phase) * 14;
        const oz = orb.z + Math.cos(timeSec * 0.55 + orb.phase) * 14;
        const p = project3D(ox, oy, oz);
        if (!p) continue;

        if (orb.isGlassOrb) {
          const orbVis = clamp(1 - smoothScroll * 2.5, 0.14, 0.65);
          const rad = orb.r * p.scale;
          if (rad < 2) continue;
          const grad = ctx.createRadialGradient(
            p.sx - rad * 0.3,
            p.sy - rad * 0.3,
            rad * 0.08,
            p.sx,
            p.sy,
            rad
          );
          grad.addColorStop(0, `rgba(255, 255, 255, ${0.42 * orbVis})`);
          grad.addColorStop(0.4, `rgba(99, 213, 255, ${0.22 * orbVis})`);
          grad.addColorStop(0.8, `rgba(120, 223, 173, ${0.12 * orbVis})`);
          grad.addColorStop(1, "rgba(99, 213, 255, 0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, rad, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const rad = Math.max(0.7, orb.r * p.scale);
          const alpha = clamp((620 - p.depth) / 580, 0.08, 0.42);
          ctx.fillStyle =
            orb.hueType === 0
              ? `rgba(99, 213, 255, ${alpha})`
              : orb.hueType === 1
                ? `rgba(120, 223, 173, ${alpha})`
                : `rgba(225, 242, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, rad, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 2. Render Firewall Breach Glints, Shockwave Ripples & Ballistic Data Sparks
      for (let i = surfaceGlints.length - 1; i >= 0; i--) {
        const gl = surfaceGlints[i];
        gl.width += (gl.maxWidth - gl.width) * 0.06;
        gl.alpha *= 0.945;
        if (gl.alpha < 0.015) {
          surfaceGlints.splice(i, 1);
          continue;
        }
        const p = project3D(gl.x, gl.y, gl.z);
        if (!p) continue;
        const hw = gl.width * p.scale;
        const grad = ctx.createLinearGradient(p.sx - hw, p.sy, p.sx + hw, p.sy);
        grad.addColorStop(0, "rgba(120, 223, 173, 0)");
        grad.addColorStop(0.3, `rgba(99, 213, 255, ${gl.alpha * 0.65})`);
        grad.addColorStop(0.5, `rgba(255, 255, 255, ${gl.alpha})`);
        grad.addColorStop(0.7, `rgba(120, 223, 173, ${gl.alpha * 0.75})`);
        grad.addColorStop(1, "rgba(120, 223, 173, 0)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.2 * p.scale;
        ctx.beginPath();
        ctx.moveTo(p.sx - hw, p.sy);
        ctx.lineTo(p.sx + hw, p.sy);
        ctx.stroke();
      }

      for (let i = shockRipples.length - 1; i >= 0; i--) {
        const rp = shockRipples[i];
        if (ts - rp.born < rp.delay) continue;
        rp.rx += (rp.maxRx - rp.rx) * rp.speed;
        rp.alpha *= 0.972;
        if (rp.alpha < 0.012) {
          shockRipples.splice(i, 1);
          continue;
        }
        const p = project3D(rp.x, rp.y, rp.z);
        if (!p) continue;
        const rx = rp.rx * p.scale;
        const ry = rx * rp.aspectY;

        ctx.save();
        const fillGrad = ctx.createRadialGradient(p.sx, p.sy, rx * 0.2, p.sx, p.sy, rx);
        fillGrad.addColorStop(0, "rgba(120, 223, 173, 0)");
        fillGrad.addColorStop(0.75, `rgba(99, 213, 255, ${rp.alpha * 0.12})`);
        fillGrad.addColorStop(1, "rgba(99, 213, 255, 0)");
        ctx.fillStyle = fillGrad;
        ctx.beginPath();
        ctx.ellipse(p.sx, p.sy, rx, ry, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `rgba(225, 245, 255, ${rp.alpha})`;
        ctx.lineWidth = 1.65 * p.scale;
        ctx.beginPath();
        ctx.ellipse(p.sx, p.sy, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = `rgba(120, 223, 173, ${rp.alpha * 0.72})`;
        ctx.lineWidth = 1.0 * p.scale;
        ctx.beginPath();
        ctx.ellipse(p.sx, p.sy, rx * 0.78, ry * 0.78, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      for (let i = sparkDroplets.length - 1; i >= 0; i--) {
        const dp = sparkDroplets[i];
        dp.x += dp.vx;
        dp.y += dp.vy;
        dp.vy += dp.gravity;

        if (dp.vy > 0 && dp.y >= dp.landY) {
          spawnRipple(dp.x, dp.landY, dp.z, 2.5, 24 + Math.random() * 16, 0.62, 0, 0.048);
          sparkDroplets.splice(i, 1);
          continue;
        }

        const p = project3D(dp.x, dp.y, dp.z);
        if (!p) continue;
        const rad = Math.max(1.2, dp.r * p.scale);
        const angle = Math.atan2(dp.vy, dp.vx);
        const speed = Math.hypot(dp.vx, dp.vy);
        const tailLen = Math.min(14, speed * 2.6) * p.scale;

        ctx.save();
        ctx.translate(p.sx, p.sy);
        ctx.rotate(angle);

        const dropGrad = ctx.createLinearGradient(-tailLen, 0, rad, 0);
        dropGrad.addColorStop(0, "rgba(120, 223, 173, 0)");
        dropGrad.addColorStop(0.6, `rgba(99, 213, 255, ${dp.alpha * 0.65})`);
        dropGrad.addColorStop(1, `rgba(255, 255, 255, ${dp.alpha})`);

        ctx.fillStyle = dropGrad;
        ctx.beginPath();
        ctx.moveTo(-tailLen, 0);
        ctx.lineTo(0, -rad * 0.75);
        ctx.arc(0, 0, rad * 0.75, -Math.PI * 0.5, Math.PI * 0.5);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = `rgba(255, 255, 255, ${dp.alpha})`;
        ctx.beginPath();
        ctx.arc(0, 0, rad * 0.55, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 3. Plasma Wake Trail
      for (let i = wakeParticles.length - 1; i >= 0; i--) {
        const wp = wakeParticles[i];
        wp.x += wp.vx;
        wp.y += wp.vy;
        wp.z += wp.vz;
        wp.life -= wp.decay;
        if (wp.life <= 0) {
          wakeParticles.splice(i, 1);
          continue;
        }
        const proj = project3D(wp.x, wp.y, wp.z);
        if (!proj) continue;
        const r = Math.max(0.6, wp.size * wp.life * proj.scale);
        const a = wp.life * 0.52;
        ctx.fillStyle =
          wp.colorType === 1 ? `rgba(120, 223, 173, ${a})` : `rgba(99, 213, 255, ${a})`;
        ctx.beginPath();
        ctx.arc(proj.sx, proj.sy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Construct 3D Volumetric Aegis Cyber-Sentinel (Body Facets + Swept Delta Wings + Dorsal Array)
      const rings: Array<
        Array<{ wx: number; wy: number; wz: number; snx: number; sny: number; snz: number }>
      > = [];
      for (let i = 0; i < NUM_SEGMENTS; i++) {
        const s = spine[i];
        const prof = getSentinelProfile(i);
        const rx = prof.rx * scaleFactor;
        const ry = prof.ry * scaleFactor;
        const pts = [];

        for (let j = 0; j < RING_SIDES; j++) {
          const theta = (j / RING_SIDES) * Math.PI * 2;
          const cosT = Math.cos(theta);
          const sinT = Math.sin(theta);

          const localB = cosT * rx;
          const localN = sinT * ry;

          const wx = s.wx + s.bx * localB + s.nx * localN;
          const wy = s.wy + s.by * localB + s.ny * localN;
          const wz = s.wz + s.bz * localB + s.nz * localN;

          const snx = s.bx * cosT + s.nx * sinT;
          const sny = s.by * cosT + s.ny * sinT;
          const snz = s.bz * cosT + s.nz * sinT;

          pts.push({ wx, wy, wz, snx, sny, snz });
        }
        rings.push(pts);
      }

      const midSpine = spine[5];
      const midProj = project3D(midSpine.wx, midSpine.wy, midSpine.wz);
      if (midProj) {
        const auraR = 96 * scaleFactor * midProj.scale;
        const auraGrad = ctx.createRadialGradient(
          midProj.sx,
          midProj.sy,
          auraR * 0.05,
          midProj.sx,
          midProj.sy,
          auraR
        );
        auraGrad.addColorStop(
          0,
          holoWeight > 0.4 ? "rgba(120, 223, 173, 0.16)" : "rgba(99, 213, 255, 0.18)"
        );
        auraGrad.addColorStop(0.55, "rgba(56, 189, 248, 0.06)");
        auraGrad.addColorStop(1, "rgba(10, 13, 18, 0)");
        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(midProj.sx, midProj.sy, auraR, 0, Math.PI * 2);
        ctx.fill();
      }

      const polygons: Array<{
        projVerts: Array<{ sx: number; sy: number }>;
        avgZ: number;
        fillStyle: string;
        strokeStyle: string;
        lineWidth: number;
      }> = [];

      const pushPoly = (
        verts3D: Array<{ wx: number; wy: number; wz: number }>,
        fillStyle: string,
        strokeStyle: string,
        lineWidth: number
      ) => {
        const projVerts = [];
        let avgZ = 0;
        for (const v of verts3D) {
          const p = project3D(v.wx, v.wy, v.wz);
          if (!p) return;
          projVerts.push(p);
          avgZ += p.depth;
        }
        avgZ /= verts3D.length;
        polygons.push({ projVerts, avgZ, fillStyle, strokeStyle, lineWidth });
      };

      // Swept 3D Cyber-Delta Wings
      for (const side of [-1, 1]) {
        const finCols = 5;
        const finRows = 5;
        const finGrid: Array<Array<{ wx: number; wy: number; wz: number }>> = [];

        for (let r = 0; r < finRows; r++) {
          const segIdx = 3 + r;
          const s = spine[segIdx];
          const prof = getSentinelProfile(segIdx);
          const rowPts = [];
          for (let c = 0; c < finCols; c++) {
            const u = c / (finCols - 1);
            const span =
              (8 + u * 58 * Math.sin((1 - r / finRows) * Math.PI * 0.78 + 0.35)) * scaleFactor;
            const flap =
              Math.sin(flightPhase * 1.15 - r * 0.42 - u * 1.85 + (side > 0 ? 0 : 0.35)) *
              (11 * u * scaleFactor);
            const sweepBack = -u * 28 * scaleFactor;

            const wx =
              s.wx +
              s.bx * side * (prof.rx * scaleFactor * 0.8 + span) +
              s.nx * flap +
              s.tx * sweepBack;
            const wy =
              s.wy +
              s.by * side * (prof.rx * scaleFactor * 0.8 + span) +
              s.ny * flap +
              s.ty * sweepBack;
            const wz =
              s.wz +
              s.bz * side * (prof.rx * scaleFactor * 0.8 + span) +
              s.nz * flap +
              s.tz * sweepBack;
            rowPts.push({ wx, wy, wz });
          }
          finGrid.push(rowPts);
        }

        for (let r = 0; r < finRows - 1; r++) {
          for (let c = 0; c < finCols - 1; c++) {
            const u = c / (finCols - 1);
            const alpha = lerp(0.48, 0.12, u);
            const fill =
              holoWeight > 0.45
                ? `rgba(120, 223, 173, ${alpha * 0.52})`
                : `rgba(99, 213, 255, ${alpha * 0.75})`;
            const stroke =
              u > 0.4
                ? `rgba(120, 223, 173, ${0.46 - u * 0.22})`
                : "rgba(210, 244, 255, 0.52)";
            pushPoly(
              [finGrid[r][c], finGrid[r][c + 1], finGrid[r + 1][c + 1], finGrid[r + 1][c]],
              fill,
              stroke,
              0.8
            );
          }
        }
      }

      // Dorsal Telemetry Fin Crest
      for (let i = 4; i < 15; i++) {
        const s0 = spine[i];
        const s1 = spine[i + 1];
        const p0 = getSentinelProfile(i);
        const p1 = getSentinelProfile(i + 1);
        const k0 = (i - 4) / 11;
        const k1 = (i - 3) / 11;
        const h0 = Math.sin(k0 * Math.PI) * 24 * scaleFactor;
        const h1 = Math.sin(k1 * Math.PI) * 24 * scaleFactor;
        const sway0 = Math.cos(flightPhase * 1.2 - i * 0.45) * 6.0 * scaleFactor;
        const sway1 = Math.cos(flightPhase * 1.2 - (i + 1) * 0.45) * 6.0 * scaleFactor;

        const b0 = {
          wx: s0.wx + s0.nx * p0.ry * scaleFactor,
          wy: s0.wy + s0.ny * p0.ry * scaleFactor,
          wz: s0.wz + s0.nz * p0.ry * scaleFactor,
        };
        const t0 = {
          wx: b0.wx + s0.nx * h0 + s0.bx * sway0 - s0.tx * 9 * scaleFactor,
          wy: b0.wy + s0.ny * h0 + s0.by * sway0 - s0.ty * 9 * scaleFactor,
          wz: b0.wz + s0.nz * h0 + s0.bz * sway0 - s0.tz * 9 * scaleFactor,
        };
        const b1 = {
          wx: s1.wx + s1.nx * p1.ry * scaleFactor,
          wy: s1.wy + s1.ny * p1.ry * scaleFactor,
          wz: s1.wz + s1.nz * p1.ry * scaleFactor,
        };
        const t1 = {
          wx: b1.wx + s1.nx * h1 + s1.bx * sway1 - s1.tx * 9 * scaleFactor,
          wy: b1.wy + s1.ny * h1 + s1.by * sway1 - s1.ty * 9 * scaleFactor,
          wz: b1.wz + s1.nz * h1 + s1.bz * sway1 - s1.tz * 9 * scaleFactor,
        };

        pushPoly(
          [b0, t0, t1, b1],
          holoWeight > 0.4 ? "rgba(120, 223, 173, 0.28)" : "rgba(56, 189, 248, 0.32)",
          "rgba(210, 244, 255, 0.5)",
          0.8
        );
      }

      // 3D Armored Body Facets
      const lx = 0.38;
      const ly = -0.62;
      const lz = 0.68;

      for (let i = 0; i < NUM_SEGMENTS - 1; i++) {
        const r0 = rings[i];
        const r1 = rings[i + 1];

        for (let j = 0; j < RING_SIDES; j++) {
          const jNext = (j + 1) % RING_SIDES;
          const v00 = r0[j];
          const v01 = r0[jNext];
          const v11 = r1[jNext];
          const v10 = r1[j];

          const nx = (v00.snx + v01.snx + v11.snx + v10.snx) * 0.25;
          const ny = (v00.sny + v01.sny + v11.sny + v10.sny) * 0.25;
          const nz = (v00.snz + v01.snz + v11.snz + v10.snz) * 0.25;

          const ndotl = Math.max(0, nx * lx + ny * ly + nz * lz);
          const rim = Math.pow(1 - Math.abs(nz), 1.6);

          const isDorsal = j >= 1 && j <= 3;
          const isCorePlate =
            isDorsal && ((i >= 1 && i <= 4) || (i >= 7 && i <= 10) || (i >= 13 && i <= 15));
          const isTail = i >= 18;

          let fillStyle: string;
          let strokeStyle: string;

          if (holoWeight > 0.48) {
            const alpha = isTail ? 0.2 : 0.16 + rim * 0.34;
            fillStyle = isCorePlate
              ? `rgba(120, 223, 173, ${alpha + 0.14})`
              : `rgba(18, 34, 58, ${alpha + 0.24})`;
            strokeStyle =
              (i + j) % 2 === 0
                ? `rgba(120, 223, 173, ${0.52 + ndotl * 0.32})`
                : `rgba(99, 213, 255, ${0.48 + rim * 0.32})`;
          } else if (bioWeight > 0.45) {
            const lum = 0.26 + ndotl * 0.5 + rim * 0.32;
            fillStyle = isCorePlate
              ? `rgba(120, 223, 173, ${0.42 * lum})`
              : `rgba(56, 189, 248, ${0.36 * lum})`;
            strokeStyle = `rgba(210, 244, 255, ${0.34 + rim * 0.38})`;
          } else {
            if (isTail) {
              fillStyle = `rgba(165, 230, 255, ${0.24 + rim * 0.22})`;
              strokeStyle = "rgba(220, 246, 255, 0.44)";
            } else if (isCorePlate) {
              const rCol = Math.round(lerp(75, 135, ndotl));
              const gCol = Math.round(lerp(205, 245, ndotl));
              const bCol = Math.round(lerp(175, 220, rim));
              fillStyle = `rgba(${rCol}, ${gCol}, ${bCol}, 0.86)`;
              strokeStyle = "rgba(220, 255, 240, 0.52)";
            } else {
              const rCol = Math.round(lerp(28, 125, ndotl * 0.75 + rim * 0.25));
              const gCol = Math.round(lerp(56, 198, ndotl * 0.75 + rim * 0.25));
              const bCol = Math.round(lerp(96, 248, ndotl * 0.7 + rim * 0.3));
              fillStyle = `rgba(${rCol}, ${gCol}, ${bCol}, 0.84)`;
              strokeStyle = `rgba(99, 213, 255, ${0.28 + rim * 0.34})`;
            }
          }

          pushPoly([v00, v01, v11, v10], fillStyle, strokeStyle, isTail ? 0.65 : 0.8);
        }
      }

      polygons.sort((a, b) => b.avgZ - a.avgZ);

      ctx.lineJoin = "round";
      for (const poly of polygons) {
        const pv = poly.projVerts;
        ctx.beginPath();
        ctx.moveTo(pv[0].sx, pv[0].sy);
        for (let k = 1; k < pv.length; k++) {
          ctx.lineTo(pv[k].sx, pv[k].sy);
        }
        ctx.closePath();
        ctx.fillStyle = poly.fillStyle;
        ctx.fill();
        ctx.strokeStyle = poly.strokeStyle;
        ctx.lineWidth = poly.lineWidth;
        ctx.stroke();
      }

      // Dual Glowing Cyber-Optics & Telemetry Whiskers
      const headSeg = spine[2];
      const snoutSeg = spine[0];
      const headProf = getSentinelProfile(2);

      for (const side of [-1, 1]) {
        const ex =
          headSeg.wx +
          headSeg.bx * side * headProf.rx * scaleFactor * 0.88 +
          headSeg.nx * 3.5 * scaleFactor;
        const ey =
          headSeg.wy +
          headSeg.by * side * headProf.rx * scaleFactor * 0.88 +
          headSeg.ny * 3.5 * scaleFactor;
        const ez =
          headSeg.wz +
          headSeg.bz * side * headProf.rx * scaleFactor * 0.88 +
          headSeg.nz * 3.5 * scaleFactor;
        const ep = project3D(ex, ey, ez);
        if (ep) {
          const eyeR = Math.max(1.8, 3.5 * scaleFactor * ep.scale);
          ctx.fillStyle = "#78dfad";
          ctx.beginPath();
          ctx.arc(ep.sx, ep.sy, eyeR, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(ep.sx, ep.sy, eyeR * 0.45, 0, Math.PI * 2);
          ctx.fill();
        }

        const bStart = project3D(
          snoutSeg.wx + snoutSeg.bx * side * 5.5 * scaleFactor,
          snoutSeg.wy + snoutSeg.by * side * 5.5 * scaleFactor,
          snoutSeg.wz + snoutSeg.bz * side * 5.5 * scaleFactor
        );
        const bMid = project3D(
          snoutSeg.wx + snoutSeg.bx * side * 20 * scaleFactor - snoutSeg.tx * 13 * scaleFactor,
          snoutSeg.wy +
            snoutSeg.by * side * 20 * scaleFactor -
            snoutSeg.ty * 13 * scaleFactor +
            Math.sin(flightPhase + side) * 5,
          snoutSeg.wz + snoutSeg.bz * side * 20 * scaleFactor - snoutSeg.tz * 13 * scaleFactor
        );
        const bEnd = project3D(
          snoutSeg.wx + snoutSeg.bx * side * 31 * scaleFactor - snoutSeg.tx * 29 * scaleFactor,
          snoutSeg.wy +
            snoutSeg.by * side * 31 * scaleFactor -
            snoutSeg.ty * 29 * scaleFactor +
            Math.cos(flightPhase + side) * 9,
          snoutSeg.wz + snoutSeg.bz * side * 31 * scaleFactor - snoutSeg.tz * 29 * scaleFactor
        );
        if (bStart && bMid && bEnd) {
          ctx.strokeStyle = "rgba(120, 223, 173, 0.76)";
          ctx.lineWidth = 1.2 * bStart.scale;
          ctx.beginPath();
          ctx.moveTo(bStart.sx, bStart.sy);
          ctx.quadraticCurveTo(bMid.sx, bMid.sy, bEnd.sx, bEnd.sy);
          ctx.stroke();
        }
      }
    };

    let lastTs = 0;
    let rafId = 0;
    const tick = (ts: number) => {
      const dt = lastTs ? Math.min(50, ts - lastTs) : 16.6;
      lastTs = ts;

      updateHeroConstruct(ts, dt);
      if (!reducedMotion) {
        updateSentinelKinematics(ts, dt);
        renderScene(ts);
        rafId = window.requestAnimationFrame(tick);
      }
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.clearTimeout(morphTimer);
      window.clearTimeout(diveTimer);
      window.clearTimeout(dockTimer);
      window.clearTimeout(removeTimer);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointermove", onStagePointerMove);
      window.removeEventListener("pointermove", onGlobalPointerMove);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", readScrollRatio);
      secObs.disconnect();
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [isHome, waypoints]);

  return (
    <>
      {showPreloader && (
        <div aria-hidden="true" className="ks-preloader" id="ks-preloader" ref={preloaderRef}>
          <div className="ks-preload-backdrop">
            <div className="ks-preload-ambient" />
          </div>
          <div className="ks-preload-stage">
            <div className="ks-preload-orbit" />

            {/* 3D Armored SOC Cyber-Vault & Laser Scanner Rig (Distinct from Web_CNTT Laptop) */}
            <div className="ks-vault-rig" id="ks-vault-rig">
              <div className="ks-vault-scene">
                {/* 3D Vault Chamber Frame & Dual Blast Gates */}
                <div className="ks-vault-chamber">
                  <div className="ks-vault-screen">
                    <div className="ks-vault-scanline" />
                    <div className="ks-vault-hud-corners" />
                    <span className="ks-vault-boot-code">
                      GATEWAY // NFQUEUE · SURICATA · WAZUH
                    </span>
                  </div>
                  <div className="ks-vault-door ks-vault-door--left">
                    <span className="ks-door-seam" />
                    <span className="ks-door-label">FIREWALL // L</span>
                  </div>
                  <div className="ks-vault-door ks-vault-door--right">
                    <span className="ks-door-seam" />
                    <span className="ks-door-label">POLICY // R</span>
                  </div>
                </div>

                {/* 3D Tilted SOC Command Deck Base */}
                <div className="ks-vault-deck">
                  <div className="ks-vault-matrix" />
                  <div className="ks-vault-status-strip">
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className="ks-vault-lip" />
                </div>
              </div>

              {/* Autonomous Laser Interceptor Beam Unlocking the Vault */}
              <svg
                className="ks-vault-scanner"
                fill="none"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="md-scanner-grad" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="#d8f6ff" stopOpacity="0.95" />
                    <stop offset="50%" stopColor="#63d5ff" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#78dfad" stopOpacity="0.95" />
                  </linearGradient>
                </defs>
                <circle
                  className="ks-scanner-ring"
                  cx="100"
                  cy="100"
                  r="34"
                  stroke="#78dfad"
                  strokeWidth="1.6"
                  strokeDasharray="6 4"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="18"
                  stroke="#63d5ff"
                  strokeWidth="1.4"
                />
                <path
                  d="M100 50V74M100 126V150M50 100H74M126 100H150"
                  stroke="url(#md-scanner-grad)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <circle cx="100" cy="100" r="5" fill="#78dfad" />
              </svg>
            </div>

            {/* Shared-Element 3D Split-Shield Frame -> Flies & Docks into Hero Construct */}
            <div className="ks-preload-frame" id="ks-preload-frame" ref={preloadFrameRef}>
              <span className="ks-preload-inner-ring">
                <i className="ks-preload-mint-dot" />
              </span>
              <svg
                className="ks-preload-logo"
                viewBox="0 0 96 96"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="md-preload-grad" x1="0" x2="1" y1="0" y2="1">
                    <stop stopColor="#63d5ff" />
                    <stop offset="0.55" stopColor="#78dfad" />
                    <stop offset="1" stopColor="#dff9ff" />
                  </linearGradient>
                  <linearGradient id="md-preload-stroke" x1="0" x2="1" y1="1" y2="0">
                    <stop stopColor="#ffffff" stopOpacity="0.8" />
                    <stop offset="1" stopColor="#63d5ff" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <g
                  className="ks-preload-piece ks-preload-piece--top"
                  fill="url(#md-preload-grad)"
                  stroke="url(#md-preload-stroke)"
                  strokeWidth="0.8"
                >
                  <path d="M48 12L18 25V47C18 53 20 59 23 64L48 39L66 57C69 52 70 47 70 41V22L48 12Z" />
                </g>
                <g
                  className="ks-preload-piece ks-preload-piece--bottom"
                  fill="url(#md-preload-grad)"
                  stroke="url(#md-preload-stroke)"
                  strokeWidth="0.8"
                >
                  <path d="M48 47L27 68C33 76 40 81 48 85C59 80 68 71 73 59L58 44L48 54V47Z" />
                </g>
              </svg>
            </div>

            <div className="ks-preload-meta">
              <span className="ks-preload-brand">MẠNH ĐỨC // BLUE TEAM SOC</span>
              <span className="ks-preload-bar">
                <i />
              </span>
              <span className="ks-preload-sub">
                PERIMETER VERIFIED · LAUNCHING 3D TELEMETRY STAGE
              </span>
            </div>
          </div>
        </div>
      )}

      <canvas aria-hidden="true" className="ks-scroll-canvas" id="ks-scroll-canvas" ref={canvasRef} />

      <div aria-hidden="true" className="ks-side-ambient" ref={sideAmbientRef}>
        <span className="ks-side-beam ks-side-beam--left" />
        <span className="ks-side-beam ks-side-beam--right" />
      </div>

      <aside aria-label="Telemetry HUD and quick section navigation" className="ks-side-rails">
        <div aria-hidden="true" className="ks-side-rail ks-side-rail--left">
          <span className="ks-rail-code">SOC // MD-26</span>
          <div className="ks-rail-meter">
            <i className="ks-rail-meter-fill" ref={railMeterFillRef}>
              <span className="ks-rail-energy-track">
                <b className="ks-rail-energy-drop" />
              </span>
              <u className="ks-rail-tip-dot" />
            </i>
            <span className="ks-rail-ticks" />
          </div>
          <span className="ks-rail-vertical-label" ref={railSectionLabelRef}>
            {waypoints[0].meta}
          </span>
          <span className="ks-rail-pct" ref={railDepthPctRef}>
            000%
          </span>
        </div>

        <nav aria-label="Quick section waypoints" className="ks-side-rail ks-side-rail--right">
          <span aria-hidden="true" className="ks-rail-code">
            3D // LIVE
          </span>
          <div className="ks-rail-waypoints">
            <span aria-hidden="true" className="ks-rail-pulse" />
            {waypoints.map((wp) => (
              <a
                key={wp.id}
                aria-label={wp.code}
                className={`ks-rail-node ${activeSectionId === wp.id ? "is-active" : ""}`}
                href={`#${wp.id}`}
              >
                <span>{wp.code}</span>
              </a>
            ))}
          </div>
          <span aria-hidden="true" className="ks-rail-coords" ref={railCoordsRef}>
            Z · +015m
          </span>
        </nav>
      </aside>
    </>
  );
}
