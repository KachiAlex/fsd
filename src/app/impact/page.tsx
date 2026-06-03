import Link from "next/link";
import { Globe, Users, Shield, User, Home as HomeIcon, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Impact | FSD Africa",
  description: "Discover the real-world impact of FSD Africa's work across the continent.",
};

export default function ImpactPage() {
  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy px-4 sm:px-10 py-16 sm:py-20">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_#2e86c1_0%,_transparent_60%)]" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 bg-gold px-3 py-1.5 rounded-sm mb-5">
            <Globe className="w-3 h-3 text-white" />
            <span className="text-[10px] font-bold tracking-[2.5px] uppercase text-white">
              Impact
            </span>
          </div>
          <h1 className="font-serif text-[clamp(2.25rem,5vw,3.25rem)] leading-[1.15] text-white mb-4">
            Real change,
            <br />
            <em className="text-sky">real lives.</em>
          </h1>
          <p className="text-base text-white/70 leading-[1.75] max-w-2xl font-light">
            Our work touches millions of people across Africa. These numbers
            represent lives transformed, markets strengthened, and systems rebuilt.
          </p>
        </div>
      </section>

      {/* IMPACT NUMBERS */}
      <section className="px-4 sm:px-10 py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
              { bg: "bg-navy", n: "12M+", l: "People with improved access to financial services" },
              { bg: "bg-blue", n: "$200M", l: "Capital mobilised for underserved markets" },
              { bg: "bg-gold", n: "47", l: "Policy and regulatory reforms influenced" },
              { bg: "bg-green", n: "62%", l: "Of beneficiaries identify as women" },
            ].map((num, i) => (
              <div key={i} className={`${num.bg} rounded-lg p-6 text-center`}>
                <div className="font-serif text-[32px] font-bold text-white leading-none">{num.n}</div>
                <div className="text-[11px] text-white/75 mt-1.5 leading-snug">{num.l}</div>
              </div>
            ))}
          </div>

          <div className="text-[10px] font-bold tracking-[2.5px] uppercase text-gold mb-2 text-center">
            Stories of Change
          </div>
          <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-semibold text-navy leading-tight mb-8 text-center">
            From data to lived experience
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                thumbBg: "#E6F1FB",
                thumbColor: "#185FA5",
                icon: User,
                tagBg: "#E6F1FB",
                tagColor: "#0C447C",
                tag: "Kenya · Inclusion",
                title: `"My savings account changed everything"`,
                text: "For Wanjiru, a smallholder farmer in Nakuru, mobile savings was the difference between absorbing a bad harvest and losing her farm.",
                statN: "3.2M",
                statL: "Farmers reached",
              },
              {
                thumbBg: "var(--gold-bg)",
                thumbColor: "#854F0B",
                icon: Shield,
                tagBg: "var(--gold-bg)",
                tagColor: "#633806",
                tag: "Rwanda · Climate",
                title: "Green bonds, green futures: Rwanda's climate model",
                text: "Rwanda's inaugural sovereign green bond raised $30M for climate-resilient infrastructure — a framework FSD Africa helped develop.",
                statN: "$30M",
                statL: "Capital raised",
              },
              {
                thumbBg: "var(--green-bg)",
                thumbColor: "#27500A",
                icon: HomeIcon,
                tagBg: "var(--green-bg)",
                tagColor: "#173404",
                tag: "Ghana · Women",
                title: "Closing the gap — Fatima grows her business",
                text: "With access to an AFAWA-supported loan product, Fatima hired 8 staff and expanded her textile business across two districts in Accra.",
                statN: "42K",
                statL: "Women entrepreneurs supported",
              },
            ].map((story, i) => (
              <div
                key={i}
                className="bg-off border border-border rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="h-20 flex items-center justify-center" style={{ backgroundColor: story.thumbBg }}>
                  <story.icon className="w-9 h-9 opacity-70" style={{ color: story.thumbColor }} strokeWidth={1.5} />
                </div>
                <div className="p-4">
                  <span
                    className="inline-block text-[9px] font-bold tracking-[1.5px] uppercase px-2 py-0.5 rounded-sm mb-2"
                    style={{ backgroundColor: story.tagBg, color: story.tagColor }}
                  >
                    {story.tag}
                  </span>
                  <h3 className="font-serif text-sm font-semibold text-navy leading-snug mb-1.5">{story.title}</h3>
                  <p className="text-[11px] text-muted leading-relaxed">{story.text}</p>
                </div>
                <div className="px-4 py-3 border-t border-border flex gap-5">
                  <div>
                    <div className="font-serif text-lg font-bold text-blue">{story.statN}</div>
                    <div className="text-[9px] text-muted mt-0.5">{story.statL}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COUNTRY SPOTLIGHT */}
      <section className="px-4 sm:px-10 py-12 sm:py-16 bg-off">
        <div className="max-w-4xl mx-auto">
          <div className="text-[10px] font-bold tracking-[2.5px] uppercase text-gold mb-2 text-center">
            Where We Work
          </div>
          <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-semibold text-navy leading-tight mb-8 text-center">
            Active in 38 countries
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              "Kenya", "Nigeria", "Ghana", "Rwanda",
              "Ethiopia", "Tanzania", "Uganda", "Zambia",
              "Malawi", "Mozambique", "Senegal", "South Africa",
            ].map((country, i) => (
              <div key={i} className="bg-white border border-border rounded-lg px-4 py-3 text-center text-sm font-medium text-navy">
                {country}
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-muted mt-4">And 26 more across sub-Saharan Africa.</p>
        </div>
      </section>
    </div>
  );
}
