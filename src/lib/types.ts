/**
 * Content type definitions for the FSD Africa headless CMS.
 * Aligned to WordPress custom post types and ACF Pro field groups.
 */

/* ── Shared ── */

export interface WpMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details?: {
    width: number;
    height: number;
    sizes?: Record<string, { source_url: string; width: number; height: number }>;
  };
}

export interface WpTerm {
  id: number;
  name: string;
  slug: string;
  count?: number;
}

export interface WpAuthor {
  id: number;
  name: string;
  slug: string;
  avatar?: string;
  description?: string;
}

export interface SeoMeta {
  title?: string;
  description?: string;
  canonical?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
}

/* ── Custom Post Types ── */

export interface Story {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  modified: string;
  status: "publish" | "draft" | "future";
  featured_media?: number;
  featured_image?: WpMedia;
  acf?: {
    location?: string;
    beneficiary_quote?: string;
    stat_number?: string;
    stat_label?: string;
    read_time?: string;
    related_publications?: number[];
    related_projects?: number[];
  };
  themes?: WpTerm[];
  countries?: WpTerm[];
  programmes?: WpTerm[];
  author?: WpAuthor;
  seo?: SeoMeta;
}

export interface Publication {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  modified: string;
  status: "publish" | "draft" | "future";
  featured_media?: number;
  featured_image?: WpMedia;
  acf?: {
    publication_type?: "research" | "policy_brief" | "case_study" | "data_tool" | "explainer";
    download_url?: string;
    external_url?: string;
    file_size?: string;
    file_format?: string;
    doi?: string;
    authors?: string;
    partner_organisations?: string;
    related_stories?: number[];
    related_projects?: number[];
  };
  themes?: WpTerm[];
  countries?: WpTerm[];
  programmes?: WpTerm[];
  sdg_tags?: WpTerm[];
  seo?: SeoMeta;
}

export interface Project {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  modified: string;
  status: "publish" | "draft" | "future";
  featured_media?: number;
  featured_image?: WpMedia;
  acf?: {
    budget?: string;
    duration?: string;
    status?: "active" | "completed" | "planned";
    partners?: string[];
    impact_metrics?: { metric: string; value: string; baseline?: string }[];
    timeline_events?: { date: string; title: string; description: string }[];
    related_stories?: number[];
    related_publications?: number[];
  };
  themes?: WpTerm[];
  countries?: WpTerm[];
  programmes?: WpTerm[];
  seo?: SeoMeta;
}

export interface Event {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  modified: string;
  status: "publish" | "draft" | "future";
  acf?: {
    event_date?: string;
    end_date?: string;
    location?: string;
    venue?: string;
    event_type?: "conference" | "workshop" | "webinar" | "roundtable" | "launch";
    registration_url?: string;
    speakers?: { name: string; role: string; organisation?: string; photo?: number }[];
    agenda?: { time: string; title: string; description?: string }[];
    is_virtual?: boolean;
    recording_url?: string;
    related_projects?: number[];
    related_publications?: number[];
  };
  themes?: WpTerm[];
  countries?: WpTerm[];
  seo?: SeoMeta;
}

export interface Person {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  featured_media?: number;
  featured_image?: WpMedia;
  acf?: {
    role?: string;
    department?: string;
    biography?: string;
    email?: string;
    linkedin?: string;
    twitter?: string;
    order?: number;
  };
  themes?: WpTerm[];
}

export interface Country {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  featured_media?: number;
  featured_image?: WpMedia;
  acf?: {
    region?: string;
    population?: string;
    gdp?: string;
    active_programmes?: number;
    active_projects?: number;
    partner_organisations?: string[];
    key_initiatives?: string[];
  };
  themes?: WpTerm[];
  programmes?: WpTerm[];
  seo?: SeoMeta;
}

export interface Partner {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  featured_media?: number;
  featured_image?: WpMedia;
  acf?: {
    partner_type?: "donor" | "implementing" | "research" | "government" | "private_sector";
    website_url?: string;
    country?: string;
    since?: string;
  };
  themes?: WpTerm[];
  countries?: WpTerm[];
}

/* ── Page / Menu ── */

export interface Page {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  acf?: Record<string, unknown>;
  seo?: SeoMeta;
}

export interface MenuItem {
  id: number;
  title: string;
  url: string;
  slug: string;
  children?: MenuItem[];
}

/* ── Search / Aggregation ── */

export interface SearchResult {
  id: number;
  type: "story" | "publication" | "project" | "event" | "page";
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image?: string;
  themes?: string[];
  countries?: string[];
}

export interface ContentListResponse<T> {
  data: T[];
  total: number;
  totalPages: number;
  currentPage: number;
}
