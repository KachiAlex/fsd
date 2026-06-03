import type { Metadata } from "next";
import Link from "next/link";
import { Globe, Users, Shield, User, Home as HomeIcon } from "lucide-react";
import WebPageJsonLd from "../components/WebPageJsonLd";
import HeroBanner from "../components/HeroBanner";
import { getStories, getCountries } from "@/lib/wordpress";
import { getImpactStats } from "@/lib/queries";
import type { Story } from "@/lib/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Impact",
  description:
    "Discover the real-world impact of FSD Africa's work across the continent.",
  alternates: {
    canonical: "/impact",
  },
  openGraph: {
    title: "Impact | FSD Africa",
    description:
      "Discover the real-world impact of FSD Africa's work across the continent.",
    url: "/impact",
  },
  twitter: {
    title: "Impact | FSD Africa",
    description:
      "Discover the real-world impact of FSD Africa's work across the continent.",
  },
};

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties; strokeWidth?: number }>> = {
  User,
  Shield,
  Users,
};

function StoryCard({ story, index }: { story: Story; index: number }) {
  const statNumber = story.acf?.stat_number || "";
  const statLabel = story.acf?.stat_label || "";
  const location = story.acf?.location || "";
  const theme = story.themes?.[0]?.name || "";
  const tag = [location, theme].filter(Boolean).join(" · ");

  const palettes = [
    { bg: "#E6F1FB", color: "#185FA5", tagBg: "#E6F1FB", tagColor: "#0C447C" },
    { bg: "var(--gold-bg)", color: "#854F0B", tagBg: "var(--gold-bg)", tagColor: "#633806" },
    { bg: "var(--green-bg)", color: "#27500A", tagBg: "var(--green-bg)", tagColor: "#173404" },
  ];
  const p = palettes[index % palettes.length];
  const Icon = index === 0 ? User : index === 1 ? Shield : HomeIcon;

  return (
    <Link
      href={`/stories/${story.slug}`}
      className="bg-off border border-border rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow block"
    >
      <div className="h-20 flex items-center justify-center" style={{ backgroundColor: p.bg }}>
        <Icon className="w-9 h-9 opacity-70" style={{ color: p.color }} strokeWidth={1.5} />
      </div>
      <div className="p-4">
        <span
          className="inline-block text-[9px] font-bold tracking-[1.5px] uppercase px-2 py-0.5 rounded-sm mb-2"
          style={{ backgroundColor: p.tagBg, color: p.tagColor }}
        >
          {tag}
        </span>
        <h3
          className="font-serif text-sm font-semibold text-navy leading-snug mb-1.5"
          dangerouslySetInnerHTML={{ __html: story.title.rendered }}
        />
        <p className="text-[11px] text-muted leading-relaxed line-clamp-3">
          {story.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 140)}...
        </p>
      </div>
      {(statNumber || statLabel) && (
        <div className="px-4 py-3 border-t border-border flex gap-5">
          <div>
            <div className="font-serif text-lg font-bold text-blue">{statNumber}</div>
            <div className="text-[9px] text-muted mt-0.5">{statLabel}</div>
          </div>
        </div>
      )}
    </Link>
  );
}

export default async function ImpactPage() {
  const [stories, countries, stats] = await Promise.all([
    getStories({ per_page: 3, orderby: "date", order: "desc" }),
    getCountries({ per_page: 100 }),
    getImpactStats(),
  ]);

  const impactNumbers = [
    { bg: "bg-navy", n: "12M+", l: "People with improved access to financial services" },
    { bg: "bg-blue", n: "$200M", l: "Capital mobilised for underserved markets" },
    { bg: "bg-gold", n: "47", l: "Policy and regulatory reforms influenced" },
    { bg: "bg-green", n: "62%", l: "Of beneficiaries identify as women" },
  ];

  return (
    <>
      <WebPageJsonLd
        title="Impact | FSD Africa"
        description="Discover the real-world impact of FSD Africa's work across the continent."
        path="/impact"
      />
      <div className="flex flex-col">
        <HeroBanner>
          <div className="inline-flex items-center gap-1.5 bg-gold px-3 py-1.5 rounded-sm mb-5 mx-auto">
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
          <p className="text-base text-white/70 leading-[1.75] max-w-2xl mx-auto font-light">
            Our work touches millions of people across Africa. These numbers
            represent lives transformed, markets strengthened, and systems rebuilt.
          </p>
        </HeroBanner>

        {/* IMPACT NUMBERS */}
        <section className="px-4 sm:px-10 py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {impactNumbers.map((num, i) => (
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
              {stories.data.map((story, i) => (
                <StoryCard key={story.id} story={story} index={i} />
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
              Active in {stats.countriesReached} countries
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {countries.map((country) => (
                <div key={country.id} className="bg-white border border-border rounded-lg px-4 py-3 text-center text-sm font-medium text-navy">
                  {country.title?.rendered || country.slug}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
