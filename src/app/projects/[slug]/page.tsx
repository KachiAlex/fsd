import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Globe, ArrowLeft, Clock, MapPin, Users, CheckCircle } from "lucide-react";
import Link from "next/link";
import { getProjectBySlug, getAllProjectSlugs, getStories, getPublications } from "@/lib/wordpress";
import WebPageJsonLd from "@/app/components/WebPageJsonLd";
import HeroBanner from "@/app/components/HeroBanner";
import RelatedContent from "@/app/components/RelatedContent";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const slugs = await getAllProjectSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  const title = project.seo?.title || `${project.title.rendered} | FSD Africa`;
  const description = project.seo?.description || project.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 160);

  return {
    title,
    description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: project.seo?.og_title || title,
      description: project.seo?.og_description || description,
      url: `/projects/${slug}`,
      images: project.featured_image?.source_url ? [project.featured_image.source_url] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: project.seo?.twitter_title || title,
      description: project.seo?.twitter_description || description,
      images: project.featured_image?.source_url ? [project.featured_image.source_url] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const statusMap: Record<string, string> = {
    active: "Active",
    completed: "Completed",
    planned: "Planned",
  };

  const statusColor: Record<string, string> = {
    active: "bg-green text-white",
    completed: "bg-blue text-white",
    planned: "bg-gold text-white",
  };

  const projectThemeIds = new Set(project.themes?.map((t) => t.id) || []);
  const projectCountryIds = new Set(project.countries?.map((c) => c.id) || []);

  const [stories, publications] = await Promise.all([
    getStories({ per_page: 20 }),
    getPublications({ per_page: 20 }),
  ]);

  const related = [
    ...stories.data
      .filter((s) =>
        s.id !== project.id &&
        (s.themes?.some((t) => projectThemeIds.has(t.id)) ||
         s.countries?.some((c) => projectCountryIds.has(c.id)))
      )
      .map((s) => ({ id: s.id, slug: s.slug, title: s.title, excerpt: s.excerpt, _type: "story" as const })),
    ...publications.data
      .filter((p) =>
        p.id !== project.id &&
        (p.themes?.some((t) => projectThemeIds.has(t.id)) ||
         p.countries?.some((c) => projectCountryIds.has(c.id)))
      )
      .map((p) => ({ id: p.id, slug: p.slug, title: p.title, excerpt: p.excerpt, _type: "publication" as const })),
  ].slice(0, 3);

  return (
    <>
      <WebPageJsonLd
        title={project.title.rendered}
        description={project.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 160)}
        path={`/projects/${slug}`}
      />
      <div className="flex flex-col">
        <HeroBanner src={project.featured_image?.source_url || "/hero-banner.png"} alt={project.title.rendered}>
          <div className="inline-flex items-center gap-1.5 bg-gold px-3 py-1.5 rounded-sm mb-5 mx-auto">
            <Globe className="w-3 h-3 text-white" />
            <span className="text-[10px] font-bold tracking-[2.5px] uppercase text-white">
              Programme
            </span>
          </div>
          <h1
            className="font-serif text-[clamp(2.25rem,5vw,3.25rem)] leading-[1.15] text-white mb-4"
            dangerouslySetInnerHTML={{ __html: project.title.rendered }}
          />
          <div className="flex flex-wrap items-center justify-center gap-4 text-white/60 text-xs">
            {project.acf?.status && (
              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${statusColor[project.acf.status] || "bg-mid text-white"}`}>
                {statusMap[project.acf.status] || project.acf.status}
              </span>
            )}
            {project.acf?.duration && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {project.acf.duration}
              </span>
            )}
            {project.countries && project.countries.length > 0 && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {project.countries.map((c) => c.name).join(", ")}
              </span>
            )}
          </div>
        </HeroBanner>

        {/* CONTENT */}
        <section className="px-4 sm:px-10 py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/our-work"
              className="inline-flex items-center gap-1 text-xs text-mid font-semibold mb-8 hover:underline"
            >
              <ArrowLeft className="w-3 h-3" />
              Back to Our Work
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Main content */}
              <div className="lg:col-span-2">
                <div
                  className="prose prose-sm max-w-none prose-headings:font-serif prose-headings:text-navy prose-p:text-muted prose-p:leading-relaxed prose-a:text-mid prose-strong:text-navy"
                  dangerouslySetInnerHTML={{ __html: project.content.rendered }}
                />
              </div>

              {/* Sidebar */}
              <div className="flex flex-col gap-6">
                {project.acf?.partners && project.acf.partners.length > 0 && (
                  <div className="bg-off rounded-lg p-5 border border-border">
                    <h3 className="font-serif text-sm font-semibold text-navy mb-3 flex items-center gap-2">
                      <Users className="w-4 h-4 text-mid" />
                      Partners
                    </h3>
                    <ul className="flex flex-col gap-2">
                      {project.acf.partners.map((partner, i) => (
                        <li key={i} className="text-xs text-muted flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green" />
                          {partner}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.acf?.impact_metrics && project.acf.impact_metrics.length > 0 && (
                  <div className="bg-off rounded-lg p-5 border border-border">
                    <h3 className="font-serif text-sm font-semibold text-navy mb-3">Impact Metrics</h3>
                    <div className="flex flex-col gap-3">
                      {project.acf.impact_metrics.map((m, i) => (
                        <div key={i} className="border-b border-border last:border-0 pb-3 last:pb-0">
                          <div className="font-serif text-xl font-bold text-navy">{m.value}</div>
                          <div className="text-[11px] text-muted">{m.metric}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {project.acf?.budget && (
                  <div className="bg-off rounded-lg p-5 border border-border">
                    <h3 className="font-serif text-sm font-semibold text-navy mb-1">Budget</h3>
                    <div className="text-lg font-bold text-navy">{project.acf.budget}</div>
                  </div>
                )}
              </div>
            </div>

            {/* TIMELINE */}
            {project.acf?.timeline_events && project.acf.timeline_events.length > 0 && (
              <div className="mt-12 pt-10 border-t border-border">
                <h2 className="font-serif text-xl font-semibold text-navy mb-6">Project Timeline</h2>
                <div className="relative border-l-2 border-border pl-6 space-y-6">
                  {project.acf.timeline_events.map((event, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[31px] top-1 w-5 h-5 rounded-full bg-mid border-4 border-white" />
                      <div className="text-[11px] font-semibold text-mid mb-0.5">{event.date}</div>
                      <div className="font-serif text-sm font-semibold text-navy">{event.title}</div>
                      <div className="text-xs text-muted mt-0.5">{event.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
        <RelatedContent items={related} />
      </div>
    </>
  );
}
