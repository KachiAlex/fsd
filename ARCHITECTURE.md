# FSD Africa — Headless CMS Architecture

## Overview

This site uses a **headless WordPress + Next.js** architecture to meet the RFP requirements for a scalable, audience-first, story-led digital platform.

- **Frontend**: Next.js 16.2.7 (App Router, React, TypeScript, Tailwind CSS)
- **Backend**: WordPress 6.5+ Enterprise CMS (custom post types, ACF Pro, Gutenberg blocks)
- **API**: WordPress REST API (with planned WPGraphQL layer)
- **Deployment**: Static export (current) → ISR / Node.js server (when CMS is live)

---

## Content Types (WordPress Custom Post Types)

| Post Type     | Slug            | Purpose                                  |
|---------------|-----------------|------------------------------------------|
| Stories       | `stories`       | Impact stories, beneficiary narratives   |
| Publications  | `publications`   | Research, policy briefs, data tools      |
| Projects      | `projects`       | Active and completed programmes          |
| Events        | `events`         | Conferences, workshops, webinars         |
| People        | `people`         | Staff, board, experts                    |
| Countries     | `countries`      | Country programme pages                  |
| Partners      | `partners`       | Donors, implementing partners            |

## Taxonomies

| Taxonomy        | Slug             | Applied To                          |
|-----------------|------------------|-------------------------------------|
| Themes          | `themes`         | Stories, Publications, Projects     |
| Countries       | `countries`      | Stories, Publications, Projects     |
| Programmes      | `programmes`     | Stories, Publications, Projects     |
| SDG Tags        | `sdg_tags`       | Publications                        |
| Publication Type| `publication_type`| Publications                       |
| Event Type      | `event_type`     | Events                              |

## File Structure

```
src/
  lib/
    types.ts           # TypeScript interfaces for all content types
    wordpress.ts       # API client with ISR caching + mock fallback
    queries.ts         # Semantic query builders (homepage, knowledge hub)
    mock-data.ts       # Mock CMS data for builds without WordPress
  app/
    stories/[slug]/    # Dynamic story detail pages
    publications/[slug]/ # Dynamic publication detail pages
    projects/[slug]/   # Dynamic project detail pages
    api/revalidate/    # On-demand cache invalidation (when not static)
```

## Environment Variables

```bash
WORDPRESS_API_URL=https://cms.fsdafrica.org/wp-json
REVALIDATE_SECRET=your-secret-key
NEXT_PUBLIC_SITE_URL=https://fsdafrica.org
```

When `WORDPRESS_API_URL` is unset, the site falls back to `mock-data.ts` so it can still build and demo.

## Transition from Static Export to ISR

Current: `output: "export"` in `next.config.ts` enables static file deployment.

To go live with the CMS:

1. **Provision WordPress** 6.5+ with custom post types and ACF Pro fields
2. **Install plugins**: WP REST API (built-in), optional WPGraphQL
3. **Set `WORDPRESS_API_URL`** environment variable
4. **Remove `output: "export"`** from `next.config.ts`
5. **Deploy to a Node.js host** (Vercel, AWS, etc.) for ISR + API routes
6. **Configure webhooks** in WordPress to call `/api/revalidate` on publish

## Mock Data

`src/lib/mock-data.ts` provides representative content for all custom post types. This lets stakeholders review the frontend templates and dynamic routes before the CMS is provisioned.

## RFP Alignment Status

- **Phase 4 (CMS Setup)**: Scaffolding complete — types, API client, queries, dynamic routes
- **Phase 4 (Next.js Integration)**: ISR caching, media embedding, slug-based routing ready
- **Phase 4 (Search)**: Query layer prepared; Algolia/Meilisearch integration pending
- **Phase 4 (Forms/Newsletter)**: Architecture ready; Gravity Forms / Mailchimp API pending
- **Phase 5-6**: Pending CMS provisioning and content migration
