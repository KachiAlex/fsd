import Link from "next/link";
import { Globe, Search, Download, ExternalLink, FileText, Database, BookOpen } from "lucide-react";

export const metadata = {
  title: "Knowledge Hub | FSD Africa",
  description: "Access FSD Africa's research reports, policy briefs, data tools, and case studies.",
};

export default function KnowledgeHubPage() {
  const resources = [
    {
      tag: "Research",
      tagBg: "#E6F1FB",
      tagColor: "#0C447C",
      title: "State of Financial Inclusion in Sub-Saharan Africa 2024",
      date: "Mar 2024",
      description: "Comprehensive analysis of financial inclusion trends across 38 countries, with a focus on gender gaps and rural access.",
      icon: FileText,
    },
    {
      tag: "Policy Brief",
      tagBg: "var(--gold-bg)",
      tagColor: "#633806",
      title: "Regulatory Approaches to Digital Credit: Lessons from East Africa",
      date: "Jan 2024",
      description: "A comparative study of how Kenya, Tanzania, and Rwanda regulate digital lending to protect consumers.",
      icon: FileText,
    },
    {
      tag: "Data Tool",
      tagBg: "var(--green-bg)",
      tagColor: "#173404",
      title: "Africa Financial Inclusion Dashboard",
      date: "Quarterly",
      description: "Interactive data explorer tracking access, usage, and quality of financial services across the continent.",
      icon: Database,
    },
    {
      tag: "Case Study",
      tagBg: "var(--purple-bg)",
      tagColor: "#534AB7",
      title: "How Kenya's DFS Ecosystem Became a Global Model",
      date: "Nov 2023",
      description: "Examining the regulatory, technical, and market factors behind Kenya's mobile money success story.",
      icon: BookOpen,
    },
    {
      tag: "Research",
      tagBg: "#E6F1FB",
      tagColor: "#0C447C",
      title: "Climate Risk and Financial Stability in Southern Africa",
      date: "Oct 2023",
      description: "Assessing how climate shocks affect financial institutions and what regulators can do to build resilience.",
      icon: FileText,
    },
    {
      tag: "Policy Brief",
      tagBg: "var(--gold-bg)",
      tagColor: "#633806",
      title: "Pension Reform and Long-Term Capital Markets",
      date: "Sep 2023",
      description: "Recommendations for unlocking pension fund capital for infrastructure and green investment.",
      icon: FileText,
    },
    {
      tag: "Data Tool",
      tagBg: "var(--green-bg)",
      tagColor: "#173404",
      title: "Green Bond Tracker — Africa",
      date: "Updated Monthly",
      description: "Real-time database of green, social, and sustainability bonds issued in African markets.",
      icon: Database,
    },
    {
      tag: "Case Study",
      tagBg: "var(--purple-bg)",
      tagColor: "#534AB7",
      title: "Rwanda's Green Bond Framework",
      date: "Aug 2023",
      description: "How Rwanda became the first African country to issue a sovereign green bond.",
      icon: BookOpen,
    },
  ];

  const categories = [
    { label: "All", count: 200 },
    { label: "Research Reports", count: 68 },
    { label: "Policy Briefs", count: 45 },
    { label: "Data Tools", count: 22 },
    { label: "Case Studies", count: 65 },
  ];

  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy px-4 sm:px-10 py-16 sm:py-20">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_#2e86c1_0%,_transparent_60%)]" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 bg-gold px-3 py-1.5 rounded-sm mb-5">
            <Globe className="w-3 h-3 text-white" />
            <span className="text-[10px] font-bold tracking-[2.5px] uppercase text-white">
              Knowledge Hub
            </span>
          </div>
          <h1 className="font-serif text-[clamp(2.25rem,5vw,3.25rem)] leading-[1.15] text-white mb-4">
            Research & insights
            <br />
            <em className="text-sky">for Africa's future.</em>
          </h1>
          <p className="text-base text-white/70 leading-[1.75] max-w-2xl font-light">
            Browse our library of reports, policy briefs, data tools, and case
            studies — all designed to inform better decisions.
          </p>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="px-4 sm:px-10 py-6 bg-off border-b border-border">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, i) => (
              <button
                key={i}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                  i === 0
                    ? "bg-navy text-white border-navy"
                    : "bg-white text-muted border-border hover:border-mid"
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Search resources..."
              className="pl-9 pr-4 py-2 text-xs border border-border rounded-lg w-full sm:w-64 outline-none focus:border-mid"
            />
          </div>
        </div>
      </section>

      {/* RESOURCES LIST */}
      <section className="px-4 sm:px-10 py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto flex flex-col gap-3">
          {resources.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-4 border border-border rounded-lg hover:border-mid transition-colors bg-white cursor-pointer"
            >
              <div className="hidden sm:flex w-10 h-10 rounded-lg bg-off items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-muted" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span
                    className="text-[9px] font-bold tracking-[1.5px] uppercase px-2 py-0.5 rounded-sm"
                    style={{ backgroundColor: item.tagBg, color: item.tagColor }}
                  >
                    {item.tag}
                  </span>
                  <span className="text-[11px] text-muted">{item.date}</span>
                </div>
                <h3 className="text-sm font-medium text-navy mb-1 truncate">{item.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{item.description}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button className="text-muted hover:text-mid transition-colors">
                  <Download className="w-4 h-4" strokeWidth={1.8} />
                </button>
                <button className="text-muted hover:text-mid transition-colors">
                  <ExternalLink className="w-4 h-4" strokeWidth={1.8} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
