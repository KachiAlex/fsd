/**
 * Headless WordPress REST API client for Next.js.
 * Supports ISR caching, error handling, and media embedding.
 *
 * Environment variables required:
 * - WORDPRESS_API_URL  (e.g. https://cms.fsdafrica.org/wp-json)
 * - REVALIDATE_SECRET  (for on-demand cache invalidation)
 */

import type {
  Story,
  Publication,
  Project,
  Event,
  Person,
  Country,
  Partner,
  Page,
  MenuItem,
  WpMedia,
  ContentListResponse,
} from "./types";

import {
  mockStories,
  mockPublications,
  mockProjects,
  mockEvents,
  mockPeople,
  mockCountryTerms,
  mockCountryPages,
  mockPartners,
  mockThemes,
  mockProgrammes,
} from "./mock-data";

const WP_API = process.env.WORDPRESS_API_URL?.replace(/\/$/, "") || "";
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET || "";
const USE_MOCK = !WP_API;

/* ── Low-level fetch wrapper with caching ── */

async function wpFetch<T>(
  endpoint: string,
  options?: RequestInit & { tags?: string[]; revalidate?: number }
): Promise<T> {
  const url = `${WP_API}${endpoint}`;

  const res = await fetch(url, {
    ...options,
    next: {
      tags: options?.tags ?? ["wp"],
      revalidate: options?.revalidate ?? 60,
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "Unknown error");
    throw new Error(`WP API error ${res.status}: ${text}`);
  }

  return res.json() as Promise<T>;
}

/* ── Media resolver ── */

export async function getMedia(id: number): Promise<WpMedia | undefined> {
  if (!WP_API || id <= 0) return undefined;
  return wpFetch<WpMedia>(`/wp/v2/media/${id}`, { tags: ["media"] });
}

export async function embedMedia<T extends { featured_media?: number; featured_image?: WpMedia }>(
  item: T
): Promise<T> {
  if (!item.featured_media) return item;
  try {
    const media = await getMedia(item.featured_media);
    if (media) item.featured_image = media;
  } catch {
    // silently ignore missing media
  }
  return item;
}

/* ── Stories ── */

export async function getStories(options?: {
  per_page?: number;
  page?: number;
  themes?: string[];
  countries?: string[];
  programmes?: string[];
  search?: string;
  orderby?: "date" | "modified" | "title";
  order?: "asc" | "desc";
}): Promise<ContentListResponse<Story>> {
  if (USE_MOCK) {
    let data = [...mockStories];
    if (options?.search) {
      const q = options.search.toLowerCase();
      data = data.filter(
        (s) =>
          s.title.rendered.toLowerCase().includes(q) ||
          s.excerpt.rendered.toLowerCase().includes(q)
      );
    }
    if (options?.themes) {
      data = data.filter((s) => s.themes?.some((t) => options.themes!.includes(t.slug)));
    }
    if (options?.countries) {
      data = data.filter((s) => s.countries?.some((c) => options.countries!.includes(c.slug)));
    }
    const total = data.length;
    const perPage = options?.per_page || 10;
    const page = options?.page || 1;
    const start = (page - 1) * perPage;
    const paginated = data.slice(start, start + perPage);
    return { data: paginated, total, totalPages: Math.ceil(total / perPage), currentPage: page };
  }

  const params = new URLSearchParams();
  params.set("_embed", "author,wp:term");
  if (options?.per_page) params.set("per_page", String(options.per_page));
  if (options?.page) params.set("page", String(options.page));
  if (options?.themes) options.themes.forEach((t) => params.append("themes", t));
  if (options?.countries) options.countries.forEach((c) => params.append("countries", c));
  if (options?.programmes) options.programmes.forEach((p) => params.append("programmes", p));
  if (options?.search) params.set("search", options.search);
  if (options?.orderby) params.set("orderby", options.orderby);
  if (options?.order) params.set("order", options.order);

  const res = await wpFetch<Story[]>(`/wp/v2/stories?${params.toString()}`, {
    tags: ["stories"],
  });

  const total = Number(res.length); // In production, read x-wp-total header
  return { data: res, total, totalPages: Math.ceil(total / (options?.per_page || 10)), currentPage: options?.page || 1 };
}

export async function getStoryBySlug(slug: string): Promise<Story | undefined> {
  if (USE_MOCK) {
    const story = mockStories.find((s) => s.slug === slug);
    return story ? embedMedia(story) : undefined;
  }
  const stories = await wpFetch<Story[]>(`/wp/v2/stories?slug=${encodeURIComponent(slug)}&_embed=author,wp:term`, {
    tags: [`story-${slug}`],
  });
  const story = stories[0];
  if (!story) return undefined;
  return embedMedia(story);
}

export async function getAllStorySlugs(): Promise<string[]> {
  if (USE_MOCK) return mockStories.map((s) => s.slug);
  const stories = await wpFetch<Story[]>("/wp/v2/stories?per_page=100&_fields=slug", {
    tags: ["story-slugs"],
  });
  return stories.map((s) => s.slug);
}

/* ── Publications ── */

export async function getPublications(options?: {
  per_page?: number;
  page?: number;
  type?: string;
  themes?: string[];
  countries?: string[];
  programmes?: string[];
  search?: string;
  orderby?: "date" | "modified" | "title";
  order?: "asc" | "desc";
}): Promise<ContentListResponse<Publication>> {
  if (USE_MOCK) {
    let data = [...mockPublications];
    if (options?.type) {
      data = data.filter((p) => p.acf?.publication_type === options.type);
    }
    if (options?.search) {
      const q = options.search.toLowerCase();
      data = data.filter(
        (p) =>
          p.title.rendered.toLowerCase().includes(q) ||
          p.excerpt.rendered.toLowerCase().includes(q)
      );
    }
    const total = data.length;
    const perPage = options?.per_page || 10;
    const page = options?.page || 1;
    const start = (page - 1) * perPage;
    const paginated = data.slice(start, start + perPage);
    return { data: paginated, total, totalPages: Math.ceil(total / perPage), currentPage: page };
  }

  const params = new URLSearchParams();
  params.set("_embed", "wp:term");
  if (options?.per_page) params.set("per_page", String(options.per_page));
  if (options?.page) params.set("page", String(options.page));
  if (options?.type) params.set("publication_type", options.type);
  if (options?.themes) options.themes.forEach((t) => params.append("themes", t));
  if (options?.countries) options.countries.forEach((c) => params.append("countries", c));
  if (options?.programmes) options.programmes.forEach((p) => params.append("programmes", p));
  if (options?.search) params.set("search", options.search);
  if (options?.orderby) params.set("orderby", options.orderby);
  if (options?.order) params.set("order", options.order);

  const res = await wpFetch<Publication[]>(`/wp/v2/publications?${params.toString()}`, {
    tags: ["publications"],
  });

  const total = Number(res.length);
  return { data: res, total, totalPages: Math.ceil(total / (options?.per_page || 10)), currentPage: options?.page || 1 };
}

export async function getPublicationBySlug(slug: string): Promise<Publication | undefined> {
  if (USE_MOCK) {
    const pub = mockPublications.find((p) => p.slug === slug);
    return pub ? embedMedia(pub) : undefined;
  }
  const pubs = await wpFetch<Publication[]>(
    `/wp/v2/publications?slug=${encodeURIComponent(slug)}&_embed=wp:term`,
    { tags: [`publication-${slug}`] }
  );
  const pub = pubs[0];
  if (!pub) return undefined;
  return embedMedia(pub);
}

export async function getAllPublicationSlugs(): Promise<string[]> {
  if (USE_MOCK) return mockPublications.map((p) => p.slug);
  const pubs = await wpFetch<Publication[]>("/wp/v2/publications?per_page=100&_fields=slug", {
    tags: ["publication-slugs"],
  });
  return pubs.map((p) => p.slug);
}

/* ── Projects ── */

export async function getProjects(options?: {
  per_page?: number;
  page?: number;
  status?: string;
  themes?: string[];
  countries?: string[];
  programmes?: string[];
  search?: string;
  orderby?: "date" | "modified" | "title";
  order?: "asc" | "desc";
}): Promise<ContentListResponse<Project>> {
  if (USE_MOCK) {
    let data = [...mockProjects];
    if (options?.status) {
      data = data.filter((p) => p.acf?.status === options.status);
    }
    if (options?.search) {
      const q = options.search.toLowerCase();
      data = data.filter(
        (p) =>
          p.title.rendered.toLowerCase().includes(q) ||
          p.excerpt.rendered.toLowerCase().includes(q)
      );
    }
    const total = data.length;
    const perPage = options?.per_page || 10;
    const page = options?.page || 1;
    const start = (page - 1) * perPage;
    const paginated = data.slice(start, start + perPage);
    return { data: paginated, total, totalPages: Math.ceil(total / perPage), currentPage: page };
  }

  const params = new URLSearchParams();
  params.set("_embed", "wp:term");
  if (options?.per_page) params.set("per_page", String(options.per_page));
  if (options?.page) params.set("page", String(options.page));
  if (options?.status) params.set("project_status", options.status);
  if (options?.themes) options.themes.forEach((t) => params.append("themes", t));
  if (options?.countries) options.countries.forEach((c) => params.append("countries", c));
  if (options?.programmes) options.programmes.forEach((p) => params.append("programmes", p));
  if (options?.search) params.set("search", options.search);
  if (options?.orderby) params.set("orderby", options.orderby);
  if (options?.order) params.set("order", options.order);

  const res = await wpFetch<Project[]>(`/wp/v2/projects?${params.toString()}`, {
    tags: ["projects"],
  });

  const total = Number(res.length);
  return { data: res, total, totalPages: Math.ceil(total / (options?.per_page || 10)), currentPage: options?.page || 1 };
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  if (USE_MOCK) {
    const project = mockProjects.find((p) => p.slug === slug);
    return project ? embedMedia(project) : undefined;
  }
  const projects = await wpFetch<Project[]>(`/wp/v2/projects?slug=${encodeURIComponent(slug)}&_embed=wp:term`, {
    tags: [`project-${slug}`],
  });
  const project = projects[0];
  if (!project) return undefined;
  return embedMedia(project);
}

export async function getAllProjectSlugs(): Promise<string[]> {
  if (USE_MOCK) return mockProjects.map((p) => p.slug);
  const projects = await wpFetch<Project[]>("/wp/v2/projects?per_page=100&_fields=slug", {
    tags: ["project-slugs"],
  });
  return projects.map((p) => p.slug);
}

/* ── Events ── */

export async function getEvents(options?: {
  per_page?: number;
  page?: number;
  event_type?: string;
  upcoming?: boolean;
}): Promise<ContentListResponse<Event>> {
  if (USE_MOCK) {
    let data = [...mockEvents];
    if (options?.event_type) {
      data = data.filter((e) => e.acf?.event_type === options.event_type);
    }
    const total = data.length;
    const perPage = options?.per_page || 10;
    const page = options?.page || 1;
    const start = (page - 1) * perPage;
    const paginated = data.slice(start, start + perPage);
    return { data: paginated, total, totalPages: Math.ceil(total / perPage), currentPage: page };
  }

  const params = new URLSearchParams();
  params.set("_embed", "wp:term");
  if (options?.per_page) params.set("per_page", String(options.per_page));
  if (options?.page) params.set("page", String(options.page));
  if (options?.event_type) params.set("event_type", options.event_type);

  const res = await wpFetch<Event[]>(`/wp/v2/events?${params.toString()}`, {
    tags: ["events"],
  });

  const total = Number(res.length);
  return { data: res, total, totalPages: Math.ceil(total / (options?.per_page || 10)), currentPage: options?.page || 1 };
}

export async function getEventBySlug(slug: string): Promise<Event | undefined> {
  if (USE_MOCK) {
    return mockEvents.find((e) => e.slug === slug);
  }
  const events = await wpFetch<Event[]>(`/wp/v2/events?slug=${encodeURIComponent(slug)}&_embed=wp:term`, {
    tags: [`event-${slug}`],
  });
  return events[0];
}

export async function getAllEventSlugs(): Promise<string[]> {
  if (USE_MOCK) return mockEvents.map((e) => e.slug);
  const events = await wpFetch<Event[]>("/wp/v2/events?per_page=100&_fields=slug", {
    tags: ["events-slugs"],
  });
  return events.map((e) => e.slug);
}

/* ── People / Leadership ── */

export async function getPeople(options?: { per_page?: number; department?: string }): Promise<Person[]> {
  if (USE_MOCK) return mockPeople.slice(0, options?.per_page || 10);
  const params = new URLSearchParams();
  params.set("_embed", "wp:term");
  if (options?.per_page) params.set("per_page", String(options.per_page));
  if (options?.department) params.set("departments", options.department);

  return wpFetch<Person[]>(`/wp/v2/people?${params.toString()}`, {
    tags: ["people"],
  });
}

export async function getPersonBySlug(slug: string): Promise<Person | undefined> {
  if (USE_MOCK) {
    return mockPeople.find((p) => p.slug === slug);
  }
  const people = await wpFetch<Person[]>(`/wp/v2/people?slug=${encodeURIComponent(slug)}&_embed=wp:term`, {
    tags: [`person-${slug}`],
  });
  return people[0];
}

export async function getAllPeopleSlugs(): Promise<string[]> {
  if (USE_MOCK) return mockPeople.map((p) => p.slug);
  const people = await wpFetch<Person[]>("/wp/v2/people?per_page=100&_fields=slug", {
    tags: ["people-slugs"],
  });
  return people.map((p) => p.slug);
}

/* ── Countries ── */

export async function getCountries(options?: { per_page?: number }): Promise<Country[]> {
  if (USE_MOCK) return mockCountryPages.slice(0, options?.per_page || 100);
  const params = new URLSearchParams();
  params.set("_embed", "wp:term");
  if (options?.per_page) params.set("per_page", String(options.per_page));

  return wpFetch<Country[]>(`/wp/v2/countries?${params.toString()}`, {
    tags: ["countries"],
  });
}

export async function getCountryBySlug(slug: string): Promise<Country | undefined> {
  if (USE_MOCK) {
    const country = mockCountryPages.find((c) => c.slug === slug);
    return country ? embedMedia(country) : undefined;
  }
  const countries = await wpFetch<Country[]>(`/wp/v2/countries?slug=${encodeURIComponent(slug)}&_embed=wp:term`, {
    tags: [`country-${slug}`],
  });
  const country = countries[0];
  if (!country) return undefined;
  return embedMedia(country);
}

/* ── Partners ── */

export async function getPartners(options?: { per_page?: number; type?: string }): Promise<Partner[]> {
  if (USE_MOCK) return mockPartners.slice(0, options?.per_page || 10);
  const params = new URLSearchParams();
  params.set("_embed", "wp:term");
  if (options?.per_page) params.set("per_page", String(options.per_page));
  if (options?.type) params.set("partner_type", options.type);

  return wpFetch<Partner[]>(`/wp/v2/partners?${params.toString()}`, {
    tags: ["partners"],
  });
}

/* ── Pages (WordPress native) ── */

export async function getPageBySlug(slug: string): Promise<Page | undefined> {
  if (USE_MOCK) return undefined; // Pages are managed in Next.js for now
  const pages = await wpFetch<Page[]>(`/wp/v2/pages?slug=${encodeURIComponent(slug)}&_embed=wp:term`, {
    tags: [`page-${slug}`],
  });
  return pages[0];
}

/* ── Menus (requires WP REST API Menus plugin or custom endpoint) ── */

export async function getMenu(slug: string): Promise<MenuItem[]> {
  if (USE_MOCK) return [];
  return wpFetch<MenuItem[]>(`/wp/v2/menus/${slug}`, {
    tags: [`menu-${slug}`],
    revalidate: 3600,
  });
}

/* ── Taxonomies ── */

export async function getTerms(taxonomy: string): Promise<{ id: number; name: string; slug: string; count: number }[]> {
  if (USE_MOCK) {
    const map: Record<string, { id: number; name: string; slug: string; count: number }[]> = {
      themes: mockThemes as unknown as { id: number; name: string; slug: string; count: number }[],
      countries: mockCountryTerms as unknown as { id: number; name: string; slug: string; count: number }[],
      programmes: mockProgrammes as unknown as { id: number; name: string; slug: string; count: number }[],
    };
    return map[taxonomy] || [];
  }
  return wpFetch(`/wp/v2/${taxonomy}?per_page=100`, {
    tags: [`taxonomy-${taxonomy}`],
    revalidate: 3600,
  });
}

/* ── On-demand revalidation helpers ── */

export async function revalidatePath(path: string): Promise<boolean> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/revalidate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path, secret: REVALIDATE_SECRET }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
