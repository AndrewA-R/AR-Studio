"use client";
import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({ kind = "general" }: { kind?: "general" | "roster" }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting"); setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, kind }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Submission failed");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed");
    }
  }

  if (status === "success") {
    return (
      <div className="border-t-2 border-ink pt-10">
        <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-purple-700 mb-4">§ Thanks</div>
        <p className="text-ink m-0 max-w-[40ch]" style={{ fontFamily: '"Instrument Serif", serif', fontSize: 36, lineHeight: 1.1 }}>
          Got it. We’ll be in touch within a couple business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t-2 border-ink pt-10">
      <Field label="Your name" name="name" required />
      <Field label="Email" name="email" type="email" required />
      <Field label="Company" name="company" />
      <Field label="Role" name="role" />
      <Field label={kind === "roster" ? "Discipline (e.g. Performance media, Brand strategy)" : "What are you trying to do?"} name="subject" full />
      <Field label="Tell us a bit more" name="message" textarea full />
      <div className="sm:col-span-2 flex items-center justify-between gap-6 pt-2">
        <p className="m-0 text-xs text-ink-400 max-w-[40ch]">We read everything. Replies usually within two business days.</p>
        <button type="submit" disabled={status === "submitting"}
          className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ padding: "14px 22px" }}>
          {status === "submitting" ? "Sending…" : "Send →"}
        </button>
      </div>
      {status === "error" && <p className="sm:col-span-2 text-sm text-red-700 m-0">{error}</p>}
    </form>
  );
}

function Field({ label, name, type = "text", textarea, required, full }: {
  label: string; name: string; type?: string; textarea?: boolean; required?: boolean; full?: boolean;
}) {
  const inputCls = "w-full bg-transparent border-b border-ink/30 focus:border-ink outline-none py-2.5 font-body text-[17px] text-ink placeholder:text-ink-400";
  return (
    <label className={`flex flex-col gap-2 ${full ? "sm:col-span-2" : ""}`}>
      <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink-400">{label}{required && <span className="text-purple-700"> *</span>}</span>
      {textarea ? (
        <textarea name={name} rows={4} required={required} className={inputCls} />
      ) : (
        <input name={name} type={type} required={required} className={inputCls} />
      )}
    </label>
  );
}
