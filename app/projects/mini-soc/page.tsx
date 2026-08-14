import type { Metadata } from "next";
import Link from "next/link";
import { ArchitectureFlow } from "@/components/ArchitectureFlow";
import { EvidenceImage, SanitizedOutput } from "@/components/Evidence";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Mini SOC Case Study",
  description:
    "Technical case study of a graduation capstone covering SIEM, inline IPS, detection engineering, SOAR, response APIs, endpoint monitoring and safe automation.",
};

const contributionGroups = [
  ["SIEM & telemetry", "Wazuh Manager/Indexer/Dashboard, Agent integration, NGINX/Suricata/auditd/FIM/application log ingestion."],
  ["Detection engineering", "Custom Wazuh rules, correlation thresholds, Suricata signatures, high-confidence allowlists and MITRE ATT&CK mapping."],
  ["Gateway defense", "NGINX reverse proxy, TLS termination, nftables, NFQUEUE, inline Suricata IPS and service exposure controls."],
  ["Response engineering", "Shuffle workflows, response policy, SOC Gateway Block API, protected-source policy, TTL containment and Telegram reporting."],
  ["Endpoint monitoring", "auditd execution context, Linux FIM, Wazuh Active Response dispatch and verification at the target Agent."],
  ["Validation", "End-to-end testing for PB-01, PB-02, PB-03 and protected-source bypass behavior."],
];

