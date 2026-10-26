import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";

const skills = [
  {
    title: "Security Operations",
    body: "Wazuh SIEM/XDR, alert analysis, log ingestion, FIM, auditd, endpoint telemetry, Active Response.",
  },
  {
    title: "Detection Engineering",
    body: "Custom Wazuh rules, Suricata signatures, correlation logic, thresholds, MITRE ATT&CK mapping.",
  },
  {
    title: "Security Infrastructure",
    body: "Linux, NGINX, nftables, NFQUEUE, Tailscale, Docker, service exposure control and reverse proxying.",
  },
  {
    title: "Automation & Development",
    body: "Python, Bash, REST APIs, JSON processing, SOAR workflows, restricted response helpers and evidence-safe automation.",
  },
];

const buildPillars = [
  ["01", "Detect", "Build detections from web, network, application and endpoint telemetry."],
  ["02", "Analyze", "Normalize and correlate evidence instead of treating single events as incidents."],
  ["03", "Automate", "Route high-confidence alerts through SOAR and controlled response policies."],
  ["04", "Contain", "Apply time-bounded network containment and auditable endpoint response."],
];

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <section className="hero section-pad">
          <div className="container hero-grid">
            <div>
              <div className="eyebrow"><span className="live-dot" /> Final-year Cybersecurity Student</div>
              <h1>
                Blue Team systems built around <span>detection, evidence, and controlled response.</span>
              </h1>
              <p className="hero-copy">
                I am Mạnh Đức, a Cybersecurity student focused on SOC operations, detection engineering,
                network defense, Linux security, and incident-response automation.
              </p>
              <div className="hero-actions">
                <Link className="button primary" href="/projects/mini-soc">View featured case study</Link>
                <a className="button secondary" href="https://github.com/CH3COOCH2CH2CH3/mini-soc-enterprise-web-lab" target="_blank" rel="noreferrer">GitHub repository</a>
              </div>
              <div className="hero-meta">
                <span>HUFLIT</span>
                <span>Cybersecurity</span>
                <span>Blue Team / SOC</span>
                <span>SoICT 2026 · Accepted paper</span>
              </div>
            </div>

            <aside className="hero-panel" aria-label="Security engineering focus">
              <div className="panel-header">
                <span>security_focus.yml</span>
                <span className="panel-state">active</span>
              </div>
              <div className="code-lines">
                <div><span>path:</span> blue_team / soc</div>
                <div><span>telemetry:</span> network + web + endpoint</div>
                <div><span>siem:</span> wazuh</div>
                <div><span>ips:</span> suricata_inline</div>
                <div><span>automation:</span> soar + restricted_api</div>
                <div><span>principle:</span> evidence_before_action</div>
              </div>
              <div className="panel-rule" />
              <div className="panel-foot">
                <span>Detect</span><span>Analyze</span><span>Respond</span><span>Verify</span>
              </div>
            </aside>
          </div>
        </section>

        <section id="research" className="section-pad border-top research-section">
          <div className="container research-grid">
            <div>
              <div className="section-label">Research / Accepted Paper</div>
              <div className="research-status">SoICT 2026 · Accepted · Oral presentation</div>
              <h2>A Policy-Controlled Multi-Domain SOC: Architecture and Evidence-Based Security-Boundary Validation</h2>
              <p className="lead">
                Accepted on 18 October 2026 for an oral presentation and inclusion in the SoICT 2026 proceedings.
                The research examines security boundaries in a policy-controlled, multi-domain SOC.
                Acceptance is confirmed; publication, DOI and a proceedings link are not yet claimed.
              </p>
              <Link className="text-link" href="/projects/mini-soc#publication">Research context and implementation scope →</Link>
            </div>
            <aside className="publication-panel" aria-label="Accepted paper details">
              <span className="publication-panel-eyebrow">Publication record</span>
              <div className="publication-field"><span>Venue</span><strong>SoICT 2026</strong></div>
              <div className="publication-field"><span>Paper ID</span><strong>3856</strong></div>
              <div className="publication-field"><span>Authors</span><strong>Duc Manh Bui · Thanh Tien Cao · Lam Cao Nguyen</strong></div>
              <div className="publication-field"><span>Status</span><strong>Accepted for oral presentation and proceedings</strong></div>
              <p className="publication-disclaimer">As of October 2026, this is an acceptance announcement—not a published DOI record.</p>
            </aside>
          </div>
        </section>

        <section id="about" className="section-pad border-top">
          <div className="container split-section">
            <div className="section-label">01 / About</div>
            <div>
              <h2>I prefer understanding the security system, not just the individual tool.</h2>
              <p className="lead">
                My primary interests are SIEM, detection engineering, network security monitoring,
                endpoint telemetry, Linux security and incident-response automation. Through my graduation
                capstone, I gained hands-on experience integrating multiple defensive layers into one traceable workflow.
              </p>
            </div>
          </div>
        </section>

        <section className="section-pad border-top">
          <div className="container">
            <div className="section-heading-row">
              <div className="section-label">02 / What I Build</div>
              <p>Security work framed as an operational chain.</p>
            </div>
            <div className="pillar-grid">
              {buildPillars.map(([num, title, body]) => (
                <article className="pillar" key={title}>
                  <span>{num}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="section-pad border-top">
          <div className="container">
            <div className="section-heading-row">
              <div className="section-label">03 / Technical Skills</div>
              <p>Grouped by how I use them in defensive engineering.</p>
            </div>
            <div className="skills-grid">
              {skills.map((skill) => (
                <article className="skill-card" key={skill.title}>
                  <h3>{skill.title}</h3>
                  <p>{skill.body}</p>
                </article>
              ))}
            </div>
            <div className="tool-strip" aria-label="Tools">
              {[
                "Wazuh", "Suricata", "Shuffle", "NGINX", "nftables", "auditd", "Tailscale",
                "Python", "Bash", "Git/GitHub", "Docker", "VMware", "Ghidra", "x64dbg", "IDA"
              ].map((tool) => <span key={tool}>{tool}</span>)}
            </div>
          </div>
        </section>

        <section className="section-pad border-top featured-section">
          <div className="container">
            <div className="project-kicker">Featured Project · Graduation Capstone · Team of 2 · 2026</div>
            <div className="featured-grid">
              <div>
                <h2>Mini SOC for Enterprise Web & Endpoint Security</h2>
                <p className="lead">
                  A policy-controlled, multi-domain SOC research lab combining Wazuh SIEM, inline Suricata IPS, NGINX, nftables,
                  endpoint telemetry, Shuffle SOAR, restricted response APIs and supporting SDN/LLM research modules to build traceable
                  Detect → Analyze → Respond workflows.
                </p>
                <div className="role-box">
                  <span>My role</span>
                  <strong>SOC & Security Engineering</strong>
                  <p>
                    Responsible for the SOC/security-engineering portion: SIEM, gateway security,
                    inline IPS, detection rules, endpoint monitoring, SOAR workflows and restricted response APIs.
                    My teammate led the SDN implementation and core LLM work; I also supported LLM integration.
                  </p>
                </div>
                <Link className="text-link" href="/projects/mini-soc">Open full technical case study →</Link>
              </div>
              <div className="project-signal">
                <div className="signal-row"><span>PB-01</span><strong>Web Recon</strong><em>Detected → Contained</em></div>
                <div className="signal-row"><span>PB-02</span><strong>Web Exploit</strong><em>Prevented → Contained</em></div>
                <div className="signal-row"><span>PB-03</span><strong>Suspicious Shell</strong><em>Detected → Audit response</em></div>
                <div className="signal-row safe"><span>SAFE</span><strong>Protected Source</strong><em>Bypass verified</em></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad border-top">
          <div className="container credentials-grid">
            <div>
              <div className="section-label">04 / Education</div>
              <h3>HUFLIT</h3>
              <p>Bachelor of Science in Cybersecurity · 2023 — Present</p>
            </div>
            <div>
              <div className="section-label">05 / Credentials</div>
              <ul className="clean-list">
                <li>Google Network Security — 2026</li>
                <li>Network Traffic & Logs (IDS/SIEM) — Google, 2026</li>
                <li>Network Monitoring & Analysis — Google, 2026</li>
                <li>Linux System Administration — Udemy, 2026</li>
                <li>Nexus Security Competition — Participation Certificate, 2026</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="contact" className="section-pad border-top contact-section">
          <div className="container contact-grid">
            <div>
              <div className="section-label">06 / Contact</div>
              <h2>Interested in Blue Team, SOC, detection engineering and defensive infrastructure.</h2>
            </div>
            <div className="contact-actions">
              <a className="button primary" href="mailto:m134gold@gmail.com">m134gold@gmail.com</a>
              <a className="button secondary" href="https://github.com/CH3COOCH2CH2CH3" target="_blank" rel="noreferrer">GitHub profile</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
