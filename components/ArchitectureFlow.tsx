"use client";

import { useState } from "react";

interface PipelineStep {
  name: string;
  layer: string;
  role: string;
  playbooks: string;
  target: "network" | "endpoint" | "both";
}

const STEPS: PipelineStep[] = [
  {
    name: "Internet",
    layer: "Ingress",
    role: "External HTTP/HTTPS request stream entering the lab boundary.",
    playbooks: "PB-01 · PB-02",
    target: "network",
  },
  {
    name: "nftables / NFQUEUE",
    layer: "Kernel packet hook",
    role: "Queues inline packets to Suricata and enforces TTL IP block sets at the gateway.",
    playbooks: "PB-01 · PB-02 · SAFE",
    target: "network",
  },
  {
    name: "Suricata IPS",
    layer: "Inline prevention",
    role: "Inspects queued traffic and drops matching exploit signatures before reaching NGINX.",
    playbooks: "PB-02",
    target: "network",
  },
  {
    name: "NGINX Gateway",
    layer: "Reverse proxy",
    role: "Terminates TLS, controls service exposure and emits structured web access/error logs.",
    playbooks: "PB-01 · PB-02",
    target: "network",
  },
  {
    name: "Web / Endpoint Telemetry",
    layer: "Log & auditd sources",
    role: "Collects NGINX, Suricata EVE, FIM and auditd process/argument/UID execution records.",
    playbooks: "PB-01 · PB-02 · PB-03",
    target: "both",
  },
  {
    name: "Wazuh SIEM",
    layer: "Correlation engine",
    role: "Normalizes multi-source logs and fires high-confidence custom rules (110152, 110160, 110120).",
    playbooks: "PB-01 · PB-02 · PB-03",
    target: "both",
  },
  {
    name: "Shuffle SOAR",
    layer: "Allowlisted orchestration",
    role: "Accepts only approved rule IDs and dispatches bounded response requests with Telegram reporting.",
    playbooks: "PB-01 · PB-02 · PB-03",
    target: "both",
  },
  {
    name: "Response Policy",
    layer: "Independent guard",
    role: "Validates target IP/agent, refuses protected sources (bypassed), and verifies enforcement state.",
    playbooks: "PB-01 · PB-02 · PB-03 · SAFE",
    target: "both",
  },
];

/**
 * Interactive SOC operational flow with animated SVG packet traces
 * and node-level telemetry inspection.
 */
export function ArchitectureFlow() {
  const [selectedIdx, setSelectedIdx] = useState<number>(5);
  const activeStep = STEPS[selectedIdx];

  return (
    <div className="architecture-flow" aria-label="SOC response architecture">
      <div className="flow-pipeline">
        {STEPS.map((step, index) => {
          const isSelected = selectedIdx === index;
          return (
            <div className="flow-item" key={step.name}>
              <button
                type="button"
                className={`flow-node ${isSelected ? "is-selected" : ""}`}
                aria-pressed={isSelected}
                onClick={() => setSelectedIdx(index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step.name}</strong>
              </button>
              {index < STEPS.length - 1 && (
                <div className="flow-arrow" aria-hidden="true">
                  <svg viewBox="0 0 36 14" fill="none">
                    <line
                      x1="0"
                      y1="7"
                      x2="30"
                      y2="7"
                      stroke="rgba(99, 213, 255, 0.25)"
                      strokeWidth="1.4"
                    />
                    <line
                      className="packet-trace"
                      x1="0"
                      y1="7"
                      x2="30"
                      y2="7"
                      stroke="#63d5ff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      style={{ animationDelay: `${index * 0.22}s` }}
                    />
                    <path
                      d="M27 3.5L32.5 7L27 10.5"
                      stroke="#63d5ff"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flow-inspector" aria-live="polite">
        <div className="flow-inspector-meta">
          <span>
            LAYER {String(selectedIdx + 1).padStart(2, "0")} · {activeStep.layer}
          </span>
          <span className="flow-playbooks">{activeStep.playbooks}</span>
        </div>
        <p className="flow-inspector-body">
          <strong>{activeStep.name}:</strong> {activeStep.role}
        </p>
      </div>

      <div className="enforcement-grid">
        <div
          data-spotlight
          className={`enforcement-card ${
            activeStep.target === "network" || activeStep.target === "both" ? "is-highlighted" : ""
          }`}
        >
          <small>Network enforcement</small>
          <strong>Gateway API → nftables TTL</strong>
          <span>PB-01 / PB-02</span>
        </div>
        <div
          data-spotlight
          className={`enforcement-card ${
            activeStep.target === "endpoint" || activeStep.target === "both" ? "is-highlighted" : ""
          }`}
        >
          <small>Endpoint response</small>
          <strong>Wazuh API → Active Response</strong>
          <span>PB-03 · audit-only</span>
        </div>
      </div>
    </div>
  );
}
