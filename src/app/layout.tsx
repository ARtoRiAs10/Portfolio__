import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/components/providers";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://gauravkumar.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Gaurav Kumar — Terminal Portfolio",
    template: "%s — Gaurav Kumar",
  },
  description:
    "Gaurav Kumar is a freelance full-stack and AI engineer building SaaS platforms, real-time collaboration tools, and developer infrastructure. Explore selected projects in a terminal-style portfolio.",
  keywords: [
    "Gaurav Kumar",
    "full-stack engineer",
    "AI engineer",
    "freelance developer",
    "Next.js",
    "TypeScript",
    "React",
    "RAG",
    "developer infrastructure",
    "portfolio",
  ],
  authors: [{ name: "Gaurav Kumar", url: siteUrl }],
  creator: "Gaurav Kumar",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Gaurav Kumar",
    title: "Gaurav Kumar — Terminal Portfolio",
    description:
      "Full-stack and AI product engineering: SaaS platforms, real-time tools, and developer infrastructure.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Gaurav Kumar — I build software that feels inevitable.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gaurav Kumar — Terminal Portfolio",
    description:
      "Full-stack and AI product engineering: SaaS platforms, real-time tools, and developer infrastructure.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070a08",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full font-mono antialiased">
        <Providers>
          <TooltipProvider delay={200}>
            {children}
            <Toaster position="bottom-right" />
          </TooltipProvider>
        </Providers>
        <div className="crt-overlay" aria-hidden="true" />
        <div className="scanline" aria-hidden="true" />
      </body>
    </html>
  );
}