"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { useRef, useState, useEffect, type ReactNode } from "react";
import {
  Globe,
  Users,
  Shield,
  BarChart3,
  Clock,
  ArrowRight,
  Download,
  ExternalLink,
  User,
  Home as HomeIcon,
  Map,
} from "lucide-react";
import type { Story, Publication } from "@/lib/types";
import HeroBanner from "./HeroBanner";

interface HomeClientProps {
  featuredStories: Story[];
  latestPublications: Publication[];
}

/* ── Animation helpers ── */

function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(target);
    };
    requestAnimationFrame(animate);
  }, [hasStarted, target, duration]);

  return (
    <span ref={ref} className="will-change-transform">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

function SectionReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0.9, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardReveal: Variants = {
  hidden: { opacity: 0.85, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* ── Page ── */

export default function HomeClient({ featuredStories, latestPublications }: HomeClientProps) {
  const pubCount = latestPublications.length;
  return (
    <div className="flex flex-col">
      <HeroBanner minHeight="min-h-[480px] sm:min-h-[540px]" innerClassName="w-full">
        <div className="max-w-[580px] mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 bg-gold px-3 py-1.5 rounded-sm mb-5 mx-auto">
            <Globe className="w-3 h-3 text-white" />
            <span className="text-[10px] font-bold tracking-[2.5px] uppercase text-white">
              Shaping Africa&apos;s Financial Future
            </span>
          </div>
          <h1 className="font-serif text-[clamp(2.25rem,5vw,3.25rem)] leading-[1.15] text-white mb-4">
            Finance that works
            <br />
            <em className="text-sky">for everyone.</em>
          </h1>
          <p className="text-base text-white/70 leading-[1.75] mb-7 max-w-[480px] mx-auto font-light">
            FSD Africa partners with financial systems, policymakers, and
            innovators across the continent to build economies where every person
            and business can participate, grow, and thrive.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button className="bg-mid text-white text-[13px] font-semibold px-6 py-2.5 rounded cursor-pointer hover:bg-mid/90 transition-colors">
              Explore our work
            </button>
            <button className="bg-transparent text-white text-[13px] font-semibold px-6 py-2.5 rounded cursor-pointer border border-white/35 hover:bg-white/10 transition-colors">
              Read impact stories
            </button>
          </div>
        </div>
        <div className="absolute left-4 sm:left-9 bottom-5 w-[180px] sm:w-[200px] h-[100px] sm:h-[120px] border border-white/10 rounded-lg flex flex-col items-center justify-center gap-2">
          <Map className="w-[50px] sm:w-[60px] h-[50px] sm:h-[60px] text-white opacity-30" />
          <span className="text-[9px] text-white/30 tracking-[2px] uppercase">
            38 countries
          </span>
        </div>
      </HeroBanner>

      {/* STATS BAR */}
      <SectionReveal>
        <div className="bg-blue grid grid-cols-2 lg:grid-cols-4">
          {[
            { target: 38, suffix: "", prefix: "", l: "Countries of active engagement" },
            { target: 200, suffix: "M+", prefix: "$", l: "Capital mobilised" },
            { target: 150, suffix: "+", prefix: "", l: "Partners & grantees" },
            { target: 12, suffix: "M+", prefix: "", l: "People reached" },
          ].map((stat, i) => (
            <div
              key={i}
              className="py-5 px-6 text-center border-r border-b lg:border-b-0 border-white/10 last:border-r-0"
            >
              <div className="font-serif text-[28px] font-bold text-white leading-none">
                <AnimatedCounter target={stat.target} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <div className="text-[11px] text-white/60 mt-1.5 leading-snug">
                {stat.l}
              </div>
            </div>
          ))}
        </div>
      </SectionReveal>

      {/* WHAT WE DO */}
      <SectionReveal>
        <section className="px-4 sm:px-10 py-12 bg-white">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
            <div>
              <div className="text-[10px] font-bold tracking-[2.5px] uppercase text-gold mb-2">
                What we do
              </div>
              <div className="font-serif text-[clamp(1.5rem,3.5vw,1.875rem)] font-semibold text-navy leading-tight">
                Building systems that leave no one behind
              </div>
            </div>
            <Link href="/our-work" className="text-xs text-mid font-semibold whitespace-nowrap hover:underline">
              View all work →
            </Link>
          </div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {[
              {
                stripe: "bg-mid",
                iconBg: "#E6F1FB",
                iconColor: "#185FA5",
                icon: Users,
                title: "Financial Inclusion",
                text: "Enabling millions of people — especially women and rural communities — to access services that transform their lives.",
                linkColor: "text-mid",
              },
              {
                stripe: "bg-gold",
                iconBg: "var(--gold-bg)",
                iconColor: "#854F0B",
                icon: Shield,
                title: "Climate Finance",
                text: "Mobilising and directing capital toward adaptation and resilience — protecting Africa's most vulnerable communities.",
                linkColor: "text-gold",
              },
              {
                stripe: "bg-green",
                iconBg: "var(--green-bg)",
                iconColor: "#27500A",
                icon: BarChart3,
                title: "Capital Markets",
                text: "Developing deep, efficient, and inclusive capital markets that unlock long-term investment in African economies.",
                linkColor: "text-green",
              },
              {
                stripe: "bg-purple",
                iconBg: "var(--purple-bg)",
                iconColor: "#7D3FC0",
                icon: Clock,
                title: "Policy & Regulation",
                text: "Shaping the rules that govern financial systems — determining who benefits and who is left behind.",
                linkColor: "text-purple",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                variants={cardReveal}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="border border-border rounded-lg overflow-hidden cursor-pointer bg-white hover:shadow-xl transition-shadow"
              >
                <div className={`h-1 ${card.stripe}`} />
                <div className="p-5">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-3.5"
                    style={{ backgroundColor: card.iconBg }}
                  >
                    <card.icon
                      className="w-5 h-5"
                      style={{ color: card.iconColor }}
                      strokeWidth={1.8}
                    />
                  </div>
                  <h3 className="font-serif text-[15px] font-semibold text-navy mb-1.5">
                    {card.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed">{card.text}</p>
                  <div className={`mt-3.5 text-xs font-semibold flex items-center gap-1 ${card.linkColor}`}>
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </SectionReveal>

      {/* QUOTE */}
      <SectionReveal>
        <div className="bg-navy px-4 sm:px-10 py-10 text-center border-t-2 border-mid relative">
          <blockquote className="font-serif text-xl italic text-white max-w-[640px] mx-auto mb-3 leading-relaxed">
            &quot;Africa&apos;s economic transformation depends on financial systems that
            are inclusive, resilient, and fit for the future. That is the mission
            we pursue every day.&quot;
          </blockquote>
          <cite className="text-xs text-sky font-normal font-semibold not-italic">
            Mark Napier — Chief Executive Officer, FSD Africa
          </cite>
        </div>
      </SectionReveal>

      {/* IMPACT STORIES */}
      <SectionReveal>
        <section className="px-4 sm:px-10 py-12 bg-off">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
            <div>
              <div className="text-[10px] font-bold tracking-[2.5px] uppercase text-gold mb-2">
                Impact & Stories
              </div>
              <div className="font-serif text-[clamp(1.5rem,3.5vw,1.875rem)] font-semibold text-navy leading-tight">
                Real change, real lives
              </div>
            </div>
            <Link href="/impact" className="text-xs text-mid font-semibold whitespace-nowrap hover:underline">
              All stories →
            </Link>
          </div>

          {/* Impact Numbers */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-9"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {[
              { bg: "bg-navy", target: 12, suffix: "M+", prefix: "", l: "People with improved access to financial services" },
              { bg: "bg-blue", target: 200, suffix: "M", prefix: "$", l: "Capital mobilised for underserved markets" },
              { bg: "bg-gold", target: 47, suffix: "", prefix: "", l: "Policy and regulatory reforms influenced" },
              { bg: "bg-green", target: 62, suffix: "%", prefix: "", l: "Of beneficiaries identify as women" },
            ].map((num, i) => (
              <motion.div
                key={i}
                variants={cardReveal}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`${num.bg} rounded-lg p-6 text-center cursor-default`}
              >
                <div className="font-serif text-[32px] font-bold text-white leading-none">
                  <AnimatedCounter target={num.target} prefix={num.prefix} suffix={num.suffix} />
                </div>
                <div className="text-[11px] text-white/75 mt-1.5 leading-snug">
                  {num.l}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stories Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {featuredStories.map((story, i) => {
              const palettes = [
                { bg: "#E6F1FB", color: "#185FA5", tagBg: "#E6F1FB", tagColor: "#0C447C" },
                { bg: "var(--gold-bg)", color: "#854F0B", tagBg: "var(--gold-bg)", tagColor: "#633806" },
                { bg: "var(--green-bg)", color: "#27500A", tagBg: "var(--green-bg)", tagColor: "#173404" },
              ];
              const p = palettes[i % palettes.length];
              const Icon = i === 0 ? User : i === 1 ? Shield : HomeIcon;
              const location = story.acf?.location || "";
              const theme = story.themes?.[0]?.name || "";
              const tag = [location, theme].filter(Boolean).join(" · ");
              const statN = story.acf?.stat_number || "";
              const statL = story.acf?.stat_label || "";

              return (
                <motion.div
                  key={story.id}
                  variants={cardReveal}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="bg-white border border-border rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                >
                  <Link href={`/stories/${story.slug}`} className="block">
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
                      <p className="text-[11px] text-muted leading-relaxed">
                        {story.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 140)}...
                      </p>
                    </div>
                    {(statN || statL) && (
                      <div className="px-4 py-3 border-t border-border flex gap-5">
                        <div>
                          <div className="font-serif text-lg font-bold text-blue">{statN}</div>
                          <div className="text-[9px] text-muted mt-0.5">{statL}</div>
                        </div>
                      </div>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </section>
      </SectionReveal>

      {/* KNOWLEDGE HUB */}
      <SectionReveal>
        <section className="px-4 sm:px-10 py-12 bg-white">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
            <div>
              <div className="text-[10px] font-bold tracking-[2.5px] uppercase text-gold mb-2">
                Knowledge Hub
              </div>
              <div className="font-serif text-[clamp(1.5rem,3.5vw,1.875rem)] font-semibold text-navy leading-tight">
                Latest research & insights
              </div>
            </div>
            <Link href="/knowledge-hub" className="text-xs text-mid font-semibold whitespace-nowrap hover:underline">
              Browse all {pubCount}+ →
            </Link>
          </div>
          <motion.div
            className="flex flex-col gap-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {latestPublications.map((item) => {
              const typeConfig: Record<string, { label: string; bg: string; color: string }> = {
                research: { label: "Research", bg: "#E6F1FB", color: "#0C447C" },
                policy_brief: { label: "Policy Brief", bg: "var(--gold-bg)", color: "#633806" },
                data_tool: { label: "Data Tool", bg: "var(--green-bg)", color: "#173404" },
                case_study: { label: "Case Study", bg: "var(--purple-bg)", color: "#534AB7" },
                explainer: { label: "Explainer", bg: "#F1ECFB", color: "#534AB7" },
              };
              const cfg = typeConfig[item.acf?.publication_type || ""] || typeConfig.research;
              const date = new Date(item.date).toLocaleDateString("en-GB", { year: "numeric", month: "short" });
              const Icon = item.acf?.external_url ? ExternalLink : Download;

              return (
                <motion.div
                  key={item.id}
                  variants={cardReveal}
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  className="flex items-center gap-3 px-3.5 py-3 border border-border rounded-md cursor-pointer hover:border-mid transition-colors bg-white"
                >
                  <Link href={`/publications/${item.slug}`} className="flex items-center gap-3 flex-1 min-w-0">
                    <span
                      className="text-[9px] font-bold tracking-[1.5px] uppercase px-2 py-0.5 rounded-sm whitespace-nowrap"
                      style={{ backgroundColor: cfg.bg, color: cfg.color }}
                    >
                      {cfg.label || "Publication"}
                    </span>
                    <span
                      className="flex-1 text-[13px] font-medium text-navy truncate"
                      dangerouslySetInnerHTML={{ __html: item.title.rendered }}
                    />
                    <span className="text-[11px] text-muted whitespace-nowrap hidden sm:block">
                      {date}
                    </span>
                    <div className="text-muted">
                      <Icon className="w-4 h-4" strokeWidth={1.8} />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </section>
      </SectionReveal>

      {/* NEWSLETTER */}
      <SectionReveal>
        <div className="bg-blue px-4 sm:px-10 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <h4 className="text-[15px] font-semibold text-white mb-1">
              Stay current with FSD Africa
            </h4>
            <p className="text-xs text-white/60">
              Research, events, and insights — delivered to your inbox.
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="bg-white/10 border border-white/20 rounded px-3.5 py-2 text-xs text-white/50 min-w-0 flex-1 sm:min-w-[200px] outline-none placeholder:text-white/50"
            />
            <button className="bg-gold text-white text-xs font-semibold px-[18px] py-2 rounded cursor-pointer whitespace-nowrap hover:bg-gold/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </SectionReveal>

      {/* FOOTER */}
      <SectionReveal>
        <footer className="bg-navy px-4 sm:px-10 pt-10 pb-6 relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-9 mb-8">
            <div>
              <span className="font-serif text-lg font-bold text-white">
                FSD <span className="text-sky">Africa</span>
              </span>
              <p className="text-xs text-white/40 leading-relaxed mt-2.5 max-w-[220px]">
                Building financial systems that work for Africa&apos;s people. Funded
                by the UK&apos;s Foreign Commonwealth & Development Office.
              </p>
              <div className="flex gap-3 mt-3.5">
                {/* Twitter */}
                <svg
                  className="w-4 h-4 text-white/35 hover:text-white/60 transition-colors cursor-pointer"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
                {/* LinkedIn */}
                <svg
                  className="w-4 h-4 text-white/35 hover:text-white/60 transition-colors cursor-pointer"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  viewBox="0 0 24 24"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                {/* YouTube */}
                <svg
                  className="w-4 h-4 text-white/35 hover:text-white/60 transition-colors cursor-pointer"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  viewBox="0 0 24 24"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
                </svg>
              </div>
            </div>
            <div>
              <h5 className="text-[9px] font-bold tracking-[2.5px] uppercase text-sky mb-3.5">
                Our Work
              </h5>
              <ul className="list-none flex flex-col gap-2">
                {[
                  { label: "Financial Inclusion", href: "/our-work" },
                  { label: "Climate Finance", href: "/our-work" },
                  { label: "Capital Markets", href: "/our-work" },
                  { label: "Policy & Regulation", href: "/our-work" },
                  { label: "Programmes", href: "/our-work" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-white/50 text-xs hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-[9px] font-bold tracking-[2.5px] uppercase text-sky mb-3.5">
                Knowledge
              </h5>
              <ul className="list-none flex flex-col gap-2">
                {[
                  { label: "Research Reports", href: "/knowledge-hub" },
                  { label: "Policy Briefs", href: "/knowledge-hub" },
                  { label: "Data Tools", href: "/knowledge-hub" },
                  { label: "Case Studies", href: "/knowledge-hub" },
                  { label: "Explainers", href: "/knowledge-hub" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-white/50 text-xs hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-[9px] font-bold tracking-[2.5px] uppercase text-sky mb-3.5">
                Organisation
              </h5>
              <ul className="list-none flex flex-col gap-2">
                {[
                  { label: "About Us", href: "/about" },
                  { label: "Leadership", href: "/about" },
                  { label: "Partners", href: "#" },
                  { label: "Careers", href: "#" },
                  { label: "Contact", href: "/contact" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-white/50 text-xs hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-[18px] flex flex-col sm:flex-row justify-between gap-2">
            <p className="text-[11px] text-white/28">
              © 2026 FSD Africa. All rights reserved.
            </p>
            <p className="text-[11px] text-white/28">
              Privacy Policy · Terms of Use · Accessibility
            </p>
          </div>
        </footer>
      </SectionReveal>
    </div>
  );
}
