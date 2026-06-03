import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Globe, ArrowLeft, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { getStoryBySlug, getAllStorySlugs, getPublications, getProjects } from "@/lib/wordpress";
import WebPageJsonLd from "@/app/components/WebPageJsonLd";
import HeroBanner from "@/app/components/HeroBanner";
import RelatedContent from "@/app/components/RelatedContent";

export const revalidate = 3600; // ISR: revalidate every hour

export async function generateStaticParams() {
  // When WORDPRESS_API_URL is set, fetch from CMS.
  // Falls back to empty array for static builds without CMS.
  try {
    const slugs = await getAllStorySlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) return {};

  const title = story.seo?.title || `${story.title.rendered} | FSD Africa`;
  const description = story.seo?.description || story.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 160);

  return {
    title,
    description,
    alternates: { canonical: `/stories/${slug}` },
    openGraph: {
      title: story.seo?.og_title || title,
      description: story.seo?.og_description || description,
      url: `/stories/${slug}`,
      images: story.featured_image?.source_url ? [story.featured_image.source_url] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: story.seo?.twitter_title || title,
      description: story.seo?.twitter_description || description,
      images: story.featured_image?.source_url ? [story.featured_image.source_url] : undefined,
    },
  };
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  const themes = story.themes?.map((t) => t.name).join(", ") || "";
  const location = story.acf?.location || "";
  const readTime = story.acf?.read_time || "5 min read";

  const storyThemeIds = new Set(story.themes?.map((t) => t.id) || []);
  const storyCountryIds = new Set(story.countries?.map((c) => c.id) || []);

  const [publications, projects] = await Promise.all([
    getPublications({ per_page: 20 }),
    getProjects({ per_page: 20 }),
  ]);

  const related = [
    ...publications.data
      .filter((p) =>
        p.id !== story.id &&
        (p.themes?.some((t) => storyThemeIds.has(t.id)) ||
         p.countries?.some((c) => storyCountryIds.has(c.id)))
      )
      .map((p) => ({ id: p.id, slug: p.slug, title: p.title, excerpt: p.excerpt, _type: "publication" as const })),
    ...projects.data
      .filter((p) =>
        p.id !== story.id &&
        (p.themes?.some((t) => storyThemeIds.has(t.id)) ||
         p.countries?.some((c) => storyCountryIds.has(c.id)))
      )
      .map((p) => ({ id: p.id, slug: p.slug, title: p.title, excerpt: p.excerpt, _type: "project" as const })),
  ].slice(0, 3);

  return (
    <>
      <WebPageJsonLd
        title={story.title.rendered}
        description={story.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 160)}
        path={`/stories/${slug}`}
      />
      <div className="flex flex-col">
        <HeroBanner src={story.featured_image?.source_url || "/hero-banner.png"} alt={story.title.rendered}>
          <div className="inline-flex items-center gap-1.5 bg-gold px-3 py-1.5 rounded-sm mb-5 mx-auto">
            <Globe className="w-3 h-3 text-white" />
            <span className="text-[10px] font-bold tracking-[2.5px] uppercase text-white">
              Impact Story
            </span>
          </div>
          <h1
            className="font-serif text-[clamp(2.25rem,5vw,3.25rem)] leading-[1.15] text-white mb-4"
            dangerouslySetInnerHTML={{ __html: story.title.rendered }}
          />
          <div className="flex flex-wrap items-center justify-center gap-4 text-white/60 text-xs">
            {location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {location}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {readTime}
            </span>
            {themes && <span>{themes}</span>}
          </div>
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

            <div
              className="prose prose-sm max-w-none prose-headings:font-serif prose-headings:text-navy prose-p:text-muted prose-p:leading-relaxed prose-a:text-mid prose-strong:text-navy"
              dangerouslySetInnerHTML={{ __html: story.content.rendered }}
            />

            {story.acf?.beneficiary_quote && (
              <blockquote className="mt-10 border-l-4 border-gold pl-6 py-2 bg-off rounded-r-lg">
                <p className="font-serif text-lg italic text-navy leading-relaxed">
                  &ldquo;{story.acf.beneficiary_quote}&rdquo;
                </p>
              </blockquote>
            )}

            {story.acf?.stat_number && (
              <div className="mt-10 flex items-center gap-6 p-6 bg-blue rounded-lg">
                <div className="font-serif text-3xl font-bold text-white">{story.acf.stat_number}</div>
                <div className="text-sm text-white/80">{story.acf.stat_label}</div>
              </div>
            )}
          </div>
        </section>
        <RelatedContent items={related} />
      </div>
    </>
  );
}
