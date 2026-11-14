import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";

const buildPillars = [
  [
    "01",
    "OBSERVE",
    "Detect",
    "Build detections from web, network, application and endpoint telemetry.",
  ],
  [
    "02",
    "CORRELATE",
    "Analyze",
    "Normalize and correlate evidence instead of treating single events as incidents.",
  ],
  [
    "03",
    "ORCHESTRATE",
    "Automate",
    "Route high-confidence alerts through SOAR and controlled response policies.",
  ],
  [
    "04",
    "ENFORCE",
    "Contain",
    "Apply time-bounded network containment and auditable endpoint response.",
  ],
] as const;

const tools = [
  "Wazuh",
  "Suricata",
  "Shuffle",
  "NGINX",
  "nftables",
  "auditd",
  "Tailscale",
  "Python",
  "Bash",
  "Git/GitHub",
  "Docker",
  "VMware",
  "Ghidra",
  "x64dbg",
  "IDA",
] as const;

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main">
        {/* HERO SECTION WITH 3D CONSTRUCT STAGE */}
        <section id="top" className="ks-hero" aria-labelledby="hero-title">
          <div aria-hidden="true" className="ks-hero-halo" />
          <div className="container ks-hero-grid">
            <div className="ks-hero-copy">
              <div className="ks-kicker">
                <span className="ks-kicker-dot" /> FINAL-YEAR CYBERSECURITY STUDENT{" "}
                <span className="ks-kicker-index">/ BLUE TEAM · SOC</span>
              </div>
              <h1 id="hero-title">
                DEFEND
                <br />
                <em>BEYOND</em>
                <br />
                THE ALERT<span className="ks-dot">.</span>
              </h1>
              <div className="ks-hero-lead">
                <span className="ks-lead-bar" />
                <p>
                  I am Mạnh Đức, a Cybersecurity student at HUFLIT building Blue Team systems around{" "}
                  <strong style={{ color: "#f4f8ff" }}>
                    detection, evidence, and controlled response
                  </strong>{" "}
                  across SIEM, inline IPS, Linux telemetry, and SOAR automation.
                </p>
              </div>
              <div className="ks-hero-actions">
                <Link className="ks-cta ks-cta--filled" data-magnetic href="/projects/mini-soc">
                  View featured case study
                  <svg
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.7"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </Link>
                <a
                  className="ks-cta ks-cta--quiet"
                  data-magnetic
                  href="https://github.com/CH3COOCH2CH2CH3/mini-soc-enterprise-web-lab"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub repository
                  <svg
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.7"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14m-6-6 6 6-6 6" />
                  </svg>
                </a>
              </div>
              <div className="ks-hero-bottom">
                <span>EVIDENCE-FIRST</span>
                <span className="ks-cross">×</span>
                <span>POLICY-CONTROLLED</span>
                <span className="ks-cross">×</span>
                <span>SOICT 2026 · ACCEPTED PAPER</span>
              </div>
            </div>

            {/* 3D MULTI-PLANE PARALLAX HERO STAGE */}
            <div
              aria-label="3D Blue Team telemetry construct and active security focus"
              className="ks-hero-stage"
            >
              <div className="ks-stage-grid" data-depth="-0.35" />
              <div className="ks-stage-ambient" data-depth="-0.2" />
              <div className="ks-hero-loop ks-hero-loop--outer" data-depth="0.25" />
              <div className="ks-hero-loop ks-hero-loop--inner" data-depth="-0.45" />

              <div className="ks-mark-float">
                <div className="ks-mark-construct" data-hero-tilt>
                  <div aria-hidden="true" className="ks-core-blueprint">
                    <span className="ks-core-ring" />
                    <span className="ks-core-axis ks-core-axis--h" />
                    <span className="ks-core-axis ks-core-axis--v" />
                    <span className="ks-core-node" />
                  </div>
                  <div className="ks-mark-construct-inner">
                    <svg
                      aria-label="Mạnh Đức Cyber Shield splitting into dual defense layers"
                      className="ks-motion-logo"
                      role="img"
                      viewBox="0 0 96 96"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient id="md-motion-gradient" x1="0" x2="1" y1="0" y2="1">
                          <stop stopColor="#63d5ff" />
                          <stop offset="0.55" stopColor="#78dfad" />
                          <stop offset="1" stopColor="#dff9ff" />
                        </linearGradient>
                        <linearGradient id="md-edge-stroke" x1="0" x2="1" y1="1" y2="0">
                          <stop stopColor="#ffffff" stopOpacity="0.8" />
                          <stop offset="1" stopColor="#63d5ff" stopOpacity="0.2" />
                        </linearGradient>
                      </defs>
                      <g
                        className="ks-motion-piece"
                        data-motion-piece="top"
                        fill="url(#md-motion-gradient)"
                        stroke="url(#md-edge-stroke)"
                        strokeWidth="0.8"
                      >
                        <path d="M48 12L18 25V47C18 53 20 59 23 64L48 39L66 57C69 52 70 47 70 41V22L48 12Z" />
                      </g>
                      <g
                        className="ks-motion-piece"
                        data-motion-piece="bottom"
                        fill="url(#md-motion-gradient)"
                        stroke="url(#md-edge-stroke)"
                        strokeWidth="0.8"
                      >
                        <path d="M48 47L27 68C33 76 40 81 48 85C59 80 68 71 73 59L58 44L48 54V47Z" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>

              <span className="ks-stage-tag ks-stage-tag--top">
                MD // SOC-01 · AUTONOMOUS 3D STAGE
              </span>
              <span className="ks-stage-tag ks-stage-tag--bottom">
                DETECT → ANALYZE → RESPOND <b>↘</b>
              </span>

              <div className="ks-floating ks-floating--a" data-depth="0.65">
                <i />
                <span>SIEM &amp; INLINE IPS</span>
                <b>Wazuh + Suricata NFQUEUE</b>
              </div>
              <div className="ks-floating ks-floating--b" data-depth="0.85">
                <i />
                <span>SAFE AUTOMATION</span>
                <b>Shuffle SOAR → TTL Block</b>
              </div>
              <div className="ks-stage-cross ks-stage-cross--one" data-depth="0.4">
                +
              </div>
              <div className="ks-stage-cross ks-stage-cross--two" data-depth="-0.4">
                +
              </div>
            </div>
          </div>

          <div className="container ks-hero-rail">
            <span>SECURITY_FOCUS.YML · EVIDENCE_BEFORE_ACTION</span>
            <span className="ks-rail-line" />
            <a href="#about">SCROLL TO EXPLORE ↓</a>
          </div>
        </section>

        {/* INFINITE MARQUEE TICKER */}
        <div aria-label="Core defensive domains" className="ks-ticker">
          <div className="ks-ticker-track">
            <span>WAZUH SIEM / XDR</span>
            <b>✦</b>
            <span>SURICATA INLINE IPS</span>
            <b>✦</b>
            <span>DETECTION ENGINEERING</span>
            <b>✦</b>
            <span>SHUFFLE SOAR AUTOMATION</span>
            <b>✦</b>
            <span>NFTABLES &amp; NFQUEUE</span>
            <b>✦</b>
            <span>LINUX AUDITD &amp; FIM</span>
            <b>✦</b>
            <span aria-hidden="true">WAZUH SIEM / XDR</span>
            <b aria-hidden="true">✦</b>
            <span aria-hidden="true">SURICATA INLINE IPS</span>
            <b aria-hidden="true">✦</b>
            <span aria-hidden="true">DETECTION ENGINEERING</span>
            <b aria-hidden="true">✦</b>
            <span aria-hidden="true">SHUFFLE SOAR AUTOMATION</span>
            <b aria-hidden="true">✦</b>
            <span aria-hidden="true">NFTABLES &amp; NFQUEUE</span>
            <b aria-hidden="true">✦</b>
            <span aria-hidden="true">LINUX AUDITD &amp; FIM</span>
            <b aria-hidden="true">✦</b>
          </div>
        </div>

        {/* 01 / ABOUT WITH INTERACTIVE 3D GEODESIC NETWORK SPHERE */}
        <section id="about" className="ks-section ks-about">
          <div className="container ks-about-grid">
            <div aria-hidden="true" className="ks-about-art ks-inview" data-spotlight>
              <div className="ks-about-art-noise" />
              <canvas className="ks-geodesic-canvas" data-geodesic="about" />
              <div className="ks-about-logo-frame">
                <div className="ks-yaml-mini">
                  <div className="ks-yaml-head">
                    <span>security_focus.yml</span>
                    <b>ACTIVE</b>
                  </div>
                  <div className="ks-yaml-rows">
                    <div>
                      <span>path:</span> blue_team / soc
                    </div>
                    <div>
                      <span>telemetry:</span> net + web + host
                    </div>
                    <div>
                      <span>siem:</span> wazuh
                    </div>
                    <div>
                      <span>ips:</span> suricata_inline
                    </div>
                    <div>
                      <span>policy:</span> evidence_first
                    </div>
                  </div>
                </div>
              </div>
              <span className="ks-about-art-top">DEFENSE IN DEPTH // 3D MESH</span>
              <span className="ks-about-art-bottom">MD — SOC / 2026</span>
            </div>

            <div className="ks-about-copy ks-inview">
              <span className="ks-meta">
                <span>01 /</span> ABOUT &amp; PHILOSOPHY
              </span>
              <h2>
                Understanding the{" "}
                <span>complete security system</span>, not just isolated tools.
              </h2>
              <p>
                My primary interests are SIEM, detection engineering, network security monitoring,
                endpoint telemetry, Linux security, and incident-response automation.
              </p>
              <p>
                Through my graduation capstone at HUFLIT, I gained hands-on experience integrating
                multiple defensive layers—from inline packet inspection to SIEM correlation and
                policy-guarded SOAR containment—into one traceable, verifiable workflow.
              </p>
              <div className="ks-about-links">
                <Link href="/projects/mini-soc">
                  Mini SOC Case Study
                  <svg
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.7"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </Link>
                <a
                  href="https://github.com/CH3COOCH2CH2CH3"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub · CH3COOCH2CH2CH3
                  <svg
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.7"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 02 / WHAT I BUILD (OPERATIONAL CHAIN) */}
        <section id="pillars" className="ks-section ks-approach">
          <div className="container">
            <div className="ks-section-top">
              <span className="ks-meta">
                <span>02 /</span> WHAT I BUILD
              </span>
              <span className="ks-meta-right">OPERATIONAL CHAIN &nbsp; ↗</span>
            </div>
            <div className="ks-approach-layout">
              <div className="ks-approach-intro ks-inview">
                <h2>
                  Security framed as an <span>auditable chain.</span>
                </h2>
                <p>
                  Raw alerts do not justify blind containment. Every step from packet and syscall
                  collection to policy enforcement is designed to preserve context and verify
                  outcomes.
                </p>
                <div className="ks-approach-seal">
                  <span className="ks-seal-badge">SOC</span>
                  <span>
                    DETECT CLEARLY
                    <br />
                    CONTAIN SAFELY
                  </span>
                </div>
              </div>

              <div className="ks-steps">
                {buildPillars.map(([num, phase, title, body]) => (
                  <article className="ks-step ks-inview" data-spotlight key={num}>
                    <span className="ks-step-n">{num}</span>
                    <div>
                      <span>{phase}</span>
                      <h3>{title}</h3>
                      <p>{body}</p>
                    </div>
                    <span className="ks-step-symbol">↗</span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 03 / TECHNICAL SKILLS — 12-COLUMN 3D HOLOGRAPHIC BENTO GRID */}
        <section id="skills" className="ks-section ks-services">
          <div className="container">
            <div className="ks-section-top">
              <span className="ks-meta">
                <span>03 /</span> TECHNICAL SKILLS
              </span>
              <span className="ks-meta-right">DEFENSIVE ENGINEERING &nbsp; ↗</span>
            </div>
            <div className="ks-title-row ks-inview">
              <h2>
                Grouped by how they work{" "}
                <span>inside a live SOC.</span>
              </h2>
              <p>
                Four interconnected domains combining SIEM visibility, high-signal correlation rules,
                Linux gateway hardening, and bounded response automation.
              </p>
            </div>

            <div className="ks-bento">
              {/* 01 Security Operations (span 7) with 3D SIEM Dashboard Diorama */}
              <article
                className="ks-bento-item ks-bento-item--software ks-inview"
                data-spotlight
              >
                <div className="ks-bento-copy">
                  <div className="ks-bento-serial">
                    01 / SECURITY OPERATIONS <span>↗</span>
                  </div>
                  <h3>
                    Wazuh SIEM/XDR &amp;
                    <br />
                    Endpoint Telemetry.
                  </h3>
                  <p>
                    Wazuh SIEM/XDR, alert analysis, multi-source log ingestion, File Integrity
                    Monitoring (FIM), auditd execution tracking, and verified Active Response.
                  </p>
                  <div className="ks-chips">
                    <span>Wazuh SIEM</span>
                    <span>FIM &amp; auditd</span>
                    <span>Active Response</span>
                  </div>
                </div>

                <div
                  aria-hidden="true"
                  className="ks-screen ks-screen--dashboard"
                >
                  <div className="ks-screen-top">
                    <span className="ks-screen-dot" />
                    <span className="ks-screen-dot" />
                    <span className="ks-screen-dot" />
                    <span>WAZUH // TELEMETRY STREAM</span>
                  </div>
                  <div className="ks-dashboard-layout">
                    <div className="ks-dashboard-nav">
                      <i />
                      <i />
                      <i />
                      <i />
                    </div>
                    <div className="ks-dashboard-content">
                      <div className="ks-dashboard-title">
                        <b>SIEM Correlation</b>
                        <small>AGENT 008 · ONLINE</small>
                      </div>
                      <div className="ks-dashboard-metrics">
                        <i />
                        <i />
                        <i />
                      </div>
                      <div className="ks-dashboard-chart">
                        <svg preserveAspectRatio="none" viewBox="0 0 300 116">
                          <defs>
                            <linearGradient id="md-chart-fill" x1="0" x2="0" y1="0" y2="1">
                              <stop stopColor="#63d5ff" stopOpacity=".4" />
                              <stop offset="1" stopColor="#63d5ff" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="md-chart-pulse" x1="0" x2="1" y1="0" y2="0">
                              <stop offset="0%" stopColor="#63d5ff" stopOpacity=".2" />
                              <stop offset="50%" stopColor="#78dfad" stopOpacity="1" />
                              <stop offset="100%" stopColor="#ffffff" stopOpacity=".95" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M0 97 C35 85 41 95 66 63 S113 82 149 53 S209 66 232 28 S266 43 300 10 L300 116 L0 116Z"
                            fill="url(#md-chart-fill)"
                          />
                          <path
                            d="M0 97 C35 85 41 95 66 63 S113 82 149 53 S209 66 232 28 S266 43 300 10"
                            fill="none"
                            stroke="#38bdf8"
                            strokeWidth="2.2"
                          />
                          <path
                            className="ks-chart-pulse"
                            d="M0 97 C35 85 41 95 66 63 S113 82 149 53 S209 66 232 28 S266 43 300 10"
                            fill="none"
                            stroke="url(#md-chart-pulse)"
                            strokeLinecap="round"
                            strokeWidth="3"
                          />
                        </svg>
                      </div>
                      <div className="ks-dashboard-table">
                        <i />
                        <i />
                        <i />
                      </div>
                    </div>
                  </div>
                </div>
                <span className="ks-design-note">RULES 110152 · 110160 · 110120</span>
              </article>

              {/* 02 Detection Engineering (span 5) with 3D Rule Matrix Window */}
              <article className="ks-bento-item ks-bento-item--web ks-inview" data-spotlight>
                <div className="ks-bento-serial">
                  02 / DETECTION ENGINEERING <span>↗</span>
                </div>
                <div aria-hidden="true" className="ks-web-visual">
                  <div className="ks-web-browser">
                    <div className="ks-browser-dots">
                      ••• <span>rules / mitre_att&amp;ck.xml</span>
                    </div>
                    <div className="ks-browser-hero">
                      <span>SIGNAL × CONTEXT</span>
                      <div className="ks-browser-shape" />
                      <div className="ks-browser-lines">
                        <i />
                        <i />
                      </div>
                    </div>
                  </div>
                </div>
                <h3>
                  Custom Rules &amp;
                  <br />
                  Correlation Logic.
                </h3>
                <p>
                  Custom Wazuh rules, Suricata IPS signatures, frequency thresholds, high-confidence
                  SOAR allowlists, and MITRE ATT&amp;CK mapping.
                </p>
                <div className="ks-chips">
                  <span>Wazuh XML</span>
                  <span>Suricata Signatures</span>
                  <span>MITRE ATT&amp;CK</span>
                </div>
              </article>

              {/* 03 Security Infrastructure (span 6) with Animated Packet Diamond */}
              <article
                className="ks-bento-item ks-bento-item--architecture ks-inview"
                data-spotlight
              >
                <div className="ks-bento-serial">
                  03 / SECURITY INFRASTRUCTURE <span>↗</span>
                </div>
                <div aria-hidden="true" className="ks-arch-visual">
                  <svg viewBox="0 0 470 235" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="md-archstroke" x1="0" x2="1" y1="0" y2="1">
                        <stop stopColor="#d8f6ff" />
                        <stop offset="1" stopColor="#38bdf8" />
                      </linearGradient>
                      <linearGradient id="md-archpulse" x1="0" x2="1" y1="0" y2="0">
                        <stop stopColor="#78dfad" />
                        <stop offset="1" stopColor="#63d5ff" />
                      </linearGradient>
                    </defs>
                    <g fill="none" stroke="#334e68" strokeDasharray="5 7" strokeWidth="1.5">
                      <path d="M110 118H360" />
                      <path d="M235 38V193" />
                      <path d="M110 118L235 38 360 118 235 193Z" />
                    </g>
                    <g
                      className="ks-arch-flow"
                      fill="none"
                      stroke="url(#md-archpulse)"
                      strokeLinecap="round"
                      strokeWidth="2.2"
                    >
                      <path d="M110 118L235 38 360 118 235 193Z" />
                      <path d="M110 118H360" />
                    </g>
                    <g
                      className="ks-arch-nodes"
                      fill="#0f1928"
                      stroke="url(#md-archstroke)"
                      strokeWidth="2"
                    >
                      <rect height="54" rx="12" width="94" x="63" y="91" />
                      <rect height="54" rx="12" width="94" x="188" y="12" />
                      <rect height="54" rx="12" width="94" x="313" y="91" />
                      <rect height="54" rx="12" width="94" x="188" y="166" />
                    </g>
                    <g
                      fill="#e6f6ff"
                      fontFamily="var(--font-mono)"
                      fontSize="10"
                      fontWeight="700"
                      letterSpacing="1.6"
                      textAnchor="middle"
                    >
                      <text x="110" y="122">
                        NFTABLES
                      </text>
                      <text x="235" y="43">
                        SURICATA
                      </text>
                      <text x="360" y="122">
                        NGINX TLS
                      </text>
                      <text x="235" y="197">
                        TAILSCALE
                      </text>
                    </g>
                    <g className="ks-arch-dots" fill="#78dfad">
                      <circle cx="110" cy="118" r="3.5" />
                      <circle cx="235" cy="38" r="3.5" />
                      <circle cx="360" cy="118" r="3.5" />
                      <circle cx="235" cy="193" r="3.5" />
                    </g>
                  </svg>
                </div>
                <h3>
                  Gateway Defense &amp;
                  <br />
                  Linux Hardening.
                </h3>
                <p>
                  Linux, NGINX reverse proxy, nftables, NFQUEUE inline packet queuing, Tailscale mesh,
                  Docker isolation, and strict service exposure controls.
                </p>
                <div className="ks-chips">
                  <span>Linux &amp; NGINX</span>
                  <span>nftables / NFQUEUE</span>
                  <span>Docker &amp; Tailscale</span>
                </div>
              </article>

              {/* 04 Automation & Development (span 6) with Live SOAR Scanner */}
              <article
                className="ks-bento-item ks-bento-item--security ks-inview"
                data-spotlight
              >
                <div className="ks-bento-serial">
                  04 / AUTOMATION &amp; DEVELOPMENT <span>↗</span>
                </div>
                <div aria-hidden="true" className="ks-security-visual">
                  <div className="ks-security-head">
                    <span className="ks-online-dot" /> SOAR POLICY PIPELINE{" "}
                    <small>SHUFFLE // RESTRICTED API</small>
                  </div>
                  <div className="ks-event-row">
                    <span>01</span>
                    <i className="ks-event-bar ks-event-bar--1" />
                    <b>ALLOWLIST</b>
                  </div>
                  <div className="ks-event-row">
                    <span>02</span>
                    <i className="ks-event-bar ks-event-bar--2" />
                    <b>VALIDATE</b>
                  </div>
                  <div className="ks-event-row">
                    <span>03</span>
                    <i className="ks-event-bar ks-event-bar--3" />
                    <b>TTL BLOCK</b>
                  </div>
                </div>
                <h3>
                  SOAR Workflows &amp;
                  <br />
                  Restricted Response APIs.
                </h3>
                <p>
                  Python, Bash, REST APIs, JSON telemetry processing, Shuffle SOAR playbooks,
                  protected-source guardrails, and evidence-safe automation.
                </p>
                <div className="ks-chips">
                  <span>Python &amp; Bash</span>
                  <span>Shuffle SOAR</span>
                  <span>Restricted APIs</span>
                </div>
              </article>
            </div>

            <div className="ks-tool-belt ks-inview" aria-label="Full tool stack">
              {tools.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </div>
        </section>

        {/* STATEMENT BANNER */}
        <section aria-label="Engineering principle" className="ks-statement">
          <div className="container ks-statement-inner ks-inview">
            <span>CORE DOCTRINE</span>
            <p>
              Detect with <em>context.</em>
              <br />
              Respond with <em>boundaries.</em>
            </p>
            <div className="ks-statement-mark" aria-hidden="true">
              MD
            </div>
          </div>
        </section>

        {/* 04 / RESEARCH — SOICT 2026 ACCEPTED PAPER */}
        <section id="research" className="ks-section ks-research">
          <div className="container research-grid ks-inview">
            <div>
              <span className="ks-meta">
                <span>04 /</span> RESEARCH &amp; ACCEPTED PAPER
              </span>
              <div className="research-status">
                <i className="ks-status-dot" /> SoICT 2026 · Accepted · Oral presentation
              </div>
              <h2>
                A Policy-Controlled Multi-Domain SOC: Architecture and Evidence-Based{" "}
                <span>Security-Boundary Validation</span>
              </h2>
              <p className="lead">
                Accepted on 18 October 2026 for an oral presentation and inclusion in the SoICT
                2026 proceedings. The research examines security boundaries in a policy-controlled,
                multi-domain SOC. Acceptance is confirmed; publication, DOI and a proceedings link
                are not yet claimed.
              </p>
              <Link className="ks-cta ks-cta--quiet" data-magnetic href="/projects/mini-soc#publication">
                Research context and implementation scope
                <svg
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.7"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </Link>
            </div>
            <aside className="publication-panel" data-spotlight aria-label="Accepted paper details">
              <span className="publication-panel-eyebrow">Publication record</span>
              <div className="publication-field">
                <span>Venue</span>
                <strong>SoICT 2026</strong>
              </div>
              <div className="publication-field">
                <span>Paper ID</span>
                <strong>3856</strong>
              </div>
              <div className="publication-field">
                <span>Authors</span>
                <strong>Duc Manh Bui · Thanh Tien Cao · Lam Cao Nguyen</strong>
              </div>
              <div className="publication-field">
                <span>Status</span>
                <strong>Accepted for oral presentation and proceedings</strong>
              </div>
              <p className="publication-disclaimer">
                As of October 2026, this is an acceptance announcement—not a published DOI record.
              </p>
            </aside>
          </div>
        </section>

        {/* 05 / FEATURED PROJECT — MINI SOC CAPSTONE SHOWCASE */}
        <section id="featured" className="ks-section ks-work">
          <div className="container">
            <div className="ks-section-top">
              <span className="ks-meta">
                <span>05 /</span> FEATURED CASE STUDY
              </span>
              <span className="ks-meta-right">GRADUATION CAPSTONE · 2026 &nbsp; ↗</span>
            </div>
            <div className="ks-title-row ks-inview">
              <h2>
                End-to-end <span>Detect → Analyze → Respond</span> lab.
              </h2>
              <p>
                A two-person graduation capstone with explicit ownership boundaries and sanitized
                enforcement evidence.
              </p>
            </div>

            <div className="ks-work-feature ks-work-feature--soc ks-inview" data-spotlight>
              <div className="ks-work-copy">
                <div className="ks-work-topline">
                  <span>CAPSTONE · TEAM OF 2 · SOICT 2026</span>
                  <span className="ks-status ks-status--mint">
                    <i /> VALIDATED IN LAB SCOPE
                  </span>
                </div>
                <div className="ks-venue">
                  MINI <strong>SOC</strong>
                </div>
                <h3>
                  Enterprise Web &amp;
                  <br />
                  Endpoint Security
                </h3>
                <p>
                  A policy-controlled, multi-domain SOC research lab combining Wazuh SIEM, inline
                  Suricata IPS via NFQUEUE, NGINX, nftables, auditd endpoint telemetry, Shuffle
                  SOAR, restricted Gateway Block APIs, and supporting SDN/LLM research modules.
                </p>
                <div className="ks-paper-metadata">
                  <span>PB-01 Web Recon</span>
                  <span>PB-02 Inline IPS</span>
                  <span>PB-03 Shell Audit</span>
                  <span>SAFE Protected Bypass</span>
                </div>
                <div className="ks-disclosure">
                  <strong>My Role (SOC &amp; Security Engineering):</strong> SIEM, gateway defense,
                  inline IPS, custom detection rules, endpoint monitoring, SOAR workflows, response
                  APIs, safe-automation policy, and scenario-scoped validation. SDN and core LLM
                  development were teammate-led; I also supported LLM integration.
                </div>
                <Link className="ks-cta ks-cta--filled" data-magnetic href="/projects/mini-soc">
                  Open full technical case study
                  <svg
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.7"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </Link>
              </div>

              <div
                aria-label="Multi-domain SOC defense architecture diagram"
                className="ks-work-art ks-work-art--soc"
                role="img"
              >
                <div className="ks-art-label">MINI SOC // MULTI-LAYER DEFENSE TOPOLOGY</div>
                <svg aria-hidden="true" viewBox="0 0 600 440" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="md-socline" x1="0" x2="1" y1="0" y2="1">
                      <stop stopColor="#63d5ff" />
                      <stop offset="1" stopColor="#78dfad" />
                    </linearGradient>
                    <radialGradient id="md-socglow">
                      <stop stopColor="#38bdf8" stopOpacity=".38" />
                      <stop offset="1" stopColor="#38bdf8" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle cx="300" cy="200" fill="url(#md-socglow)" r="190" />
                  <circle
                    className="ks-soc-pulse-ring"
                    cx="300"
                    cy="200"
                    fill="none"
                    r="92"
                    stroke="url(#md-socline)"
                    strokeOpacity=".38"
                    strokeWidth="1.2"
                  />
                  <circle
                    className="ks-soc-pulse-ring ks-soc-pulse-ring--2"
                    cx="300"
                    cy="200"
                    fill="none"
                    r="136"
                    stroke="url(#md-socline)"
                    strokeOpacity=".22"
                    strokeWidth="1"
                  />
                  <g fill="none" stroke="#334e68" strokeDasharray="4 8" strokeWidth="1.4">
                    <path d="M130 110L300 200 468 100 M130 310L300 200 468 318 M130 110V310M468 100V318" />
                    <path d="M130 110L468 318M130 310L468 100" />
                  </g>
                  <g
                    className="ks-soc-flow"
                    fill="none"
                    stroke="url(#md-socline)"
                    strokeLinecap="round"
                    strokeWidth="2.4"
                  >
                    <path d="M130 110L300 200L468 100" />
                    <path d="M130 310L300 200L468 318" />
                  </g>
                  <g
                    className="ks-soc-boxes"
                    fill="#0e1726"
                    stroke="url(#md-socline)"
                    strokeWidth="2"
                  >
                    <rect height="99" rx="15" width="142" x="229" y="151" />
                    <rect height="66" rx="12" width="148" x="55" y="74" />
                    <rect height="66" rx="12" width="148" x="394" y="64" />
                    <rect height="66" rx="12" width="148" x="55" y="273" />
                    <rect height="66" rx="12" width="148" x="394" y="283" />
                  </g>
                  <g
                    fill="#eef6ff"
                    fontFamily="var(--font-mono)"
                    fontSize="11.5"
                    fontWeight="700"
                    letterSpacing="1.4"
                    textAnchor="middle"
                  >
                    <text x="300" y="193">
                      WAZUH SIEM
                    </text>
                    <text fill="#78dfad" x="300" y="213">
                      SHUFFLE SOAR
                    </text>
                    <text x="129" y="112">
                      SURICATA IPS
                    </text>
                    <text x="468" y="102">
                      GATEWAY TTL
                    </text>
                    <text x="129" y="311">
                      AUDITD + FIM
                    </text>
                    <text x="468" y="321">
                      ACTIVE RESP
                    </text>
                  </g>
                  <g className="ks-soc-nodes" fill="#78dfad">
                    <circle cx="130" cy="110" r="4.5" />
                    <circle cx="468" cy="100" r="4.5" />
                    <circle cx="130" cy="310" r="4.5" />
                    <circle cx="468" cy="318" r="4.5" />
                  </g>
                </svg>
                <div className="ks-art-bottom">
                  <span>PB-01 RECON</span>
                  <span>PB-02 EXPLOIT</span>
                  <span>PB-03 SHELL AUDIT</span>
                </div>
              </div>
            </div>

            {/* Education & Credentials Row */}
            <div className="ks-cred-bento ks-inview">
              <article className="ks-cred-card" data-spotlight>
                <span className="ks-meta">05 / EDUCATION</span>
                <h3>HUFLIT</h3>
                <p>Bachelor of Science in Cybersecurity · 2023 — Present</p>
                <div className="ks-chips">
                  <span>Network Defense</span>
                  <span>SOC Operations</span>
                  <span>Linux Security</span>
                </div>
              </article>

              <article className="ks-cred-card ks-cred-card--wide" data-spotlight>
                <span className="ks-meta">06 / CREDENTIALS &amp; CERTIFICATES</span>
                <ul className="ks-cred-list">
                  <li>
                    <strong>Google Network Security</strong> <span>2026</span>
                  </li>
                  <li>
                    <strong>Network Traffic &amp; Logs (IDS/SIEM)</strong> <span>Google · 2026</span>
                  </li>
                  <li>
                    <strong>Network Monitoring &amp; Analysis</strong> <span>Google · 2026</span>
                  </li>
                  <li>
                    <strong>Linux System Administration</strong> <span>Udemy · 2026</span>
                  </li>
                  <li>
                    <strong>Nexus Security Competition</strong>{" "}
                    <span>Participation Certificate · 2026</span>
                  </li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* 05 / CONTACT WITH 3D GEODESIC SPHERE */}
        <section id="contact" className="ks-section ks-contact">
          <div className="container ks-contact-wrap ks-inview" data-spotlight>
            <div aria-hidden="true" className="ks-contact-graphic">
              <div className="ks-contact-orbit ks-contact-orbit--a" />
              <div className="ks-contact-orbit ks-contact-orbit--b" />
              <canvas className="ks-geodesic-canvas" data-geodesic="contact" />
            </div>
            <div className="ks-contact-content">
              <span className="ks-meta">
                <span>07 /</span> DIRECT CHANNEL
              </span>
              <h2>
                Ready for{" "}
                <em>Blue Team &amp; SOC</em>
                <br />
                engineering roles<span className="ks-dot">.</span>
              </h2>
              <p>
                Interested in SOC Analyst, Detection Engineering, Network Defense, and Defensive
                Infrastructure opportunities.
              </p>
              <div className="ks-hero-actions">
                <a
                  className="ks-contact-mainlink"
                  data-magnetic
                  href="mailto:m134gold@gmail.com"
                >
                  m134gold@gmail.com
                  <svg
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.7"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </a>
                <a
                  className="ks-cta ks-cta--quiet"
                  data-magnetic
                  href="https://github.com/CH3COOCH2CH2CH3"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub profile ↗
                </a>
              </div>
              <div className="ks-contact-divider" />
              <div className="ks-contact-details">
                <div>
                  <span>CANDIDATE</span>
                  <strong>Mạnh Đức</strong>
                </div>
                <div>
                  <span>EMAIL</span>
                  <a href="mailto:m134gold@gmail.com">m134gold@gmail.com</a>
                </div>
                <div>
                  <span>GITHUB</span>
                  <a
                    href="https://github.com/CH3COOCH2CH2CH3"
                    target="_blank"
                    rel="noreferrer"
                  >
                    github.com/CH3COOCH2CH2CH3
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
