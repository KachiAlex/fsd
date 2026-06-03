export default function WebPageJsonLd({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `https://fsdafrica.org${path}`,
    publisher: {
      "@type": "Organization",
      name: "FSD Africa",
      logo: {
        "@type": "ImageObject",
        url: "https://fsdafrica.org/hero-banner.png",
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
