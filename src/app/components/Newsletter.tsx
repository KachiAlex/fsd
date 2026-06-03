"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const MAILCHIMP_URL = process.env.NEXT_PUBLIC_MAILCHIMP_URL || "";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg("Please enter a valid email address");
      setStatus("error");
      return;
    }

    setStatus("submitting");

    if (!MAILCHIMP_URL) {
      setErrorMsg("Newsletter signup is not yet configured.");
      setStatus("error");
      return;
    }

    try {
      // Mailchimp embed forms accept a simple POST.
      // For a production setup, use the Mailchimp API or a serverless function
      // to avoid CORS and protect your API key.
      const formData = new FormData();
      formData.append("EMAIL", email);

      const res = await fetch(MAILCHIMP_URL, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });

      // no-cors means we can't read the response, so we assume success.
      setStatus("success");
      setEmail("");
    } catch {
      setErrorMsg("Signup failed. Please try again later.");
      setStatus("error");
    }
  };

  return (
    <div className="bg-navy rounded-lg px-6 py-8 sm:px-10 sm:py-10">
      <h3 className="font-serif text-lg font-semibold text-white mb-2">
        Stay informed
      </h3>
      <p className="text-xs text-white/70 mb-5 max-w-sm">
        Get the latest research, event invitations, and programme updates delivered to your inbox.
      </p>

      {status === "success" ? (
        <div className="flex items-center gap-2 text-green">
          <CheckCircle className="w-4 h-4" />
          <span className="text-xs font-medium">You&apos;re subscribed. Thank you!</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3" noValidate>
          <div className="flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-white/50 outline-none focus:border-white/40"
              required
            />
            {status === "error" && errorMsg && (
              <span className="text-[10px] text-red-300 mt-1 block">{errorMsg}</span>
            )}
          </div>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="bg-gold text-white text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-gold/90 transition-colors cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2 flex-shrink-0"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Subscribing...
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                Subscribe
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
