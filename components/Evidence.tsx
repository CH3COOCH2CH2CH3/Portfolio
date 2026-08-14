import Image from "next/image";

export function EvidenceImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="evidence-card">
      <div className="evidence-image-wrap">
        <Image src={src} alt={alt} width={500} height={380} sizes="(max-width: 800px) 100vw, 50vw" />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export function SanitizedOutput({
  title,
  rows,
  status = "verified",
}: {
  title: string;
  rows: Array<[string, string]>;
  status?: "verified" | "bounded" | "bypassed";
}) {
  return (
    <div className="terminal-card">
      <div className="terminal-topline">
        <span>{title}</span>
        <span className={`status-dot ${status}`}>{status}</span>
      </div>
      <div className="terminal-body">
        {rows.map(([key, value]) => (
          <div className="terminal-row" key={key}>
            <span>{key}</span>
            <code>{value}</code>
          </div>
        ))}
      </div>
      <div className="sanitized-note">Sanitized evidence excerpt — secrets and infrastructure addresses removed.</div>
    </div>
  );
}