export default function MiniSocPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="case-hero section-pad">
          <div className="container">
            <Link className="back-link" href="/">← Portfolio</Link>
            <div className="case-eyebrow">Graduation Capstone · Team of 2 · 2026</div>
            <h1>Mini SOC for Enterprise Web & Endpoint Security</h1>
            <p className="case-intro">
              A controlled research lab connecting network, web, endpoint, SIEM and SOAR layers so a
              security event can be traced from telemetry to detection, policy decision, enforcement and verification.
            </p>
            <div className="case-meta-grid">
              <div><span>My role</span><strong>SOC & Security Engineering</strong></div>
              <div><span>Focus</span><strong>Blue Team / Detection / Response</strong></div>
              <div><span>Environment</span><strong>Self-hosted lab</strong></div>
              <div><span>Status</span><strong>Validated within defined scope</strong></div>
            </div>
            <div className="scope-callout">
              <strong>Contribution boundary.</strong> This was a two-person capstone. I implemented the SOC and
              security-engineering portion described on this page. SDN implementation and LLM integration were
              developed by my teammate and are intentionally not claimed as my work.
            </div>
          </div>
        </section>

        <section className="section-pad border-top">
          <div className="container split-section">
            <div className="section-label">01 / Problem</div>
            <div>
              <h2>One alert source is not enough to explain an incident.</h2>
              <p className="lead">
                The project studies a small SOC architecture where Internet-facing traffic, reverse-proxy activity,
                application logs and endpoint execution telemetry are centralized in Wazuh. High-confidence alerts
                can then be routed through Shuffle to restricted response mechanisms instead of giving the SOAR
                platform unrestricted system access.
              </p>
              <div className="principle-row">
                {[
                  "Defense in Depth",
                  "Least Exposure",
                  "Evidence Before Action",
                  "Time-bounded Containment",
                  "Independent Policy Checks",
                  "Verify at Enforcement Point",
                ].map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad border-top">
          <div className="container">
            <div className="section-heading-row">
              <div className="section-label">02 / Architecture</div>
              <p>Operational flow for the portion I implemented.</p>
            </div>
            <ArchitectureFlow />
            <div className="evidence-grid compact-top">
              <EvidenceImage
                src="/evidence/architecture.jpg"
                alt="Graduation capstone architecture diagram"
                caption="Evidence 01 — Architecture diagram from the capstone report."
              />
              <EvidenceImage
                src="/evidence/wazuh-dashboard.jpg"
                alt="Wazuh dashboard operating in the lab"
                caption="Evidence 02 — Wazuh Dashboard operating in the controlled environment."
              />
            </div>
          </div>
        </section>

        <section className="section-pad border-top">
          <div className="container">
            <div className="section-heading-row">
              <div className="section-label">03 / My Contributions</div>
              <p>Scope stated explicitly to keep team ownership auditable.</p>
            </div>
            <div className="contribution-grid">
              {contributionGroups.map(([title, body], index) => (
                <article key={title} className="contribution-card">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
            <div className="not-mine">
              <span>Not claimed as my implementation</span>
              <strong>SDN: Mininet / OVS / Ryu / Flow-Mod</strong>
              <strong>LLM: DeepSeek processing and LLM dashboard integration</strong>
            </div>
          </div>
        </section>

        <section className="section-pad border-top">
          <div className="container split-section">
            <div className="section-label">04 / Detection Engineering</div>
            <div>
              <h2>Telemetry is separated from response-triggering detection.</h2>
              <p className="lead">
                Low-level events establish context. Correlation and high-confidence rules narrow the signal.
                Only selected rules can cross the SOAR boundary and reach a response policy. This avoids turning
                ordinary activity—such as one HTTP 404 or a normal shell invocation—into automatic containment.
              </p>
              <div className="detection-ladder">
                <div><span>01</span><strong>Telemetry</strong><em>Raw network, web, app and endpoint events</em></div>
                <div><span>02</span><strong>Context rule</strong><em>Normalize source and execution context</em></div>
                <div><span>03</span><strong>High-confidence detection</strong><em>Correlation / selected pattern</em></div>
                <div><span>04</span><strong>SOAR allowlist</strong><em>Only validated rule IDs proceed</em></div>
                <div><span>05</span><strong>Response policy</strong><em>Choose domain, action and safeguards</em></div>
              </div>
            </div>
          </div>
        </section>

        <section className="case-study section-pad border-top">
          <div className="container">
            <div className="case-study-head">
              <div><span>PB-01</span><h2>Web Reconnaissance</h2></div>
              <div className="state-chip">Detected → Contained</div>
            </div>
            <div className="case-study-grid">
              <div>
                <h3>Why this detection exists</h3>
                <p>
                  A single HTTP 404 is normal. Repeated requests to non-existent resources from the same source
                  within a short window can indicate automated reconnaissance. The workflow therefore responds to
                  the correlation rule rather than the individual event.
                </p>
                <div className="mini-flow">Repeated 404 → Wazuh 110152 → Shuffle → Gateway API → nftables TTL → Telegram</div>
                <div className="decision-note"><strong>Engineering decision:</strong> one 404 never triggers containment.</div>
              </div>
              <EvidenceImage src="/evidence/pb01-flow.jpg" alt="PB-01 workflow diagram" caption="PB-01 — end-to-end response flow from the report." />
            </div>
            <SanitizedOutput
              title="PB-01 / Gateway enforcement"
              rows={[
                ["rule_id", "110152"],
                ["approved", "true"],
                ["decision", "blocked"],
                ["source_ip", "[REDACTED]"],
                ["ttl_seconds", "60"],
                ["result.present", "true"],
              ]}
            />
          </div>
        </section>

        <section className="case-study section-pad border-top">
          <div className="container">
            <div className="case-study-head">
              <div><span>PB-02</span><h2>Web Exploitation</h2></div>
              <div className="state-chip">Prevented → Contained</div>
            </div>
            <div className="case-study-grid reverse">
              <EvidenceImage src="/evidence/pb02-flow.jpg" alt="PB-02 workflow diagram" caption="PB-02 — Suricata prevention followed by SOAR containment." />
              <div>
                <h3>Prevention is not the same as containment</h3>
                <p>
                  Suricata operates inline through NFQUEUE and blocks selected exploit signatures. Wazuh then
                  receives the confirmed blocked event. Shuffle can request temporary containment of the original
                  source through the Gateway API.
                </p>
                <div className="mini-flow">Exploit → Suricata blocked → Wazuh 110160 → Shuffle → Gateway API → TTL block</div>
                <div className="decision-note"><strong>Distinction:</strong> Suricata stops the malicious request; gateway containment restricts subsequent requests from that source.</div>
              </div>
            </div>
            <SanitizedOutput
              title="PB-02 / Confirmed prevention"
              rows={[
                ["event_type", "alert"],
                ["suricata.action", "blocked"],
                ["wazuh_rule", "110160"],
                ["source_ip", "[REDACTED]"],
                ["response", "gateway_block"],
                ["gateway.present", "true"],
              ]}
            />
          </div>
        </section>

        <section className="case-study section-pad border-top">
          <div className="container">
            <div className="case-study-head">
              <div><span>PB-03</span><h2>Suspicious Shell Execution</h2></div>
              <div className="state-chip bounded">Detected → Audit response</div>
            </div>
            <div className="case-study-grid">
              <div>
                <h3>Endpoint evidence closes the visibility gap</h3>
                <p>
                  auditd records executable, arguments, user identity, PID, PPID and privilege context. Selected
                  Wazuh rules identify high-confidence command patterns. Shuffle then dispatches a Wazuh Active
                  Response to the target Agent and the script execution is verified on the endpoint itself.
                </p>
                <div className="mini-flow">auditd → Wazuh → Shuffle → Wazuh API → target Agent → audit script → endpoint evidence</div>
                <div className="decision-note"><strong>Current boundary:</strong> audit-only. The workflow does not kill a process, isolate the host, modify its firewall or lock an account.</div>
              </div>
              <EvidenceImage src="/evidence/pb03-flow.jpg" alt="PB-03 workflow diagram" caption="PB-03 — Active Response is verified at the target endpoint." />
            </div>
            <SanitizedOutput
              title="PB-03 / Endpoint verification"
              status="bounded"
              rows={[
                ["rule_id", "110120"],
                ["response_action", "endpoint_audit"],
                ["agent_id", "008"],
                ["executable", "/usr/bin/bash"],
                ["program", "active-response/bin/soc-ar-audit.sh"],
                ["containment", "not_performed"],
              ]}
            />
          </div>
        </section>

        <section className="section-pad border-top safe-automation-section">
          <div className="container split-section">
            <div className="section-label">08 / Safe Automation</div>
            <div>
              <h2>The response layer must be able to refuse a valid request.</h2>
              <p className="lead">
                The Gateway API performs its own policy checks instead of blindly trusting the SOAR workflow.
                Protected management and infrastructure sources return a valid <code>bypassed</code> decision and
                are not inserted into the nftables block set.
              </p>
              <div className="policy-fork">
                <div><small>SOAR request</small><strong>Block source</strong></div>
                <span>→</span>
                <div><small>Gateway policy</small><strong>Validate + protected sources</strong></div>
                <span>→</span>
                <div className="fork-results">
                  <strong>blocked</strong>
                  <strong>bypassed</strong>
                </div>
              </div>
              <SanitizedOutput
                title="Protected-source validation"
                status="bypassed"
                rows={[
                  ["ok", "true"],
                  ["decision", "bypassed"],
                  ["reason", "protected_source"],
                  ["source_ip", "[REDACTED]"],
                  ["result.present", "false"],
                ]}
              />
            </div>
          </div>
        </section>

        <section className="section-pad border-top">
          <div className="container">
            <div className="section-heading-row">
              <div className="section-label">09 / Orchestration Evidence</div>
              <p>Real implementation imagery retained only where it is safe to publish.</p>
            </div>
            <div className="evidence-grid">
              <EvidenceImage src="/evidence/shuffle-overview.jpg" alt="Shuffle workflow overview" caption="Evidence 03 — Shuffle workflow overview used for alert routing." />
              <EvidenceImage src="/evidence/pb01-flow.jpg" alt="PB-01 flow" caption="Evidence 04 — PB-01 correlation-to-containment flow." />
              <EvidenceImage src="/evidence/pb02-flow.jpg" alt="PB-02 flow" caption="Evidence 05 — PB-02 prevention and containment flow." />
              <EvidenceImage src="/evidence/pb03-flow.jpg" alt="PB-03 flow" caption="Evidence 06 — PB-03 endpoint audit-response flow." />
            </div>
          </div>
        </section>

        <section className="section-pad border-top limitations-section">
          <div className="container split-section">
            <div className="section-label">10 / Engineering Boundaries</div>
            <div>
              <h2>What this project does not prove.</h2>
              <div className="boundary-list">
                <div><strong>Not production-certified</strong><p>It is a controlled research/lab deployment, not a production SOC.</p></div>
                <div><strong>Rule-based coverage</strong><p>Validated detections cover defined patterns and scenarios; they are not broad behavioral detection.</p></div>
                <div><strong>PB-03 is audit-only</strong><p>Endpoint response verifies evidence collection rather than full endpoint containment.</p></div>
                <div><strong>No large-scale benchmark claim</strong><p>High availability, failover, broad load testing and statistically meaningful FP/FN evaluation are outside the validated scope.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad border-top">
          <div className="container">
            <div className="section-heading-row"><div className="section-label">11 / Lessons</div><p>Engineering conclusions from the implementation.</p></div>
            <div className="lessons-grid">
              {[
                ["Detection needs context", "A log event is not automatically an incident."],
                ["Prevention ≠ containment", "Stopping one malicious request differs from restricting subsequent access."],
                ["Automation needs safeguards", "Response APIs need validation, protected resources, traceability and rollback."],
                ["HTTP 200 is not final evidence", "A response must be verified at the actual enforcement point."],
                ["Boundaries reduce blast radius", "Bind addresses, firewall policy and restricted APIs matter as much as the workflow."],
              ].map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}
            </div>
            <div className="project-cta">
              <div><span>Repository</span><strong>mini-soc-enterprise-web-lab</strong></div>
              <a className="button primary" href="https://github.com/CH3COOCH2CH2CH3/mini-soc-enterprise-web-lab" target="_blank" rel="noreferrer">Open GitHub repository</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
