const steps = [
  "Internet",
  "nftables / NFQUEUE",
  "Suricata IPS",
  "NGINX Gateway",
  "Web / Endpoint Telemetry",
  "Wazuh SIEM",
  "Shuffle SOAR",
  "Response Policy",
];

export function ArchitectureFlow() {
  return (
    <div className="architecture-flow" aria-label="SOC response architecture">
      {steps.map((step, index) => (
        <div className="flow-item" key={step}>
          <div className="flow-node">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step}</strong>
          </div>
          {index < steps.length - 1 && <div className="flow-arrow" aria-hidden="true">→</div>}
        </div>
      ))}
      <div className="enforcement-grid">
        <div className="enforcement-card">
          <small>Network enforcement</small>
          <strong>Gateway API → nftables TTL</strong>
          <span>PB-01 / PB-02</span>
        </div>
        <div className="enforcement-card">
          <small>Endpoint response</small>
          <strong>Wazuh API → Active Response</strong>
          <span>PB-03 · audit-only</span>
        </div>
      </div>
    </div>
  );
}
