"use client";
import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function RosterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting"); setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/roster", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
          Got it. We’ll be in touch when something fits.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-7 border-t-2 border-ink pt-10">
      {/* Honeypot — bots fill this; humans don't see it. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <FieldGroup label="Name">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="First Name" name="firstName" required />
          <Field label="Last Name"  name="lastName"  required />
        </div>
      </FieldGroup>

      <Field label="Area of Expertise" name="expertise" required hint="e.g. Performance media · Brand strategy · Production" />
      <Field label="Email"             name="email"     type="email" required />
      <Field label="LinkedIn Profile"  name="linkedin"  type="url" required placeholder="https://" />
      <Field label="Portfolio Site"    name="portfolio" type="url" hint="If applicable" placeholder="https://" />
      <Field label="Message"           name="message"   textarea />

      <div className="flex items-center gap-6 pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ padding: "16px 28px", borderRadius: 999, letterSpacing: "0.18em", fontSize: 13, fontWeight: 600 }}
        >
          {status === "submitting" ? "SENDING…" : "SEND"}
        </button>
        {status === "error" && <p className="text-sm text-red-700 m-0">{error}</p>}
      </div>
    </form>
  );
}

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-ink" style={{ fontFamily: '"Instrument Serif", serif', fontSize: 22, fontWeight: 400 }}>{label}</span>
      {children}
    </div>
  );
}

function Field({
  label, name, type = "text", textarea, required, hint, placeholder,
}: {
  label: string; name: string; type?: string; textarea?: boolean; required?: boolean; hint?: string; placeholder?: string;
}) {
  const inputCls = "w-full bg-transparent border border-ink/35 rounded-full focus:border-ink focus:outline-none px-5 py-3 font-body text-[16px] text-ink placeholder:text-ink-400";
  const textareaCls = "w-full bg-transparent border border-ink/35 rounded-2xl focus:border-ink focus:outline-none px-5 py-4 font-body text-[16px] text-ink placeholder:text-ink-400 min-h-[140px]";
  return (
    <label className="flex flex-col gap-2">
      <span className="flex items-baseline gap-2">
        <span className="text-ink" style={{ fontFamily: '"Instrument Serif", serif', fontSize: 22, fontWeight: 400 }}>{label}</span>
        {required && <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-ink-400">(required)</span>}
        {hint && !required && <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-ink-400">{hint}</span>}
      </span>
      {required && hint && <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-ink-400 -mt-1">{hint}</span>}
      {textarea ? (
        <textarea name={name} required={required} placeholder={placeholder} className={textareaCls} />
      ) : (
        <input name={name} type={type} required={required} placeholder={placeholder} className={inputCls} />
      )}
    </label>
  );
}
