import type { Metadata } from "next";
import "./globals.css";
import { geistSans, playfairDisplay } from "./font";
import InAppBrowserWarning from "@/components/ui/InAppBrowserWarning";

export const metadata: Metadata = {
  metadataBase: new URL("https://affinote.site"),

  title: {
    default: "Affinote — Create Cute & Shareable Pages for Your Loved Ones",
    template: "%s | Affinote",
  },
  icons: {
    icon: "/favicon.ico",
  },

  description:
    "Affinote lets you create cute, animated lovely mini websites, appreciation pages, apology letters, and memory timelines. Customize, pay once, and share forever with a unique link.",

  keywords: [
    "affinote",
    "cute love notes",
    "animated love letters",
    "appreciation page for friend",
    "online love letter",
    "romantic templates",
    "memory timeline website",
    "custom love page",
    "shareable love notes",
    "gen z gift ideas",
  ],

  authors: [{ name: "Affinote" }],
  creator: "Affinote",

  openGraph: {
    title: "Affinote — Cute Animated Pages for Your Loved Ones",
    description:
      "Create beautiful animated love Templates, apology letters, and appreciation pages. Pay once and share forever.",
    url: "https://affinote.site",
    siteName: "Affinote",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Affinote preview",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Affinote — Cute Animated Templates",
    description:
      "Create animated love notes, apology letters & appreciation pages. One-time payment. Forever link.",
    images: ["/og.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${playfairDisplay.variable} antialiased`}
      >
        {children}
        <InAppBrowserWarning />
      </body>
    </html>
  );
}
