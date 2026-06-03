import Link from "next/link";
import { Globe, Users, Shield, BarChart3, Clock, ArrowRight, Search, Menu, X } from "lucide-react";

export const metadata = {
  title: "About Us | FSD Africa",
  description: "Learn about FSD Africa's mission to build inclusive financial systems across the continent.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy px-4 sm:px-10 py-16 sm:py-20">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_#2e86c1_0%,_transparent_60%)]" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 bg-gold px-3 py-1.5 rounded-sm mb-5">
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
          <p className="text-base text-white/70 leading-[1.75] max-w-2xl font-light">
            FSD Africa is a specialist development agency working to reduce poverty
            across sub-Saharan Africa by building financial markets that are efficient,
            robust, and inclusive.
          </p>
        </div>
      </section>

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
                { n: "38", l: "Countries" },
                { n: "150+", l: "Partners" },
                { n: "$200M+", l: "Capital mobilised" },
                { n: "12M+", l: "People reached" },
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
            {[
              {
                name: "Mark Napier",
                role: "Chief Executive Officer",
                bio: "Leading FSD Africa's strategy to transform financial systems across the continent.",
              },
              {
                name: "Sarah Odei",
                role: "Director of Programmes",
                bio: "Overseeing programme delivery and partnerships in 38 countries.",
              },
              {
                name: "James Mwangi",
                role: "Head of Policy & Research",
                bio: "Driving evidence-based policy reform and regulatory innovation.",
              },
            ].map((person, i) => (
              <div key={i} className="bg-off rounded-lg p-6 border border-border text-center">
                <div className="w-16 h-16 rounded-full bg-navy/10 mx-auto mb-3 flex items-center justify-center">
                  <Users className="w-7 h-7 text-navy/40" />
                </div>
                <h3 className="font-serif text-base font-semibold text-navy">{person.name}</h3>
                <div className="text-xs text-mid font-medium mb-2">{person.role}</div>
                <p className="text-xs text-muted leading-relaxed">{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
