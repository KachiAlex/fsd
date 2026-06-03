import Image from "next/image";
import { ReactNode } from "react";

interface HeroBannerProps {
  children: ReactNode;
  src?: string;
  minHeight?: string;
  alt?: string;
  overlayOpacity?: string;
  innerClassName?: string;
}

export default function HeroBanner({
  children,
  src = "/hero-banner.png",
  minHeight = "min-h-[380px] sm:min-h-[420px]",
  alt = "FSD Africa",
  overlayOpacity = "bg-navy/70",
  innerClassName = "max-w-3xl text-center",
}: HeroBannerProps) {
  return (
    <section
      className={`relative overflow-hidden ${minHeight} flex items-center justify-center px-4 sm:px-10 py-16 sm:py-20`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className={`absolute inset-0 ${overlayOpacity}`} />
      <div className={`relative z-10 ${innerClassName}`}>{children}</div>
    </section>
  );
}
