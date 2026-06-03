/**
 * Mock WordPress data for builds where no CMS is connected.
 * Mirrors the WordPress REST API response shape exactly.
 * Replace WORDPRESS_API_URL env var to switch to live data.
 */

import type { Story, Publication, Project, Event, Person, Country, Partner, WpTerm } from "./types";

const now = new Date().toISOString();

export const mockThemes: WpTerm[] = [
  { id: 1, name: "Financial Inclusion", slug: "financial-inclusion", count: 42 },
  { id: 2, name: "Climate Finance", slug: "climate-finance", count: 28 },
  { id: 3, name: "Capital Markets", slug: "capital-markets", count: 19 },
  { id: 4, name: "Policy & Regulation", slug: "policy-regulation", count: 35 },
];

export const mockCountryTerms: WpTerm[] = [
  { id: 1, name: "Kenya", slug: "kenya", count: 24 },
  { id: 2, name: "Nigeria", slug: "nigeria", count: 18 },
  { id: 3, name: "Ghana", slug: "ghana", count: 15 },
  { id: 4, name: "Rwanda", slug: "rwanda", count: 12 },
  { id: 5, name: "Ethiopia", slug: "ethiopia", count: 10 },
];

export const mockCountryPages: Country[] = mockCountryTerms.map((c) => ({
  id: c.id,
  slug: c.slug,
  title: { rendered: c.name },
  content: { rendered: `<p>${c.name} is a key market for FSD Africa.</p>` },
  excerpt: { rendered: `<p>${c.name} programme overview.</p>` },
  acf: { region: "Africa", active_programmes: Math.floor(Math.random() * 5) + 1, active_projects: Math.floor(Math.random() * 10) + 1 },
  themes: [mockThemes[0]],
}));

export const mockProgrammes: WpTerm[] = [
  { id: 1, name: "AFAWA", slug: "afawa", count: 8 },
  { id: 2, name: "Green Bond Programme", slug: "green-bonds", count: 6 },
  { id: 3, name: "DFS Africa", slug: "dfs-africa", count: 14 },
];

export const mockStories: Story[] = [
  {
    id: 101,
    slug: "my-savings-account-changed-everything",
    title: { rendered: "My savings account changed everything" },
    content: {
      rendered:
        "<p>For Wanjiru, a smallholder farmer in Nakuru, mobile savings was the difference between absorbing a bad harvest and losing her farm. When FSD Africa partnered with a local DFS provider to design a savings product tailored to rural women, Wanjiru was among the first to enrol.</p><p>Within six months, she had saved enough to purchase drought-resistant seeds. Within a year, she hired two casual workers to help expand her plot. Her story is one of 3.2 million farmers reached by inclusion programmes across East Africa.</p>",
    },
    excerpt: {
      rendered:
        "<p>For Wanjiru, a smallholder farmer in Nakuru, mobile savings was the difference between absorbing a bad harvest and losing her farm.</p>",
    },
    date: "2024-03-15T10:00:00",
    modified: now,
    status: "publish",
    acf: {
      location: "Nakuru, Kenya",
      beneficiary_quote: "Before this savings product, I would sell my goats in an emergency. Now I have choices.",
      stat_number: "3.2M",
      stat_label: "Farmers reached",
      read_time: "4 min read",
    },
    themes: [mockThemes[0]],
    countries: [mockCountryTerms[0]],
    author: { id: 1, name: "Communications Team", slug: "comms" },
  },
  {
    id: 102,
    slug: "green-bonds-green-futures-rwanda",
    title: { rendered: "Green bonds, green futures: Rwanda's climate model" },
    content: {
      rendered:
        "<p>Rwanda's inaugural sovereign green bond raised $30 million for climate-resilient infrastructure — a framework FSD Africa helped develop from concept to issuance. The bond finances solar microgrids, flood protection, and sustainable agriculture.</p><p>This model is now being replicated in Ghana and Kenya, with an anticipated $150 million pipeline over the next three years.</p>",
    },
    excerpt: {
      rendered:
        "<p>Rwanda's inaugural sovereign green bond raised $30 million for climate-resilient infrastructure.</p>",
    },
    date: "2024-01-20T10:00:00",
    modified: now,
    status: "publish",
    acf: {
      location: "Kigali, Rwanda",
      stat_number: "$30M",
      stat_label: "Capital raised",
      read_time: "6 min read",
    },
    themes: [mockThemes[1]],
    countries: [mockCountryTerms[3]],
    author: { id: 1, name: "Communications Team", slug: "comms" },
  },
  {
    id: 103,
    slug: "closing-the-gap-fatima-grows-her-business",
    title: { rendered: "Closing the gap — Fatima grows her business" },
    content: {
      rendered:
        "<p>With access to an AFAWA-supported loan product, Fatima hired 8 staff and expanded her textile business across two districts in Accra. The loan came with business training and a peer support network that transformed how she approached credit.</p><p>FSD Africa's AFAWA programme has now supported 42,000 women entrepreneurs across 12 countries.</p>",
    },
    excerpt: {
      rendered:
        "<p>With access to an AFAWA-supported loan product, Fatima hired 8 staff and expanded her textile business across two districts in Accra.</p>",
    },
    date: "2023-11-08T10:00:00",
    modified: now,
    status: "publish",
    acf: {
      location: "Accra, Ghana",
      beneficiary_quote: "The training was just as valuable as the money. I learned to price, to save, to plan.",
      stat_number: "42K",
      stat_label: "Women entrepreneurs supported",
      read_time: "5 min read",
    },
    themes: [mockThemes[0]],
    countries: [mockCountryTerms[2]],
    author: { id: 1, name: "Communications Team", slug: "comms" },
  },
];

