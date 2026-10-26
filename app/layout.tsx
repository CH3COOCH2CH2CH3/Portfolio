import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Mạnh Đức — Blue Team / SOC Analyst",
    template: "%s — Mạnh Đức",
  },
  description:
    "Mạnh Đức’s Blue Team and SOC engineering portfolio, featuring a SoICT 2026 accepted research paper on policy-controlled multi-domain SOC security boundaries.",
  keywords: [
    "Cybersecurity",
    "Blue Team",
    "SOC Analyst",
    "Wazuh",
    "Suricata",
    "Detection Engineering",
    "SOAR",
    "Linux Security",
    "SoICT 2026",
    "Security Boundary Validation",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
