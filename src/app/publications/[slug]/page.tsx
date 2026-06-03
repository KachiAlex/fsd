import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Globe, ArrowLeft, Download, ExternalLink, FileText, Calendar } from "lucide-react";
import Link from "next/link";
import { getPublicationBySlug, getAllPublicationSlugs, getStories, getProjects } from "@/lib/wordpress";
import WebPageJsonLd from "@/app/components/WebPageJsonLd";
import HeroBanner from "@/app/components/HeroBanner";
import RelatedContent from "@/app/components/RelatedContent";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const slugs = await getAllPublicationSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pub = await getPublicationBySlug(slug);
  if (!pub) return {};

  const title = pub.seo?.title || `${pub.title.rendered} | FSD Africa`;
  const description = pub.seo?.description || pub.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 160);

  return {
    title,
    description,
    alternates: { canonical: `/publications/${slug}` },
    openGraph: {
      title: pub.seo?.og_title || title,
      description: pub.seo?.og_description || description,
      url: `/publications/${slug}`,
      images: pub.featured_image?.source_url ? [pub.featured_image.source_url] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: pub.seo?.twitter_title || title,
      description: pub.seo?.twitter_description || description,
      images: pub.featured_image?.source_url ? [pub.featured_image.source_url] : undefined,
    },
  };
}

export default async function PublicationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pub = await getPublicationBySlug(slug);

  if (!pub) {
    notFound();
  }

  const typeLabel = pub.acf?.publication_type?.replace("_", " ") || "Publication";
  const typeMap: Record<string, string> = {
    research: "Research Report",
    policy_brief: "Policy Brief",
    case_study: "Case Study",
    data_tool: "Data Tool",
    explainer: "Explainer",
  };

  const pubThemeIds = new Set(pub.themes?.map((t) => t.id) || []);
  const pubCountryIds = new Set(pub.countries?.map((c) => c.id) || []);

  const [stories, projects] = await Promise.all([
    getStories({ per_page: 20 }),
    getProjects({ per_page: 20 }),
  ]);

  const related = [
    ...stories.data
      .filter((s) =>
        s.id !== pub.id &&
        (s.themes?.some((t) => pubThemeIds.has(t.id)) ||
         s.countries?.some((c) => pubCountryIds.has(c.id)))
      )
      .map((s) => ({ id: s.id, slug: s.slug, title: s.title, excerpt: s.excerpt, _type: "story" as const })),
    ...projects.data
      .filter((p) =>
        p.id !== pub.id &&
        (p.themes?.some((t) => pubThemeIds.has(t.id)) ||
         p.countries?.some((c) => pubCountryIds.has(c.id)))
      )
      .map((p) => ({ id: p.id, slug: p.slug, title: p.title, excerpt: p.excerpt, _type: "project" as const })),
  ].slice(0, 3);

  return (
    <>
      <WebPageJsonLd
        title={pub.title.rendered}
        description={pub.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 160)}
        path={`/publications/${slug}`}
      />
      <div className="flex flex-col">
        <HeroBanner src={pub.featured_image?.source_url || "/hero-banner.png"} alt={pub.title.rendered}>
          <div className="inline-flex items-center gap-1.5 bg-gold px-3 py-1.5 rounded-sm mb-5 mx-auto">
            <Globe className="w-3 h-3 text-white" />
            <span className="text-[10px] font-bold tracking-[2.5px] uppercase text-white">
              {typeMap[pub.acf?.publication_type || ""] || typeLabel}
            </span>
          </div>
          <h1
            className="font-serif text-[clamp(2.25rem,5vw,3.25rem)] leading-[1.15] text-white mb-4"
            dangerouslySetInnerHTML={{ __html: pub.title.rendered }}
          />
          <div className="flex flex-wrap items-center justify-center gap-4 text-white/60 text-xs">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(pub.date).toLocaleDateString("en-GB", { year: "numeric", month: "long" })}
            </span>
            {pub.acf?.authors && <span>{pub.acf.authors}</span>}
            {pub.acf?.file_format && (
              <span className="flex items-center gap-1">
                <FileText className="w-3 h-3" />
                {pub.acf.file_format}
              </span>
            )}
          </div>
        </HeroBanner>

        {/* CONTENT */}
        <section className="px-4 sm:px-10 py-12 sm:py-16 bg-white">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/knowledge-hub"
              className="inline-flex items-center gap-1 text-xs text-mid font-semibold mb-8 hover:underline"
            >
              <ArrowLeft className="w-3 h-3" />
              Back to Knowledge Hub
            </Link>

            <div
              className="prose prose-sm max-w-none prose-headings:font-serif prose-headings:text-navy prose-p:text-muted prose-p:leading-relaxed prose-a:text-mid prose-strong:text-navy"
              dangerouslySetInnerHTML={{ __html: pub.content.rendered }}
            />

            {/* ACTIONS */}
            <div className="mt-10 flex flex-wrap gap-3">
              {pub.acf?.download_url && (
                <a
                  href={pub.acf.download_url}
                  className="inline-flex items-center gap-2 bg-mid text-white text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-mid/90 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
              )}
              {pub.acf?.external_url && (
                <a
                  href={pub.acf.external_url}
                  className="inline-flex items-center gap-2 border border-border text-navy text-xs font-semibold px-5 py-2.5 rounded-lg hover:border-mid transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4" />
                  View External
                </a>
              )}
            </div>

            {/* META */}
            <div className="mt-10 pt-6 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-muted">
              {pub.acf?.doi && (
                <div>
                  <span className="font-semibold text-navy">DOI:</span> {pub.acf.doi}
                </div>
              )}
              {pub.acf?.file_size && (
                <div>
                  <span className="font-semibold text-navy">File size:</span> {pub.acf.file_size}
                </div>
              )}
              {pub.acf?.partner_organisations && (
                <div>
                  <span className="font-semibold text-navy">Partners:</span> {pub.acf.partner_organisations}
                </div>
              )}
            </div>
          </div>
        </section>
        <RelatedContent items={related} />
      </div>
    </>
  );
}
