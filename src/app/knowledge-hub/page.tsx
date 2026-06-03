import type { Metadata } from "next";
import { Globe } from "lucide-react";
import WebPageJsonLd from "../components/WebPageJsonLd";
import HeroBanner from "../components/HeroBanner";
import KnowledgeHubClient from "../components/KnowledgeHubClient";
import { getPublications } from "@/lib/wordpress";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Knowledge Hub",
  description:
    "Access FSD Africa's research reports, policy briefs, data tools, and case studies.",
  alternates: {
    canonical: "/knowledge-hub",
  },
  openGraph: {
    title: "Knowledge Hub | FSD Africa",
    description:
      "Access FSD Africa's research reports, policy briefs, data tools, and case studies.",
    url: "/knowledge-hub",
  },
  twitter: {
    title: "Knowledge Hub | FSD Africa",
    description:
      "Access FSD Africa's research reports, policy briefs, data tools, and case studies.",
  },
};

export default async function KnowledgeHubPage() {
  const publications = await getPublications({ per_page: 20, orderby: "date", order: "desc" });

  return (
    <>
      <WebPageJsonLd
        title="Knowledge Hub | FSD Africa"
        description="Access FSD Africa's research reports, policy briefs, data tools, and case studies."
        path="/knowledge-hub"
      />
      <div className="flex flex-col">
        <HeroBanner>
          <div className="inline-flex items-center gap-1.5 bg-gold px-3 py-1.5 rounded-sm mb-5 mx-auto">
            <Globe className="w-3 h-3 text-white" />
            <span className="text-[10px] font-bold tracking-[2.5px] uppercase text-white">
              Knowledge Hub
            </span>
          </div>
          <h1 className="font-serif text-[clamp(2.25rem,5vw,3.25rem)] leading-[1.15] text-white mb-4">
            Research & insights
            <br />
            <em className="text-sky">for Africa&apos;s future.</em>
          </h1>
          <p className="text-base text-white/70 leading-[1.75] max-w-2xl mx-auto font-light">
            Browse our library of reports, policy briefs, data tools, and case
            studies — all designed to inform better decisions.
          </p>
        </HeroBanner>

        <KnowledgeHubClient publications={publications.data} total={publications.total} />
      </div>
    </>
  );
}
