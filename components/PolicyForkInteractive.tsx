"use client";

import { useState } from "react";

type ForkCase = "threat" | "protected";

const FORK_SCENARIOS: Record<
  ForkCase,
  {
    label: string;
    source: string;
    check: string;
    decision: "blocked" | "bypassed";
    outcome: string;
    nftablesState: string;
  }
> = {
  threat: {
    label: "Untrusted threat IP",
    source: "External recon / exploit source",
    check: "Valid IPv4, outside protected allowlist",
    decision: "blocked",
    outcome: "Inserted into nftables block set (TTL 60s)",
    nftablesState: "result.present = true",
  },
  protected: {
    label: "Protected management source",
    source: "Management / infrastructure IP",
    check: "Matched protected-source policy guard",
    decision: "bypassed",
    outcome: "Refused safely; not inserted into nftables",
    nftablesState: "result.present = false",
  },
};

/**
 * Interactive policy fork demonstrating how the Gateway API independently
 * validates SOAR block requests before touching nftables.
 */
export function PolicyForkInteractive() {
  const [scenario, setScenario] = useState<ForkCase>("threat");
  const active = FORK_SCENARIOS[scenario];

  return (
    <div className="policy-fork-wrap">
      <div className="policy-fork-controls" role="tablist" aria-label="Simulate policy source">
        {(["threat", "protected"] as const).map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={scenario === key}
            className={`fork-tab ${scenario === key ? "is-active" : ""}`}
            onClick={() => setScenario(key)}
          >
            {FORK_SCENARIOS[key].label}
          </button>
        ))}
      </div>

      <div className="policy-fork">
        <div className="fork-box">
          <small>SOAR request</small>
          <strong>Block source</strong>
          <span className="fork-meta">{active.source}</span>
        </div>

        <div className="fork-connector" aria-hidden="true">
          <svg viewBox="0 0 48 16" fill="none">
            <line x1="0" y1="8" x2="40" y2="8" stroke="rgba(99,213,255,0.28)" strokeWidth="1.5" />
            <line
              className="packet-trace"
              x1="0"
              y1="8"
              x2="40"
              y2="8"
              stroke="#63d5ff"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path d="M36 4L43 8L36 12" stroke="#63d5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="fork-box is-gate">
          <small>Gateway policy</small>
          <strong>Validate + protected sources</strong>
          <span className="fork-meta">{active.check}</span>
        </div>

        <div className="fork-connector" aria-hidden="true">
          <svg viewBox="0 0 48 16" fill="none">
            <line x1="0" y1="8" x2="40" y2="8" stroke="rgba(99,213,255,0.28)" strokeWidth="1.5" />
            <line
              className="packet-trace"
              x1="0"
              y1="8"
              x2="40"
              y2="8"
              stroke={scenario === "threat" ? "#78dfad" : "#63d5ff"}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M36 4L43 8L36 12"
              stroke={scenario === "threat" ? "#78dfad" : "#63d5ff"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="fork-results">
          <div className={`fork-branch ${scenario === "threat" ? "is-selected good" : "is-dimmed"}`}>
            <strong>blocked</strong>
            <small>{scenario === "threat" ? active.outcome : "Not taken"}</small>
          </div>
          <div className={`fork-branch ${scenario === "protected" ? "is-selected accent" : "is-dimmed"}`}>
            <strong>bypassed</strong>
            <small>{scenario === "protected" ? active.outcome : "Not taken"}</small>
          </div>
        </div>
      </div>

      <div className="fork-telemetry-line">
        <span>decision: <strong>{active.decision}</strong></span>
        <span>{active.nftablesState}</span>
      </div>
    </div>
  );
}
