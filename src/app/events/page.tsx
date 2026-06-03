import type { Metadata } from "next";
import Link from "next/link";
import { Globe, Calendar, MapPin, ArrowRight } from "lucide-react";
import WebPageJsonLd from "../components/WebPageJsonLd";
import HeroBanner from "../components/HeroBanner";
import { getEvents } from "@/lib/wordpress";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Events | FSD Africa",
  description: "Conferences, workshops, webinars, and roundtables on financial systems development.",
  alternates: { canonical: "/events" },
  openGraph: {
    title: "Events | FSD Africa",
    description: "Conferences, workshops, webinars, and roundtables on financial systems development.",
    url: "/events",
  },
};

export default async function EventsPage() {
  const { data: events } = await getEvents({ per_page: 20 });

  const typeBadge: Record<string, string> = {
    conference: "bg-blue text-white",
    workshop: "bg-green text-white",
    webinar: "bg-purple text-white",
    roundtable: "bg-gold text-white",
    launch: "bg-mid text-white",
  };

  return (
    <>
      <WebPageJsonLd
        title="Events | FSD Africa"
        description="Conferences, workshops, webinars, and roundtables on financial systems development."
        path="/events"
      />
      <div className="flex flex-col">
        <HeroBanner minHeight="min-h-[320px] sm:min-h-[360px]">
          <div className="inline-flex items-center gap-1.5 bg-gold px-3 py-1.5 rounded-sm mb-5 mx-auto">
            <Globe className="w-3 h-3 text-white" />
            <span className="text-[10px] font-bold tracking-[2.5px] uppercase text-white">Events</span>
          </div>
          <h1 className="font-serif text-[clamp(2.25rem,5vw,3.25rem)] leading-[1.15] text-white mb-4">
            Where ideas meet action
          </h1>
          <p className="text-base text-white/70 leading-[1.75] max-w-2xl mx-auto font-light">
            Conferences, workshops, webinars, and roundtables that shape the future of African finance.
          </p>
        </HeroBanner>

        {/* EVENTS LIST */}
        <section className="px-4 sm:px-10 py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col gap-4">
              {events.map((event) => {
                const eventDate = event.acf?.event_date
                  ? new Date(event.acf.event_date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
                  : new Date(event.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
                const badgeClass = typeBadge[event.acf?.event_type || ""] || "bg-mid text-white";

                return (
                  <Link
                    key={event.id}
                    href={`/events/${event.slug}`}
                    className="flex flex-col sm:flex-row gap-4 p-5 border border-border rounded-lg hover:border-mid transition-colors bg-white group"
                  >
                    <div className="flex flex-col items-center justify-center bg-off rounded-lg p-3 w-full sm:w-20 flex-shrink-0">
                      <div className="font-serif text-lg font-bold text-navy">
                        {new Date(event.acf?.event_date || event.date).getDate()}
                      </div>
                      <div className="text-[10px] text-muted uppercase">
                        {new Date(event.acf?.event_date || event.date).toLocaleDateString("en-GB", { month: "short" })}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className={`text-[9px] font-bold tracking-[1.5px] uppercase px-2 py-0.5 rounded-sm ${badgeClass}`}>
                          {event.acf?.event_type || "Event"}
                        </span>
                        {event.acf?.is_virtual && (
                          <span className="text-[9px] font-bold tracking-[1.5px] uppercase px-2 py-0.5 rounded-sm bg-off text-muted border border-border">
                            Virtual
                          </span>
                        )}
                      </div>
                      <h3
                        className="font-serif text-base font-semibold text-navy mb-1 group-hover:text-mid transition-colors"
                        dangerouslySetInnerHTML={{ __html: event.title.rendered }}
                      />
                      <p className="text-xs text-muted leading-relaxed mb-2">
                        {event.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 140)}...
                      </p>
                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted">
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
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center">
                      <ArrowRight className="w-4 h-4 text-muted group-hover:text-mid group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                );
              })}
            </div>
            {events.length === 0 && (
              <div className="text-center py-12">
                <p className="text-sm text-muted">No upcoming events at this time. Check back soon.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
