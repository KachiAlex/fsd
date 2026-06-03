import type { Metadata } from "next";
import HomeClient from "./components/HomeClient";
import { getHomepageData } from "@/lib/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "FSD Africa | Building Financial Systems That Work for Everyone",
  description:
    "FSD Africa is a specialist development agency working to reduce poverty across sub-Saharan Africa by building financial markets that are efficient, robust, and inclusive.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "FSD Africa | Building Financial Systems That Work for Everyone",
    description:
      "FSD Africa is a specialist development agency working to reduce poverty across sub-Saharan Africa by building financial markets that are efficient, robust, and inclusive.",
    url: "/",
  },
  twitter: {
    title: "FSD Africa | Building Financial Systems That Work for Everyone",
    description:
      "FSD Africa is a specialist development agency working to reduce poverty across sub-Saharan Africa by building financial markets that are efficient, robust, and inclusive.",
  },
};

export default async function HomePage() {
  const { featuredStories, latestPublications } = await getHomepageData();

  return (
    <HomeClient
      featuredStories={featuredStories}
      latestPublications={latestPublications}
    />
  );
}
