export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FSD Africa",
    alternateName: "Financial Sector Deepening Africa",
    url: "https://fsdafrica.org",
    logo: "https://fsdafrica.org/hero-banner.png",
    description:
      "FSD Africa partners with financial systems, policymakers, and innovators across the continent to build economies where every person and business can participate, grow, and thrive.",
    sameAs: [
      "https://twitter.com/FSDAfrica",
      "https://www.linkedin.com/company/fsd-africa",
      "https://www.youtube.com/@FSDAfrica",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "4th Floor, Delta Corner Tower, Chiromo Road",
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+254-20-271-4020",
      contactType: "General Enquiries",
      email: "info@fsdafrica.org",
      areaServed: "Sub-Saharan Africa",
      availableLanguage: ["English"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
