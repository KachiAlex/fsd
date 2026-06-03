"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_ID || typeof window === "undefined" || !(window as any).gtag) return;

    (window as any).gtag("config", GA_ID, {
      page_path: pathname,
      page_location: window.location.href,
    });
  }, [pathname]);

  return null;
}
