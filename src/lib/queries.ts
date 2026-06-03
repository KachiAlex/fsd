/**
 * Pre-built GraphQL-style query builders and content aggregators.
 * Wraps the WordPress REST API with semantic, domain-specific queries.
 */

import {
  getStories,
  getPublications,
  getProjects,
  getEvents,
  getPeople,
  getCountries,
  getPartners,
  getTerms,
} from "./wordpress";
import type { Story, Publication, Project, Event, Person, Country, Partner, WpTerm } from "./types";

/* ── Homepage aggregations ── */

export async function getHomepageData() {
  const [featuredStories, latestPublications, activeProjects, upcomingEvents, stats] = await Promise.all([
    getStories({ per_page: 3, orderby: "date", order: "desc" }),
    getPublications({ per_page: 4, orderby: "date", order: "desc" }),
    getProjects({ per_page: 3, status: "active" }),
    getEvents({ per_page: 2, upcoming: true }),
    getImpactStats(),
  ]);

  return {
    featuredStories: featuredStories.data,
    latestPublications: latestPublications.data,
    activeProjects: activeProjects.data,
    upcomingEvents: upcomingEvents.data,
    stats,
  };
}

export async function getImpactStats() {
  const [stories, publications, projects, countries] = await Promise.all([
    getStories({ per_page: 1 }),
    getPublications({ per_page: 1 }),
    getProjects({ per_page: 1 }),
    getCountries({ per_page: 100 }),
  ]);

  return {
    countriesReached: countries.length,
    storiesPublished: stories.total,
    publicationsProduced: publications.total,
    activeProjects: projects.total,
  };
}

/* ── Knowledge Hub aggregations ── */

export async function getKnowledgeHubData(options?: {
  type?: string;
  theme?: string;
  country?: string;
  search?: string;
  page?: number;
}) {
  const [publications, stories, projects, themes, countries] = await Promise.all([
    getPublications({
      per_page: 10,
      page: options?.page || 1,
      type: options?.type,
      themes: options?.theme ? [options.theme] : undefined,
      countries: options?.country ? [options.country] : undefined,
      search: options?.search,
      orderby: "date",
      order: "desc",
    }),
    getStories({ per_page: 4, orderby: "date", order: "desc" }),
    getProjects({ per_page: 4, status: "active" }),
    getTerms("themes"),
    getTerms("countries"),
  ]);

  return {
    publications: publications.data,
    stories: stories.data,
    projects: projects.data,
    themes,
    countries,
    pagination: {
      total: publications.total,
      totalPages: publications.totalPages,
      currentPage: publications.currentPage,
    },
  };
}

/* ── Cross-linking helpers ── */

export async function getRelatedContent(
  type: "story" | "publication" | "project",
  id: number,
  relatedIds?: number[]
): Promise<(Story | Publication | Project)[]> {
  if (!relatedIds || relatedIds.length === 0) return [];

  const include = relatedIds.join(",");
  const [stories, publications, projects] = await Promise.all([
    getStories({ per_page: 100 }).then((r) => r.data.filter((s) => relatedIds.includes(s.id))),
    getPublications({ per_page: 100 }).then((r) => r.data.filter((p) => relatedIds.includes(p.id))),
    getProjects({ per_page: 100 }).then((r) => r.data.filter((p) => relatedIds.includes(p.id))),
  ]);

  return [...stories, ...publications, ...projects].slice(0, 3);
}

/* ── Filter / facet helpers ── */

export async function getPublicationTypes(): Promise<WpTerm[]> {
  return getTerms("publication_type");
}

export async function getProgrammes(): Promise<WpTerm[]> {
  return getTerms("programmes");
}

export async function getSdgTags(): Promise<WpTerm[]> {
  return getTerms("sdg_tags");
}

/* ── Search aggregation (simple WP search across post types) ── */

export async function searchContent(query: string, page = 1) {
  const [stories, publications, projects] = await Promise.all([
    getStories({ per_page: 5, page, search: query }),
    getPublications({ per_page: 5, page, search: query }),
    getProjects({ per_page: 5, page, search: query }),
  ]);

  return {
    results: [
      ...stories.data.map((s) => ({ ...s, _searchType: "story" as const })),
      ...publications.data.map((p) => ({ ...p, _searchType: "publication" as const })),
      ...projects.data.map((p) => ({ ...p, _searchType: "project" as const })),
    ],
    total: stories.total + publications.total + projects.total,
    page,
  };
}
