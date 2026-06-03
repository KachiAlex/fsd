import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { Globe, Users, Shield, BarChart3, Clock, ArrowRight } from "lucide-react";
import AboutJsonLd from "../components/AboutJsonLd";
import HeroBanner from "../components/HeroBanner";
import { getPeople } from "@/lib/wordpress";
import { getImpactStats } from "@/lib/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about FSD Africa's mission to build inclusive financial systems across the continent.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | FSD Africa",
    description:
      "Learn about FSD Africa's mission to build inclusive financial systems across the continent.",
    url: "/about",
  },
  twitter: {
    title: "About Us | FSD Africa",
    description:
      "Learn about FSD Africa's mission to build inclusive financial systems across the continent.",
  },
};

export default async function AboutPage() {
  const [people, stats] = await Promise.all([
    getPeople({ per_page: 10 }),
    getImpactStats(),
  ]);
  return (
    <>
      <AboutJsonLd />
      <div className="flex flex-col">
      <HeroBanner>
        <div className="inline-flex items-center gap-1.5 bg-gold px-3 py-1.5 rounded-sm mb-5 mx-auto">
          <Globe className="w-3 h-3 text-white" />
          <span className="text-[10px] font-bold tracking-[2.5px] uppercase text-white">
            About FSD Africa
          </span>
        </div>
        <h1 className="font-serif text-[clamp(2.25rem,5vw,3.25rem)] leading-[1.15] text-white mb-4">
          Building financial systems
          <br />
          <em className="text-sky">that work for everyone.</em>
        </h1>
        <p className="text-base text-white/70 leading-[1.75] max-w-2xl mx-auto font-light">
          FSD Africa is a specialist development agency working to reduce poverty
          across sub-Saharan Africa by building financial markets that are efficient,
          robust, and inclusive.
        </p>
      </HeroBanner>

      {/* MISSION */}
      <section className="px-4 sm:px-10 py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-[10px] font-bold tracking-[2.5px] uppercase text-gold mb-2">
              Our Mission
            </div>
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-semibold text-navy leading-tight mb-4">
              We believe finance should serve people, not the other way around.
            </h2>
            <p className="text-sm text-muted leading-relaxed mb-4">
              Established in 2012 and funded by the UK&apos;s Foreign, Commonwealth &
              Development Office, FSD Africa works with policymakers, regulators,
              financial institutions, and innovators to build markets that deliver for
              Africa&apos;s people.
            </p>
            <p className="text-sm text-muted leading-relaxed">
              Our work spans 38 countries. We bring technical expertise, deep local
              knowledge, and a network of partners who share our vision of an
              inclusive, resilient financial system.
            </p>
          </div>
          <div className="bg-off rounded-lg p-8 border border-border">
            <div className="grid grid-cols-2 gap-6">
              {[
                { n: String(stats.countriesReached), l: "Countries" },
                { n: String(stats.activeProjects), l: "Active Projects" },
                { n: String(stats.publicationsProduced), l: "Publications" },
                { n: String(stats.storiesPublished), l: "Stories" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="font-serif text-2xl font-bold text-navy">{s.n}</div>
                  <div className="text-[11px] text-muted mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO SUMMARY */}
      <section className="px-4 sm:px-10 py-12 sm:py-16 bg-off">
        <div className="max-w-4xl mx-auto">
          <div className="text-[10px] font-bold tracking-[2.5px] uppercase text-gold mb-2 text-center">
            Our Focus Areas
          </div>
          <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-semibold text-navy leading-tight mb-8 text-center">
            Four pillars of systemic change
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: Users,
                iconColor: "#185FA5",
                iconBg: "#E6F1FB",
                title: "Financial Inclusion",
                text: "Enabling millions — especially women and rural communities — to access transformative financial services.",
                link: "/our-work",
              },
              {
                icon: Shield,
                iconColor: "#854F0B",
                iconBg: "var(--gold-bg)",
                title: "Climate Finance",
                text: "Mobilising capital toward adaptation and resilience for Africa's most vulnerable communities.",
                link: "/our-work",
              },
              {
                icon: BarChart3,
                iconColor: "#27500A",
                iconBg: "var(--green-bg)",
                title: "Capital Markets",
                text: "Developing deep, efficient, and inclusive capital markets for long-term African investment.",
                link: "/our-work",
              },
              {
                icon: Clock,
                iconColor: "#7D3FC0",
                iconBg: "var(--purple-bg)",
                title: "Policy & Regulation",
                text: "Shaping the rules that govern financial systems and determine who benefits.",
                link: "/our-work",
              },
            ].map((card, i) => (
              <Link
                key={i}
                href={card.link}
                className="bg-white border border-border rounded-lg overflow-hidden p-5 hover:shadow-lg transition-shadow group"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3.5"
                  style={{ backgroundColor: card.iconBg }}
                >
                  <card.icon className="w-5 h-5" style={{ color: card.iconColor }} strokeWidth={1.8} />
                </div>
                <h3 className="font-serif text-[15px] font-semibold text-navy mb-1.5">{card.title}</h3>
                <p className="text-xs text-muted leading-relaxed mb-3">{card.text}</p>
                <span className="text-xs font-semibold text-mid flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="px-4 sm:px-10 py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-[10px] font-bold tracking-[2.5px] uppercase text-gold mb-2 text-center">
            Leadership
          </div>
          <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-semibold text-navy leading-tight mb-8 text-center">
            Meet the team guiding our mission
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {people.slice(0, 6).map((person) => (
              <div key={person.id} className="bg-off rounded-lg p-6 border border-border text-center">
                <div className="w-16 h-16 rounded-full bg-navy/10 mx-auto mb-3 flex items-center justify-center overflow-hidden">
                  {person.featured_image?.source_url ? (
                    <Image src={person.featured_image.source_url} alt={person.title.rendered} width={64} height={64} className="w-full h-full object-cover" />
                  ) : (
                    <Users className="w-7 h-7 text-navy/40" />
                  )}
                </div>
                <h3
                  className="font-serif text-base font-semibold text-navy"
                  dangerouslySetInnerHTML={{ __html: person.title.rendered }}
                />
                <div className="text-xs text-mid font-medium mb-2">{person.acf?.role || "Team Member"}</div>
                <p className="text-xs text-muted leading-relaxed">
                  {person.acf?.biography || person.content.rendered.replace(/<[^>]+>/g, "").slice(0, 120)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