export const mockPublications: Publication[] = [
  {
    id: 201,
    slug: "state-of-financial-inclusion-2024",
    title: { rendered: "State of Financial Inclusion in Sub-Saharan Africa 2024" },
    content: {
      rendered:
        "<p>This comprehensive report analyses financial inclusion trends across 38 countries, with a focus on gender gaps and rural access. It finds that 62% of new account holders are women, but significant gaps remain in credit access and insurance uptake.</p><h2>Key findings</h2><p>The report identifies three catalysts for inclusion: regulatory sandbox frameworks, interoperable payment systems, and agent network expansion into underserved areas.</p>",
    },
    excerpt: {
      rendered:
        "<p>Comprehensive analysis of financial inclusion trends across 38 countries, with a focus on gender gaps and rural access.</p>",
    },
    date: "2024-03-01T10:00:00",
    modified: now,
    status: "publish",
    acf: {
      publication_type: "research",
      download_url: "#",
      file_format: "PDF",
      file_size: "4.2 MB",
      authors: "Dr. Amina Osei, James Mwangi",
      partner_organisations: "CGAP, World Bank",
    },
    themes: [mockThemes[0]],
    countries: mockCountryTerms,
  },
  {
    id: 202,
    slug: "regulatory-approaches-digital-credit",
    title: { rendered: "Regulatory Approaches to Digital Credit: Lessons from East Africa" },
    content: {
      rendered:
        "<p>A comparative study of how Kenya, Tanzania, and Rwanda regulate digital lending to protect consumers while enabling innovation.</p>",
    },
    excerpt: {
      rendered: "<p>A comparative study of how Kenya, Tanzania, and Rwanda regulate digital lending to protect consumers.</p>",
    },
    date: "2024-01-15T10:00:00",
    modified: now,
    status: "publish",
    acf: {
      publication_type: "policy_brief",
      download_url: "#",
      file_format: "PDF",
      file_size: "1.8 MB",
      authors: "Policy Team",
    },
    themes: [mockThemes[3]],
    countries: [mockCountryTerms[0]],
  },
  {
    id: 203,
    slug: "africa-financial-inclusion-dashboard",
    title: { rendered: "Africa Financial Inclusion Dashboard" },
    content: {
      rendered:
        "<p>Interactive data explorer tracking access, usage, and quality of financial services across the continent. Updated quarterly.</p>",
    },
    excerpt: {
      rendered: "<p>Interactive data explorer tracking access, usage, and quality of financial services across the continent.</p>",
    },
    date: "2024-01-01T10:00:00",
    modified: now,
    status: "publish",
    acf: {
      publication_type: "data_tool",
      external_url: "#",
      file_format: "Web",
    },
    themes: [mockThemes[0]],
    countries: mockCountryTerms,
  },
];

