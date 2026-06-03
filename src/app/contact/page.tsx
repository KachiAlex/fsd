import { Globe, Mail, MapPin, Phone, Twitter, Linkedin, Youtube } from "lucide-react";

export const metadata = {
  title: "Contact | FSD Africa",
  description: "Get in touch with FSD Africa. Find our offices, contact details, and enquiry form.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* HERO */}
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

      {/* CONTACT CONTENT */}
      <section className="px-4 sm:px-10 py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* FORM */}
          <div>
            <h2 className="font-serif text-xl font-semibold text-navy mb-6">Send us a message</h2>
            <form className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-navy mb-1 block">First name</label>
                  <input
                    type="text"
                    className="w-full border border-border rounded-lg px-3.5 py-2.5 text-xs outline-none focus:border-mid"
                    placeholder="Jane"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-navy mb-1 block">Last name</label>
                  <input
                    type="text"
                    className="w-full border border-border rounded-lg px-3.5 py-2.5 text-xs outline-none focus:border-mid"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-navy mb-1 block">Email</label>
                <input
                  type="email"
                  className="w-full border border-border rounded-lg px-3.5 py-2.5 text-xs outline-none focus:border-mid"
                  placeholder="jane@organisation.org"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-navy mb-1 block">Organisation</label>
                <input
                  type="text"
                  className="w-full border border-border rounded-lg px-3.5 py-2.5 text-xs outline-none focus:border-mid"
                  placeholder="Your organisation"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-navy mb-1 block">Enquiry type</label>
                <select className="w-full border border-border rounded-lg px-3.5 py-2.5 text-xs outline-none focus:border-mid bg-white text-muted">
                  <option>Partnership opportunity</option>
                  <option>Media enquiry</option>
                  <option>Research collaboration</option>
                  <option>General enquiry</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-navy mb-1 block">Message</label>
                <textarea
                  rows={4}
                  className="w-full border border-border rounded-lg px-3.5 py-2.5 text-xs outline-none focus:border-mid resize-none"
                  placeholder="How can we help?"
                />
              </div>
              <button
                type="submit"
                className="bg-mid text-white text-xs font-semibold px-6 py-3 rounded-lg hover:bg-mid/90 transition-colors w-full sm:w-auto cursor-pointer"
              >
                Send message
              </button>
            </form>
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
                <a href="#" className="text-muted hover:text-mid transition-colors">
                  <Twitter className="w-5 h-5" strokeWidth={1.8} />
                </a>
                <a href="#" className="text-muted hover:text-mid transition-colors">
                  <Linkedin className="w-5 h-5" strokeWidth={1.8} />
                </a>
                <a href="#" className="text-muted hover:text-mid transition-colors">
                  <Youtube className="w-5 h-5" strokeWidth={1.8} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
