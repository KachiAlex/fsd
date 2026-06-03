"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  organisation: string;
  enquiryType: string;
  message: string;
}


export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    organisation: "",
    enquiryType: "Partnership opportunity",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (): boolean => {
    if (!formData.firstName.trim()) {
      setErrorMsg("First name is required");
      return false;
    }
    if (!formData.lastName.trim()) {
      setErrorMsg("Last name is required");
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMsg("A valid email is required");
      return false;
    }
    if (!formData.message.trim()) {
      setErrorMsg("Message is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!validate()) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          organisation: "",
          enquiryType: "Partnership opportunity",
          message: "",
        });
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.message || "Submission failed. Please try again later.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
        <CheckCircle className="w-10 h-10 text-green" />
        <h3 className="font-serif text-lg font-semibold text-navy">Message sent</h3>
        <p className="text-xs text-muted max-w-xs">
          Thank you for reaching out. We will get back to you within two business days.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-xs font-semibold text-mid hover:underline mt-2"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      {status === "error" && errorMsg && (
        <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5">
          <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
          <span className="text-xs text-red-700">{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="text-xs font-medium text-navy mb-1 block">
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border border-border rounded-lg px-3.5 py-2.5 text-xs outline-none focus:border-mid"
            placeholder="Jane"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="text-xs font-medium text-navy mb-1 block">
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border border-border rounded-lg px-3.5 py-2.5 text-xs outline-none focus:border-mid"
            placeholder="Doe"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="text-xs font-medium text-navy mb-1 block">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-border rounded-lg px-3.5 py-2.5 text-xs outline-none focus:border-mid"
          placeholder="jane@organisation.org"
          required
        />
      </div>

      <div>
        <label htmlFor="organisation" className="text-xs font-medium text-navy mb-1 block">
          Organisation
        </label>
        <input
          id="organisation"
          name="organisation"
          type="text"
          value={formData.organisation}
          onChange={handleChange}
          className="w-full border border-border rounded-lg px-3.5 py-2.5 text-xs outline-none focus:border-mid"
          placeholder="Your organisation"
        />
      </div>

      <div>
        <label htmlFor="enquiryType" className="text-xs font-medium text-navy mb-1 block">
          Enquiry type
        </label>
        <select
          id="enquiryType"
          name="enquiryType"
          value={formData.enquiryType}
          onChange={handleChange}
          className="w-full border border-border rounded-lg px-3.5 py-2.5 text-xs outline-none focus:border-mid bg-white text-muted"
        >
          <option>Partnership opportunity</option>
          <option>Media enquiry</option>
          <option>Research collaboration</option>
          <option>General enquiry</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="text-xs font-medium text-navy mb-1 block">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full border border-border rounded-lg px-3.5 py-2.5 text-xs outline-none focus:border-mid resize-none"
          placeholder="How can we help?"
          required
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-mid text-white text-xs font-semibold px-6 py-3 rounded-lg hover:bg-mid/90 transition-colors w-full sm:w-auto cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-3.5 h-3.5" />
            Send message
          </>
        )}
      </button>
    </form>
  );
}
