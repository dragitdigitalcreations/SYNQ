import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const BASE_URL = "https://synq.io";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "SYNQ — Influencer Deal Management for Indian Brands & Creators",
    template: "%s | SYNQ",
  },
  description:
    "SYNQ helps Indian D2C brands and content creators run influencer deals end-to-end — brief, contract, delivery, and payment — in one structured workspace. No DMs. No spreadsheets. No chasing.",
  keywords: [
    "influencer marketing platform India",
    "brand creator collaboration",
    "influencer deal management",
    "creator economy India",
    "paid brand deals creators",
    "influencer campaign management",
    "escrow payments creators",
    "D2C influencer marketing",
  ],
  authors: [{ name: "SYNQ" }],
  creator: "SYNQ",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "SYNQ",
    title: "SYNQ — Influencer Deal Management for Indian Brands & Creators",
    description:
      "Brief, contract, deliver, pay — one workspace. Indian brands and creators close deals faster with structured briefs, signed contracts, and escrow-protected payments.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SYNQ — Influencer deal management platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SYNQ — Influencer Deal Management for Indian Brands & Creators",
    description:
      "Brief, contract, deliver, pay — one workspace. No DMs. No spreadsheets. No chasing payments.",
    images: ["/og-image.png"],
    creator: "@synqio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
