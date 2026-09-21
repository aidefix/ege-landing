import type { Metadata } from "next";

import {
  Essay,
  Exam,
  Faq,
  Final,
  Hero,
  Lead,
  Pricing,
  Program,
  Quiz,
  Results,
} from "@/components/sections";
import { landingJsonLd, serializeJsonLd } from "@/lib/json-ld";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: "/",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(landingJsonLd()) }}
      />
      <main>
        <Hero />
        <Exam />
        <Quiz />
        <Program />
        <Essay />
        <Results />
        <Pricing />
        <Faq />
        <Final />
        <Lead />
      </main>
    </>
  );
}
