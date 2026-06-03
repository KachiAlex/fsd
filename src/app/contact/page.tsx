import type { Metadata } from "next";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import ContactJsonLd from "../components/ContactJsonLd";
import HeroBanner from "../components/HeroBanner";
import ContactForm from "../components/ContactForm";
import Newsletter from "../components/Newsletter";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with FSD Africa. Find our offices, contact details, and enquiry form.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | FSD Africa",
    description:
      "Get in touch with FSD Africa. Find our offices, contact details, and enquiry form.",
    url: "/contact",
  },
  twitter: {
    title: "Contact | FSD Africa",
    description:
      "Get in touch with FSD Africa. Find our offices, contact details, and enquiry form.",
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactJsonLd />
      <div className="flex flex-col">
      <HeroBanner>
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
      </HeroBanner>

      {/* CONTACT CONTENT */}
      <section className="px-4 sm:px-10 py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* FORM */}
          <div>
            <h2 className="font-serif text-xl font-semibold text-navy mb-6">Send us a message</h2>
            <ContactForm />
          </div>

          {/* CONTACT DETAILS */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="font-serif text-xl font-semibold text-navy mb-6">Get in touch</h2>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-mid mt-0.5" strokeWidth={1.8} />
                  <div>
                    <div className="text-xs font-medium text-navy">Email</div>
                    <div className="text-xs text-muted">info@fsdafrica.org</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-mid mt-0.5" strokeWidth={1.8} />
                  <div>
                    <div className="text-xs font-medium text-navy">Phone</div>
                    <div className="text-xs text-muted">+254 20 271 4020</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-mid mt-0.5" strokeWidth={1.8} />
                  <div>
                    <div className="text-xs font-medium text-navy">Head Office</div>
                    <div className="text-xs text-muted">
                      4th Floor, Delta Corner Tower
                      <br />
                      Chiromo Road, Nairobi
                      <br />
                      Kenya
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-base font-semibold text-navy mb-4">Regional offices</h3>
              <div className="flex flex-col gap-3">
                {[
                  { city: "Addis Ababa", country: "Ethiopia" },
                  { city: "Accra", country: "Ghana" },
                  { city: "Kigali", country: "Rwanda" },
                ].map((office, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-muted">
                    <MapPin className="w-3 h-3 text-mid" strokeWidth={2} />
                    {office.city}, {office.country}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-serif text-base font-semibold text-navy mb-4">Follow us</h3>
              <div className="flex gap-3">
                <a href="#" className="text-muted hover:text-mid transition-colors" aria-label="Twitter">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="#" className="text-muted hover:text-mid transition-colors" aria-label="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="#" className="text-muted hover:text-mid transition-colors" aria-label="YouTube">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="px-4 sm:px-10 py-12 sm:py-16 bg-off">
        <div className="max-w-4xl mx-auto">
          <Newsletter />
        </div>
      </section>
    </div>
    </>
  );
}
