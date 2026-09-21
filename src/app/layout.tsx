import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

// Two proper typefaces instead of the system-default Georgia/Arial stack —
// this is most of what separates a "premium" page from a generic one.
// Playfair Display is an editorial serif (the elegant, high-contrast look
// used in fashion/hospitality branding) for headlines; Inter is a refined
// grotesk for body copy and UI text. Both load once, at build time, via
// next/font (no runtime request, no layout shift).
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "mAItrymoon — From Honeymoon to Companionship",
    template: "%s | mAItrymoon",
  },
  description:
    "mAItrymoon is an AI-powered Relationship Counsellor — from honeymoon to companionship. Talk through relationship situations, understand different perspectives, and find greater clarity — on the website or WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${playfairDisplay.variable} ${inter.variable} font-sans antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
