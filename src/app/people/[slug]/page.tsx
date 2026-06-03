import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Globe, ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import { getPersonBySlug, getAllPeopleSlugs } from "@/lib/wordpress";
import WebPageJsonLd from "@/app/components/WebPageJsonLd";
import HeroBanner from "@/app/components/HeroBanner";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const slugs = await getAllPeopleSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const person = await getPersonBySlug(slug);
  if (!person) return {};

  const title = `${person.title.rendered} | FSD Africa`;
  const description = person.acf?.biography || person.content.rendered.replace(/<[^>]+>/g, "").slice(0, 160);

  return {
    title,
    description,
    alternates: { canonical: `/people/${slug}` },
    openGraph: { title, description, url: `/people/${slug}` },
  };
}

export default async function PersonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const person = await getPersonBySlug(slug);

  if (!person) {
    notFound();
  }

  return (
    <>
      <WebPageJsonLd
        title={person.title.rendered}
        description={person.content.rendered.replace(/<[^>]+>/g, "").slice(0, 160)}
        path={`/people/${slug}`}
      />
      <div className="flex flex-col">
        <HeroBanner minHeight="min-h-[320px] sm:min-h-[360px]">
          <div className="inline-flex items-center gap-1.5 bg-gold px-3 py-1.5 rounded-sm mb-5 mx-auto">
            <Globe className="w-3 h-3 text-white" />
            <span className="text-[10px] font-bold tracking-[2.5px] uppercase text-white">Leadership</span>
          </div>
          <h1
            className="font-serif text-[clamp(2.25rem,5vw,3.25rem)] leading-[1.15] text-white mb-2"
            dangerouslySetInnerHTML={{ __html: person.title.rendered }}
          />
          <p className="text-base text-white/70">{person.acf?.role || "Team Member"}</p>
        </HeroBanner>

        {/* CONTENT */}
        <section className="px-4 sm:px-10 py-12 sm:py-16 bg-white">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/about"
              className="inline-flex items-center gap-1 text-xs text-mid font-semibold mb-8 hover:underline"
            >
              <ArrowLeft className="w-3 h-3" />
              Back to About
            </Link>

            <div className="flex flex-col sm:flex-row gap-8 items-start">
              <div className="w-32 h-32 rounded-full bg-off flex-shrink-0 overflow-hidden mx-auto sm:mx-0">
                {person.featured_image?.source_url ? (
                  <Image src={person.featured_image.source_url} alt={person.title.rendered} width={128} height={128} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-navy/10">
                    <span className="font-serif text-3xl text-navy/30 font-bold">
                      {person.title.rendered.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="prose prose-sm max-w-none prose-headings:font-serif prose-headings:text-navy prose-p:text-muted prose-p:leading-relaxed prose-a:text-mid prose-strong:text-navy">
                  <div dangerouslySetInnerHTML={{ __html: person.content.rendered }} />
                </div>
                {person.acf?.biography && (
                  <p className="mt-4 text-sm text-muted leading-relaxed">{person.acf.biography}</p>
                )}
                <div className="mt-6 flex flex-wrap gap-3">
                  {person.acf?.email && (
                    <a
                      href={`mailto:${person.acf.email}`}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-mid border border-border rounded-lg px-4 py-2 hover:border-mid transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      Email
                    </a>
                  )}
                  {person.acf?.linkedin && (
                    <a
                      href={person.acf.linkedin}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-mid border border-border rounded-lg px-4 py-2 hover:border-mid transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
