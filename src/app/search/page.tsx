"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Globe, Search, FileText, BookOpen, FolderOpen } from "lucide-react";
import WebPageJsonLd from "../components/WebPageJsonLd";
import { mockStories, mockPublications, mockProjects } from "@/lib/mock-data";

interface SearchResult {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  date?: string;
  _searchType: "story" | "publication" | "project";
}

const typeIcon: Record<string, typeof FileText> = {
  story: BookOpen,
  publication: FileText,
  project: FolderOpen,
};

const typeLabel: Record<string, string> = {
  story: "Story",
  publication: "Publication",
  project: "Project",
};

const typePath: Record<string, string> = {
  story: "stories",
  publication: "publications",
  project: "projects",
};

function filterMockData(query: string): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const matches = (item: { title: { rendered: string }; excerpt: { rendered: string } }) =>
    item.title.rendered.toLowerCase().includes(q) ||
    item.excerpt.rendered.toLowerCase().includes(q);

  const stories = mockStories.filter(matches).map((s) => ({ ...s, _searchType: "story" as const }));
  const publications = mockPublications.filter(matches).map((p) => ({ ...p, _searchType: "publication" as const }));
  const projects = mockProjects.filter(matches).map((p) => ({ ...p, _searchType: "project" as const }));

  return [...stories, ...publications, ...projects];
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);

  const doSearch = useCallback((q: string) => {
    setResults(filterMockData(q));
  }, []);

  useEffect(() => {
    doSearch(initialQuery);
  }, [initialQuery, doSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = new URL(window.location.href);
    url.searchParams.set("q", query);
    window.history.replaceState({}, "", url.toString());
    doSearch(query);
  };

  return (
    <>
      <WebPageJsonLd
        title="Search | FSD Africa"
        description="Search across FSD Africa's stories, publications, and projects."
        path="/search"
      />
      <div className="flex flex-col">
        {/* HERO */}
        <section className="relative overflow-hidden min-h-[280px] sm:min-h-[320px] flex items-center justify-center px-4 sm:px-10 py-16 sm:py-20">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/hero-banner.png)" }} />
          <div className="absolute inset-0 bg-navy/70" />
          <div className="relative z-10 max-w-3xl text-center w-full">
            <div className="inline-flex items-center gap-1.5 bg-gold px-3 py-1.5 rounded-sm mb-5 mx-auto">
              <Globe className="w-3 h-3 text-white" />
              <span className="text-[10px] font-bold tracking-[2.5px] uppercase text-white">Search</span>
            </div>
            <h1 className="font-serif text-[clamp(2.25rem,5vw,3.25rem)] leading-[1.15] text-white mb-4">
              Find what you need
            </h1>
            <form onSubmit={handleSubmit} className="relative max-w-md mx-auto mt-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search stories, publications, projects..."
                className="pl-9 pr-4 py-2.5 text-sm border border-border rounded-lg w-full outline-none focus:border-mid bg-white"
              />
            </form>
          </div>
        </section>

        {/* RESULTS */}
        <section className="px-4 sm:px-10 py-12 sm:py-16 bg-white min-h-[300px]">
          <div className="max-w-4xl mx-auto">
            {query ? (
              <>
                <p className="text-xs text-muted mb-6">
                  {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
                </p>
                <div className="flex flex-col gap-3">
                  {results.map((item) => {
                    const Icon = typeIcon[item._searchType] || FileText;
                    const label = typeLabel[item._searchType] || "Result";
                    const path = typePath[item._searchType] || "";
                    const date = item.date
                      ? new Date(item.date).toLocaleDateString("en-GB", { year: "numeric", month: "short" })
                      : "";

                    return (
                      <Link
                        key={`${item._searchType}-${item.id}`}
                        href={`/${path}/${item.slug}`}
                        className="flex items-start gap-4 p-4 border border-border rounded-lg hover:border-mid transition-colors bg-white"
                      >
                        <div className="hidden sm:flex w-10 h-10 rounded-lg bg-off items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-muted" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="text-[9px] font-bold tracking-[1.5px] uppercase px-2 py-0.5 rounded-sm bg-navy text-white">
                              {label}
                            </span>
                            {date && <span className="text-[11px] text-muted">{date}</span>}
                          </div>
                          <h3
                            className="text-sm font-medium text-navy mb-1 truncate"
                            dangerouslySetInnerHTML={{ __html: item.title.rendered }}
                          />
                          <p className="text-xs text-muted leading-relaxed">
                            {item.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 200)}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                {results.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-sm text-muted">No results found. Try a different search term.</p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-sm text-muted">Enter a search term above to find stories, publications, and projects.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
