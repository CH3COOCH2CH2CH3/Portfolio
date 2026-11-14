"use client";

import { useEffect, useState } from "react";

let hasPlayedIntroInApp = false;

const BOOT_STEPS = [
  { id: "01", label: "telemetry.stream", state: "OK" },
  { id: "02", label: "suricata.inline", state: "ARMED" },
  { id: "03", label: "wazuh.correlation", state: "SYNCED" },
  { id: "04", label: "policy.boundary", state: "VERIFIED" },
] as const;

/**
 * Tactical SOC perimeter handshake intro shown once per full page load.
 * Skipped automatically on client-side route transitions or when reduced motion is preferred.
 */
export function SocIntro() {
  const [phase, setPhase] = useState<"active" | "exiting" | "done">(() =>
    hasPlayedIntroInApp ? "done" : "active"
  );

  useEffect(() => {
    if (hasPlayedIntroInApp) {
      setPhase("done");
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      hasPlayedIntroInApp = true;
      setPhase("done");
      return;
    }

    const dismiss = () => {
      hasPlayedIntroInApp = true;
      setPhase((current) => (current === "done" ? "done" : "exiting"));
    };

    const exitTimer = window.setTimeout(dismiss, 1450);
    const unmountTimer = window.setTimeout(() => {
      hasPlayedIntroInApp = true;
      setPhase("done");
    }, 1850);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        window.clearTimeout(exitTimer);
        window.clearTimeout(unmountTimer);
        dismiss();
        window.setTimeout(() => setPhase("done"), 360);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(unmountTimer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  if (phase === "done") {
    return null;
  }

  const handleSkip = () => {
    hasPlayedIntroInApp = true;
    setPhase("exiting");
    window.setTimeout(() => setPhase("done"), 340);
  };

  return (
    <div
      className={`soc-intro ${phase === "exiting" ? "is-exiting" : ""}`}
      role="dialog"
      aria-label="Security perimeter initialization"
      aria-modal="false"
    >
      <div className="soc-intro-grid" aria-hidden="true" />
      <div className="soc-intro-glow" aria-hidden="true" />

      <div className="soc-intro-card">
        <div className="soc-intro-reticle" aria-hidden="true">
          <svg viewBox="0 0 180 180" fill="none">
            <circle
              className="reticle-ring-outer"
              cx="90"
              cy="90"
              r="76"
              stroke="rgba(99, 213, 255, 0.25)"
              strokeWidth="1"
              strokeDasharray="6 6"
            />
            <circle
              className="reticle-ring-sweep"
              cx="90"
              cy="90"
              r="62"
              stroke="url(#socIntroSweep)"
              strokeWidth="2"
              strokeDasharray="95 295"
              strokeLinecap="round"
            />
            <circle
              cx="90"
              cy="90"
              r="46"
              stroke="rgba(120, 223, 173, 0.25)"
              strokeWidth="1"
            />
            <path
              d="M90 14V26M90 154V166M14 90H26M154 90H166"
              stroke="rgba(99, 213, 255, 0.5)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              className="reticle-shield"
              d="M90 48L118 60V88C118 107 106 122 90 130C74 122 62 107 62 88V60L90 48Z"
              fill="rgba(99, 213, 255, 0.08)"
              stroke="#63d5ff"
              strokeWidth="1.6"
            />
            <defs>
              <linearGradient id="socIntroSweep" x1="0" y1="0" x2="180" y2="180">
                <stop offset="0%" stopColor="#63d5ff" />
                <stop offset="100%" stopColor="#78dfad" />
              </linearGradient>
            </defs>
          </svg>
          <span className="soc-intro-badge">MD // SOC</span>
        </div>

        <div className="soc-intro-header">
          <span className="soc-intro-dot" aria-hidden="true" />
          <span>PERIMETER HANDSHAKE · BLUE TEAM LAB</span>
        </div>

        <ul className="soc-intro-log" aria-label="Telemetry checks">
          {BOOT_STEPS.map((step, index) => (
            <li
              key={step.id}
              style={{ "--step-delay": `${140 + index * 200}ms` } as React.CSSProperties}
            >
              <span className="log-idx">{step.id}</span>
              <span className="log-name">{step.label}</span>
              <span className="log-state">[{step.state}]</span>
            </li>
          ))}
        </ul>

        <div className="soc-intro-bar" aria-hidden="true">
          <span />
        </div>

        <div className="soc-intro-foot">
          <span>EVIDENCE_BEFORE_ACTION</span>
          <button type="button" className="soc-intro-skip" onClick={handleSkip}>
            Skip [ESC]
          </button>
        </div>
      </div>
    </div>
  );
}
