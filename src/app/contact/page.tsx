import { Globe } from "lucide-react";

export const metadata = {
  title: "Contact | FSD Africa",
  description: "Get in touch with FSD Africa.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden min-h-[380px] sm:min-h-[420px] flex items-center justify-center px-4 sm:px-10 py-16 sm:py-20">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/hero-banner.png)" }} />
        <div className="absolute inset-0 bg-navy/70" />
        <div className="relative z-10 max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 bg-gold px-3 py-1.5 rounded-sm mb-5 mx-auto">
            <Globe className="w-3 h-3 text-white" />
            <span className="text-[10px] font-bold tracking-[2.5px] uppercase text-white">
              Contact
            </span>
          </div>
          <h1 className="font-serif text-[clamp(2.25rem,5vw,3.25rem)] leading-[1.15] text-white mb-4">
            Let&apos;s build
            <br />
            <em className="text-sky">something together.</em>
          </h1>
        </div>
      </section>
      <section className="px-4 sm:px-10 py-20 bg-white text-center">
        <h2 className="font-serif text-xl font-semibold text-navy mb-3">Coming soon</h2>
        <p className="text-sm text-muted max-w-md mx-auto">
          Our full contact page with enquiry form, office locations, and contact details is under development.
        </p>
        <p className="text-sm text-muted mt-2">Email us at info@fsdafrica.org</p>
      </section>
    </div>
  );
}
