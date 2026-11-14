import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { MotionEffects } from "@/components/MotionEffects";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "vietnamese"],
  variable: "--font-mono",
  display: "swap",
});

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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <MotionEffects />
        {children}
      </body>
    </html>
  );
}
