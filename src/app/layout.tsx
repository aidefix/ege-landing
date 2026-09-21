import type { Metadata, Viewport } from "next";
import { Caveat, Golos_Text, Unbounded } from "next/font/google";

import { Metrika } from "@/components/metrika";
import { Footer } from "@/components/sections";
import { TEACHER } from "@/lib/data";
import { SITE } from "@/lib/site";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["cyrillic"],
  display: "swap",
  variable: "--font-unbounded",
});

const caveat = Caveat({
  subsets: ["cyrillic"],
  display: "swap",
  variable: "--font-caveat",
});

const golos = Golos_Text({
  subsets: ["cyrillic"],
  display: "swap",
  variable: "--font-golos",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: `%s — ${SITE.name}` },
  description: SITE.description,
  keywords: [...SITE.keywords],
  applicationName: SITE.name,
  authors: [{ name: TEACHER.name }],
  creator: TEACHER.name,
  alternates: { canonical: "/" },
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: "/",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#e8e3d3",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${unbounded.variable} ${caveat.variable} ${golos.variable}`}
    >
      <body className="font-sans">
        <div className="relative z-1 mx-auto max-w-[1200px] px-[18px]">
          {children}
          <Footer />
        </div>
        <Metrika />
      </body>
    </html>
  );
}
