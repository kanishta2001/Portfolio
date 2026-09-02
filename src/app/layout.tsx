import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "lenis/dist/lenis.css";
import { SmoothScroll } from "@/components/portfolio/smooth-scroll";
import { Component as SpotlightCursor } from "@/components/ui/spotlight-cursor";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

// Vercel provides its production domain automatically; localhost is only used during local development.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Nipun Karunarathna — Full-Stack Web Developer",
  description:
    "Portfolio of Nipun Karunarathna, a Software Engineering undergraduate building web applications with React, Next.js, C#, .NET, and SQL Server.",
  authors: [{ name: "Nipun Karunarathna" }],
  openGraph: {
    title: "Nipun Karunarathna — Full-Stack Web Developer",
    description:
      "Software Engineering undergraduate building modern full-stack web applications.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Nipun Karunarathna — Full-Stack Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nipun Karunarathna — Full-Stack Web Developer",
    description:
      "Software Engineering undergraduate building modern full-stack web applications.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
        <SpotlightCursor
          config={{
            radius: 260,
            brightness: 0.09,
            color: "#69627b",
            smoothing: 0.11,
          }}
        />
        <SpeedInsights />
      </body>
    </html>
  );
}
