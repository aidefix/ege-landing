import type { Metadata } from "next";

import { LegalStub } from "@/components/sections/legal-stub";
import { LEGAL_PAGES } from "@/lib/data";

export const metadata: Metadata = {
  title: LEGAL_PAGES.consent.title,
  robots: { index: false },
};

export default function Page() {
  return <LegalStub page="consent" />;
}
