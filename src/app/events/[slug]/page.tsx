import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Globe, ArrowLeft, Calendar, MapPin, Clock, ExternalLink, Users } from "lucide-react";
import Link from "next/link";
import { getEventBySlug, getAllEventSlugs } from "@/lib/wordpress";
import WebPageJsonLd from "@/app/components/WebPageJsonLd";
import HeroBanner from "@/app/components/HeroBanner";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const slugs = await getAllEventSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return {};

  const title = `${event.title.rendered} | FSD Africa`;
  const description = event.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 160);

  return {
    title,
    description,
    alternates: { canonical: `/events/${slug}` },
    openGraph: { title, description, url: `/events/${slug}` },
  };
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const eventDate = event.acf?.event_date
    ? new Date(event.acf.event_date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : new Date(event.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      <WebPageJsonLd
        title={event.title.rendered}
        description={event.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 160)}
        path={`/events/${slug}`}
      />
      <div className="flex flex-col">
        <HeroBanner>
          <div className="inline-flex items-center gap-1.5 bg-gold px-3 py-1.5 rounded-sm mb-5 mx-auto">
            <Globe className="w-3 h-3 text-white" />
            <span className="text-[10px] font-bold tracking-[2.5px] uppercase text-white">Event</span>
          </div>
          <h1
            className="font-serif text-[clamp(2.25rem,5vw,3.25rem)] leading-[1.15] text-white mb-4"
            dangerouslySetInnerHTML={{ __html: event.title.rendered }}
          />
          <div className="flex flex-wrap items-center justify-center gap-4 text-white/60 text-xs">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {eventDate}
            </span>
            {event.acf?.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {event.acf.location}
              </span>
            )}
            {event.acf?.event_type && (
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/20 text-white">
                {event.acf.event_type.charAt(0).toUpperCase() + event.acf.event_type.slice(1)}
              </span>
            )}
          </div>
        </HeroBanner>

        {/* CONTENT */}
        <section className="px-4 sm:px-10 py-12 sm:py-16 bg-white">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/events"
              className="inline-flex items-center gap-1 text-xs text-mid font-semibold mb-8 hover:underline"
            >
              <ArrowLeft className="w-3 h-3" />
              Back to Events
            </Link>

            <div className="prose prose-sm max-w-none prose-headings:font-serif prose-headings:text-navy prose-p:text-muted prose-p:leading-relaxed prose-a:text-mid prose-strong:text-navy">
              <div dangerouslySetInnerHTML={{ __html: event.content.rendered }} />
            </div>

            {/* DETAILS */}
            <div className="mt-10 pt-8 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-6">
              {event.acf?.venue && (
                <div>
                  <div className="text-[10px] font-bold tracking-[2.5px] uppercase text-gold mb-1">Venue</div>
                  <div className="text-sm text-navy">{event.acf.venue}</div>
                </div>
              )}
              {event.acf?.event_date && event.acf?.end_date && (
                <div>
                  <div className="text-[10px] font-bold tracking-[2.5px] uppercase text-gold mb-1">Duration</div>
                  <div className="text-sm text-navy flex items-center gap-1">
                    <Clock className="w-3 h-3 text-muted" />
                    {new Date(event.acf.event_date).toLocaleDateString("en-GB")} — {new Date(event.acf.end_date).toLocaleDateString("en-GB")}
                  </div>
                </div>
              )}
            </div>

            {/* AGENDA */}
            {event.acf?.agenda && event.acf.agenda.length > 0 && (
              <div className="mt-10">
                <h2 className="font-serif text-xl font-semibold text-navy mb-4">Agenda</h2>
                <div className="flex flex-col gap-3">
                  {event.acf.agenda.map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-off rounded-lg border border-border">
                      <div className="text-xs font-semibold text-mid whitespace-nowrap">{item.time}</div>
                      <div>
                        <div className="text-sm font-medium text-navy">{item.title}</div>
                        {item.description && <div className="text-xs text-muted mt-0.5">{item.description}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SPEAKERS */}
            {event.acf?.speakers && event.acf.speakers.length > 0 && (
              <div className="mt-10">
                <h2 className="font-serif text-xl font-semibold text-navy mb-4">Speakers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {event.acf.speakers.map((speaker, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-off rounded-lg border border-border">
                      <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-navy/40" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-navy truncate">{speaker.name}</div>
                        <div className="text-xs text-muted">{speaker.role}{speaker.organisation ? `, ${speaker.organisation}` : ""}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ACTIONS */}
            <div className="mt-10 flex flex-wrap gap-3">
              {event.acf?.registration_url && (
                <a
                  href={event.acf.registration_url}
                  className="inline-flex items-center gap-2 bg-mid text-white text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-mid/90 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4" />
                  Register
                </a>
              )}
              {event.acf?.recording_url && (
                <a
                  href={event.acf.recording_url}
                  className="inline-flex items-center gap-2 border border-border text-navy text-xs font-semibold px-5 py-2.5 rounded-lg hover:border-mid transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Clock className="w-4 h-4" />
                  Watch Recording
                </a>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
