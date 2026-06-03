import Link from "next/link";
import { Globe, Users, Shield, BarChart3, Clock, ArrowRight, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Our Work | FSD Africa",
  description: "Explore FSD Africa's programmes in financial inclusion, climate finance, capital markets, and policy.",
};

export default function OurWorkPage() {
  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="relative overflow-hidden min-h-[380px] sm:min-h-[420px] flex items-center justify-center px-4 sm:px-10 py-16 sm:py-20">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/hero-banner.png)" }} />
        <div className="absolute inset-0 bg-navy/70" />
        <div className="relative z-10 max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 bg-gold px-3 py-1.5 rounded-sm mb-5 mx-auto">
            <Globe className="w-3 h-3 text-white" />
            <span className="text-[10px] font-bold tracking-[2.5px] uppercase text-white">
              Our Work
            </span>
          </div>
          <h1 className="font-serif text-[clamp(2.25rem,5vw,3.25rem)] leading-[1.15] text-white mb-4">
            Programmes that drive
            <br />
            <em className="text-sky">real change.</em>
          </h1>
          <p className="text-base text-white/70 leading-[1.75] max-w-2xl mx-auto font-light">
            We design and implement programmes that tackle the root causes of financial
            exclusion — from policy reform to product innovation.
          </p>
        </div>
      </section>

      {/* PILLARS */}
      <section className="px-4 sm:px-10 py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-[10px] font-bold tracking-[2.5px] uppercase text-gold mb-2 text-center">
            Focus Areas
          </div>
          <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-semibold text-navy leading-tight mb-8 text-center">
            Four pillars of systemic change
          </h2>
          <div className="flex flex-col gap-8">
            {[
              {
                stripe: "bg-mid",
                icon: Users,
                iconBg: "#E6F1FB",
                iconColor: "#185FA5",
                title: "Financial Inclusion",
                text: "We work to ensure that financial services are accessible, affordable, and appropriate for everyone — particularly women, rural communities, and informal sector workers. Our programmes support digital financial services, savings groups, and microfinance institutions to reach underserved populations.",
                stats: [
                  { n: "12M+", l: "People reached" },
                  { n: "62%", l: "Women beneficiaries" },
                ],
              },
              {
                stripe: "bg-gold",
                icon: Shield,
                iconBg: "var(--gold-bg)",
                iconColor: "#854F0B",
                title: "Climate Finance",
                text: "Climate change threatens Africa's development. We mobilise capital for climate adaptation and resilience, helping communities prepare for shocks. From green bonds to insurance products, we build financial tools that protect livelihoods.",
                stats: [
                  { n: "$30M", l: "Green bonds issued" },
                  { n: "14", l: "Countries with climate programmes" },
                ],
              },
              {
                stripe: "bg-green",
                icon: BarChart3,
                iconBg: "var(--green-bg)",
                iconColor: "#27500A",
                title: "Capital Markets",
                text: "Deep and efficient capital markets are essential for long-term economic growth. We support the development of bond markets, pension reform, and institutional investor engagement to unlock domestic and international capital for African economies.",
                stats: [
                  { n: "$200M+", l: "Capital mobilised" },
                  { n: "8", l: "Markets supported" },
                ],
              },
              {
                stripe: "bg-purple",
                icon: Clock,
                iconBg: "var(--purple-bg)",
                iconColor: "#7D3FC0",
                title: "Policy & Regulation",
                text: "The rules that govern financial systems determine who benefits. We work with central banks, regulators, and ministries of finance to develop policies that promote inclusion, stability, and innovation while protecting consumers.",
                stats: [
                  { n: "47", l: "Reforms influenced" },
                  { n: "22", l: "Regulators partnered" },
                ],
              },
            ].map((pillar, i) => (
              <div key={i} className="border border-border rounded-lg overflow-hidden bg-white">
                <div className={`h-1 ${pillar.stripe}`} />
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: pillar.iconBg }}
                    >
                      <pillar.icon className="w-6 h-6" style={{ color: pillar.iconColor }} strokeWidth={1.8} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-lg font-semibold text-navy mb-2">{pillar.title}</h3>
                      <p className="text-sm text-muted leading-relaxed mb-4">{pillar.text}</p>
                      <div className="flex gap-6">
                        {pillar.stats.map((s, j) => (
                          <div key={j}>
                            <div className="font-serif text-xl font-bold text-navy">{s.n}</div>
                            <div className="text-[11px] text-muted">{s.l}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="px-4 sm:px-10 py-12 sm:py-16 bg-off">
        <div className="max-w-4xl mx-auto">
          <div className="text-[10px] font-bold tracking-[2.5px] uppercase text-gold mb-2 text-center">
            Approach
          </div>
          <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-semibold text-navy leading-tight mb-8 text-center">
            Partnership is at the heart of everything
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: "Co-design",
                text: "We work alongside local partners to design interventions that fit context and culture.",
              },
              {
                title: "Technical Assistance",
                text: "We bring world-class expertise in finance, policy, and development to strengthen local capacity.",
              },
              {
                title: "Capital Mobilisation",
                text: "We connect African markets with domestic and international investors to scale proven solutions.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-border rounded-lg p-6">
                <div className="font-serif text-base font-semibold text-navy mb-2">{item.title}</div>
                <p className="text-xs text-muted leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
