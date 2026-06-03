"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Download, ExternalLink, FileText, Database, BookOpen } from "lucide-react";
import type { Publication } from "@/lib/types";

interface KnowledgeHubClientProps {
  publications: Publication[];
  total: number;
}

const typeConfig: Record<string, { label: string; bg: string; color: string; icon: typeof FileText }> = {
  research: { label: "Research Report", bg: "#E6F1FB", color: "#0C447C", icon: FileText },
  policy_brief: { label: "Policy Brief", bg: "var(--gold-bg)", color: "#633806", icon: FileText },
  data_tool: { label: "Data Tool", bg: "var(--green-bg)", color: "#173404", icon: Database },
  case_study: { label: "Case Study", bg: "var(--purple-bg)", color: "#534AB7", icon: BookOpen },
  explainer: { label: "Explainer", bg: "#F1ECFB", color: "#534AB7", icon: BookOpen },
};

const categoryFilters = [
  { key: "all", label: "All" },
  { key: "research", label: "Research Reports" },
  { key: "policy_brief", label: "Policy Briefs" },
  { key: "data_tool", label: "Data Tools" },
  { key: "case_study", label: "Case Studies" },
];

export default function KnowledgeHubClient({ publications, total }: KnowledgeHubClientProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: total };
    categoryFilters.forEach((c) => {
      if (c.key !== "all") {
        map[c.key] = publications.filter((p) => p.acf?.publication_type === c.key).length;
      }
    });
    return map;
  }, [publications, total]);

  const filtered = useMemo(() => {
    let result = publications;

    if (activeCategory !== "all") {
      result = result.filter((p) => p.acf?.publication_type === activeCategory);
    }

    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter((p) => {
        const title = p.title.rendered.toLowerCase();
        const excerpt = p.excerpt.rendered.toLowerCase().replace(/<[^>]+>/g, "");
        const type = (p.acf?.publication_type || "").toLowerCase();
        const themes = p.themes?.map((t) => t.name.toLowerCase()).join(" ") || "";
        return (
          title.includes(q) || excerpt.includes(q) || type.includes(q) || themes.includes(q)
        );
      });
    }

    return result;
  }, [publications, activeCategory, searchQuery]);

  return (
    <>
      {/* FILTER BAR */}
      <section className="px-4 sm:px-10 py-6 bg-off border-b border-border">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categoryFilters.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors cursor-pointer ${
                  activeCategory === cat.key
                    ? "bg-navy text-white border-navy"
                    : "bg-white text-muted border-border hover:border-mid"
                }`}
              >
                {cat.label} ({counts[cat.key] || 0})
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources..."
              className="pl-9 pr-4 py-2 text-xs border border-border rounded-lg w-full sm:w-64 outline-none focus:border-mid"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted hover:text-navy cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* RESOURCES LIST */}
      <section className="px-4 sm:px-10 py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto flex flex-col gap-3">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-sm text-muted mb-2">No resources match your search.</p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
                className="text-xs font-semibold text-mid hover:underline cursor-pointer"
              >
                Clear filters
              </button>
            </div>
          ) : (
            filtered.map((item) => {
              const config = typeConfig[item.acf?.publication_type || ""] || typeConfig.research;
              const Icon = config.icon;
              const date = new Date(item.date).toLocaleDateString("en-GB", { year: "numeric", month: "short" });
              const downloadUrl = item.acf?.download_url;
              const externalUrl = item.acf?.external_url;

              return (
                <Link
                  key={item.id}
                  href={`/publications/${item.slug}`}
                  className="flex items-start gap-4 p-4 border border-border rounded-lg hover:border-mid transition-colors bg-white cursor-pointer"
                >
                  <div className="hidden sm:flex w-10 h-10 rounded-lg bg-off items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-muted" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span
                        className="text-[9px] font-bold tracking-[1.5px] uppercase px-2 py-0.5 rounded-sm"
                        style={{ backgroundColor: config.bg, color: config.color }}
                      >
                        {config.label}
                      </span>
                      <span className="text-[11px] text-muted">{date}</span>
                    </div>
                    <h3
                      className="text-sm font-medium text-navy mb-1 truncate"
                      dangerouslySetInnerHTML={{ __html: item.title.rendered }}
                    />
                    <p className="text-xs text-muted leading-relaxed">
                      {item.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 200)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {downloadUrl && (
                      <span className="text-muted">
                        <Download className="w-4 h-4" strokeWidth={1.8} />
                      </span>
                    )}
                    {externalUrl && (
                      <span className="text-muted">
                        <ExternalLink className="w-4 h-4" strokeWidth={1.8} />
                      </span>
                    )}
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </section>
    </>
  );
}
