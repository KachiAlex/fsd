export default function AboutJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About FSD Africa",
    description:
      "FSD Africa is a specialist development agency working to reduce poverty across sub-Saharan Africa by building financial markets that are efficient, robust, and inclusive.",
    url: "https://fsdafrica.org/about",
    mainEntity: {
      "@type": "Organization",
      name: "FSD Africa",
      description:
        "A specialist development agency working to reduce poverty across sub-Saharan Africa by building inclusive financial markets.",
      url: "https://fsdafrica.org",
      logo: "https://fsdafrica.org/hero-banner.png",
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
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
