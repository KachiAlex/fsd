import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Globe, ArrowLeft, MapPin, Users, BarChart3 } from "lucide-react";
import Link from "next/link";
import { getCountryBySlug, getCountries } from "@/lib/wordpress";
import { getStories, getPublications, getProjects } from "@/lib/wordpress";
import WebPageJsonLd from "@/app/components/WebPageJsonLd";
import HeroBanner from "@/app/components/HeroBanner";
import RelatedContent from "@/app/components/RelatedContent";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const countries = await getCountries({ per_page: 100 });
    return countries.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const country = await getCountryBySlug(slug);
  if (!country) return {};

  const title = `${country.title.rendered} | FSD Africa`;
  const description = country.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 160);

  return {
    title,
    description,
    alternates: { canonical: `/countries/${slug}` },
    openGraph: { title, description, url: `/countries/${slug}` },
  };
}

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = await getCountryBySlug(slug);

  if (!country) {
    notFound();
  }

  const countryId = country.id;
  const countryName = country.title.rendered;

  const [stories, publications, projects] = await Promise.all([
    getStories({ per_page: 20 }),
    getPublications({ per_page: 20 }),
    getProjects({ per_page: 20 }),
  ]);

  const countryStories = stories.data.filter((s) => s.countries?.some((c) => c.id === countryId));
  const countryPublications = publications.data.filter((p) => p.countries?.some((c) => c.id === countryId));
  const countryProjects = projects.data.filter((p) => p.countries?.some((c) => c.id === countryId));

  const related = [
    ...countryStories.map((s) => ({ id: s.id, slug: s.slug, title: s.title, excerpt: s.excerpt, _type: "story" as const })),
    ...countryPublications.map((p) => ({ id: p.id, slug: p.slug, title: p.title, excerpt: p.excerpt, _type: "publication" as const })),
    ...countryProjects.map((p) => ({ id: p.id, slug: p.slug, title: p.title, excerpt: p.excerpt, _type: "project" as const })),
  ].slice(0, 3);

  return (
    <>
      <WebPageJsonLd
        title={country.title.rendered}
        description={country.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 160)}
        path={`/countries/${slug}`}
      />
      <div className="flex flex-col">
        <HeroBanner>
          <div className="inline-flex items-center gap-1.5 bg-gold px-3 py-1.5 rounded-sm mb-5 mx-auto">
            <MapPin className="w-3 h-3 text-white" />
            <span className="text-[10px] font-bold tracking-[2.5px] uppercase text-white">Country Spotlight</span>
          </div>
          <h1
            className="font-serif text-[clamp(2.25rem,5vw,3.25rem)] leading-[1.15] text-white mb-4"
            dangerouslySetInnerHTML={{ __html: country.title.rendered }}
          />
          {country.acf?.region && (
            <p className="text-base text-white/70">{country.acf.region}</p>
          )}
        </HeroBanner>

        {/* CONTENT */}
        <section className="px-4 sm:px-10 py-12 sm:py-16 bg-white">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/impact"
              className="inline-flex items-center gap-1 text-xs text-mid font-semibold mb-8 hover:underline"
            >
              <ArrowLeft className="w-3 h-3" />
              Back to Impact
            </Link>

            <div className="prose prose-sm max-w-none prose-headings:font-serif prose-headings:text-navy prose-p:text-muted prose-p:leading-relaxed prose-a:text-mid prose-strong:text-navy">
              <div dangerouslySetInnerHTML={{ __html: country.content.rendered }} />
            </div>

            {/* STATS */}
            {(country.acf?.active_programmes || country.acf?.active_projects) && (
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {country.acf.active_programmes !== undefined && (
                  <div className="bg-off rounded-lg p-5 border border-border flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-serif text-xl font-bold text-navy">{country.acf.active_programmes}</div>
                      <div className="text-[11px] text-muted">Active Programmes</div>
                    </div>
                  </div>
                )}
                {country.acf.active_projects !== undefined && (
                  <div className="bg-off rounded-lg p-5 border border-border flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-green flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-serif text-xl font-bold text-navy">{country.acf.active_projects}</div>
                      <div className="text-[11px] text-muted">Active Projects</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* LINKED CONTENT */}
            {(countryStories.length > 0 || countryPublications.length > 0 || countryProjects.length > 0) && (
              <div className="mt-10">
                <h2 className="font-serif text-xl font-semibold text-navy mb-4">Content from {countryName}</h2>
                <div className="flex flex-col gap-3">
                  {countryStories.slice(0, 2).map((story) => (
                    <Link
                      key={story.id}
                      href={`/stories/${story.slug}`}
                      className="flex items-start gap-3 p-4 border border-border rounded-lg hover:border-mid transition-colors bg-white"
                    >
                      <span className="text-[9px] font-bold tracking-[1.5px] uppercase px-2 py-0.5 rounded-sm bg-navy text-white">Story</span>
                      <span className="text-sm text-navy" dangerouslySetInnerHTML={{ __html: story.title.rendered }} />
                    </Link>
                  ))}
                  {countryPublications.slice(0, 2).map((pub) => (
                    <Link
                      key={pub.id}
                      href={`/publications/${pub.slug}`}
                      className="flex items-start gap-3 p-4 border border-border rounded-lg hover:border-mid transition-colors bg-white"
                    >
                      <span className="text-[9px] font-bold tracking-[1.5px] uppercase px-2 py-0.5 rounded-sm bg-gold text-white">Publication</span>
                      <span className="text-sm text-navy" dangerouslySetInnerHTML={{ __html: pub.title.rendered }} />
                    </Link>
                  ))}
                  {countryProjects.slice(0, 2).map((project) => (
                    <Link
                      key={project.id}
                      href={`/projects/${project.slug}`}
                      className="flex items-start gap-3 p-4 border border-border rounded-lg hover:border-mid transition-colors bg-white"
                    >
                      <span className="text-[9px] font-bold tracking-[1.5px] uppercase px-2 py-0.5 rounded-sm bg-green text-white">Project</span>
                      <span className="text-sm text-navy" dangerouslySetInnerHTML={{ __html: project.title.rendered }} />
                    </Link>
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
