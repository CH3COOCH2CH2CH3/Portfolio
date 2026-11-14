"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function EvidenceImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <figure className="evidence-card reveal-item" data-spotlight>
        <button
          type="button"
          className="evidence-zoom-trigger"
          aria-label={`Inspect ${alt} in full view`}
          onClick={() => setOpen(true)}
        >
          <div className="evidence-image-wrap">
            <Image
              src={src}
              alt={alt}
              width={500}
              height={380}
              sizes="(max-width: 800px) 100vw, 50vw"
            />
          </div>
          <span className="evidence-zoom-pill" aria-hidden="true">
            Inspect ↗
          </span>
        </button>
        <figcaption>{caption}</figcaption>
      </figure>

      {open && (
        <div
          className="evidence-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
        >
          <div className="evidence-lightbox-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="evidence-lightbox-bar">
              <span>{caption}</span>
              <button
                type="button"
                className="evidence-lightbox-close"
                aria-label="Close image preview"
                onClick={() => setOpen(false)}
              >
                Close [ESC]
              </button>
            </div>
            <div className="evidence-lightbox-body">
              <Image
                src={src}
                alt={alt}
                width={1200}
                height={912}
                sizes="92vw"
              />
            </div>
          </div>
        </div>
      )}
    </>
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
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const payload = rows.map(([key, value]) => `${key}: ${value}`).join("\n");
    try {
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="terminal-card">
      <div className="terminal-topline">
        <span>{title}</span>
        <div className="terminal-actions">
          <button
            type="button"
            className="terminal-copy-btn"
            onClick={handleCopy}
            aria-label={`Copy ${title} excerpt`}
          >
            {copied ? "Copied" : "Copy"}
          </button>
          <span className={`status-dot ${status}`}>{status}</span>
        </div>
      </div>
      <div className="terminal-body">
        {rows.map(([key, value]) => (
          <div className="terminal-row" key={key}>
            <span>{key}</span>
            <code>{value}</code>
          </div>
        ))}
      </div>
      <div className="sanitized-note">
        Sanitized evidence excerpt — secrets and infrastructure addresses removed.
      </div>
    </div>
  );
}
