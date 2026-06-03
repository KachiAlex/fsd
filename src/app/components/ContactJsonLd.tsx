export default function ContactJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact FSD Africa",
    description: "Get in touch with FSD Africa.",
    url: "https://fsdafrica.org/contact",
    mainEntity: {
      "@type": "Organization",
      name: "FSD Africa",
      url: "https://fsdafrica.org",
      telephone: "+254-20-271-4020",
      email: "info@fsdafrica.org",
      address: {
        "@type": "PostalAddress",
        streetAddress: "4th Floor, Delta Corner Tower, Chiromo Road",
        addressLocality: "Nairobi",
        addressCountry: "KE",
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