export const mockProjects: Project[] = [
  {
    id: 301,
    slug: "dfs-expansion-rural-kenya",
    title: { rendered: "DFS Expansion in Rural Kenya" },
    content: {
      rendered:
        "<p>This programme expands digital financial services to rural and peri-urban communities across 14 counties in Kenya. Working with Safaricom, Equity Bank, and a network of 200 agents, the project delivers savings, credit, and insurance products tailored to agricultural cycles.</p><h2>Approach</h2><p>Co-design workshops with farmer cooperatives shaped the product specifications. Regulatory engagement with the Central Bank of Kenya enabled sandbox testing of new savings instruments.</p>",
    },
    excerpt: {
      rendered: "<p>Expanding digital financial services to rural and peri-urban communities across 14 counties in Kenya.</p>",
    },
    date: "2023-06-01T10:00:00",
    modified: now,
    status: "publish",
    acf: {
      budget: "$4.2M",
      duration: "2023–2026",
      status: "active",
      partners: ["Safaricom", "Equity Bank", "Kenya Central Bank", "Agricultural Finance Corporation"],
      impact_metrics: [
        { metric: "New accounts opened", value: "840K", baseline: "0" },
        { metric: "Agent network expansion", value: "200", baseline: "45" },
        { metric: "Loan disbursements", value: "$12M", baseline: "$0" },
      ],
      timeline_events: [
        { date: "Jun 2023", title: "Project launch", description: "Signed MoUs with Safaricom and Equity Bank" },
        { date: "Sep 2023", title: "Regulatory approval", description: "CBK sandbox approval for savings product" },
        { date: "Mar 2024", title: "Pilot launch", description: "Rolled out in 3 counties with 50 agents" },
        { date: "Dec 2024", title: "Scale phase", description: "Expanded to 14 counties, 200 agents" },
      ],
    },
    themes: [mockThemes[0]],
    countries: [mockCountryTerms[0]],
    programmes: [mockProgrammes[2]],
  },
  {
    id: 302,
    slug: "green-bond-framework-rwanda",
    title: { rendered: "Green Bond Framework Development — Rwanda" },
    content: {
      rendered:
        "<p>FSD Africa supported the Government of Rwanda in developing its sovereign green bond framework, resulting in the first green bond issuance in sub-Saharan Africa.</p><h2>Impact</h2><p>The $30 million issuance finances solar microgrids, flood protection infrastructure, and climate-resilient agriculture. The framework is being replicated in Ghana and Kenya.</p>",
    },
    excerpt: {
      rendered: "<p>Supporting the Government of Rwanda in developing its sovereign green bond framework.</p>",
    },
    date: "2022-09-01T10:00:00",
    modified: now,
    status: "publish",
    acf: {
      budget: "$1.8M",
      duration: "2022–2024",
      status: "completed",
      partners: ["Rwanda Ministry of Finance", "Kigali Stock Exchange", "Green Climate Fund"],
      impact_metrics: [
        { metric: "Capital raised", value: "$30M", baseline: "$0" },
        { metric: "Replication countries", value: "2", baseline: "0" },
      ],
      timeline_events: [
        { date: "Sep 2022", title: "Framework design", description: "Technical assistance begins" },
        { date: "Jun 2023", title: "Framework approval", description: "Approved by Rwanda Capital Market Authority" },
        { date: "Nov 2023", title: "Bond issuance", description: "$30M green bond listed on Kigali Stock Exchange" },
      ],
    },
    themes: [mockThemes[1]],
    countries: [mockCountryTerms[3]],
    programmes: [mockProgrammes[1]],
  },
];

export const mockEvents: Event[] = [
  {
    id: 401,
    slug: "africa-climate-finance-summit-2024",
    title: { rendered: "Africa Climate Finance Summit 2024" },
    content: { rendered: "<p>Annual gathering of policymakers, investors, and practitioners working on climate finance in Africa.</p>" },
    excerpt: { rendered: "<p>Annual gathering of policymakers, investors, and practitioners.</p>" },
    date: "2024-06-15T10:00:00",
    modified: now,
    status: "publish",
    acf: {
      event_date: "2024-06-15",
      end_date: "2024-06-17",
      location: "Nairobi, Kenya",
      venue: "Kenyatta International Convention Centre",
      event_type: "conference",
      is_virtual: false,
    },
    themes: [mockThemes[1]],
    countries: [mockCountryTerms[0]],
  },
];

export const mockPeople: Person[] = [
  {
    id: 501,
    slug: "mark-napier",
    title: { rendered: "Mark Napier" },
    content: { rendered: "<p>Chief Executive Officer of FSD Africa since 2015.</p>" },
    acf: {
      role: "Chief Executive Officer",
      department: "Executive Leadership",
      biography: "Mark Napier has led FSD Africa since 2015, overseeing expansion to 38 countries.",
      order: 1,
    },
  },
];

export const mockPartners: Partner[] = [
  {
    id: 601,
    slug: "fcdo",
    title: { rendered: "FCDO" },
    content: { rendered: "<p>The UK's Foreign, Commonwealth & Development Office is FSD Africa's primary funder.</p>" },
    acf: {
      partner_type: "donor",
      website_url: "https://gov.uk/fcdo",
      country: "United Kingdom",
      since: "2012",
    },
    themes: mockThemes,
  },
];
