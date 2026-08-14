import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Mạnh Đức — Blue Team / SOC Analyst",
    template: "%s — Mạnh Đức",
  },
  description:
    "Cybersecurity portfolio focused on Blue Team security, SOC operations, detection engineering, network defense, and controlled incident response automation.",
  keywords: [
    "Cybersecurity",
    "Blue Team",
    "SOC Analyst",
    "Wazuh",
    "Suricata",
    "Detection Engineering",
    "SOAR",
    "Linux Security",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
