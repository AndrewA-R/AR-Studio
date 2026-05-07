"use client";
import { useState } from "react";

type Props = {
  /** "footer" → tight 1-line layout. "card" → bigger stacked layout for the contact section. */
  variant?: "footer" | "card";
  className?: string;
};

export function NewsletterForm({ variant = "footer", className = "" }: Props) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setState("loading"); setMsg("");
    try {
      const r = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const j = await r.json().catch(() => ({}));
      if (r.ok) {
        setState("ok");
        setMsg(j.message || "Thanks — check your inbox to confirm.");
        setEmail("");
      } else {
        setState("err");
        setMsg(j.error || "Couldn't subscribe. Please try again.");
      }
    } catch {
      setState("err"); setMsg("Network error. Please try again.");
    }
  }

  if (variant === "card") {
    return (
      <form onSubmit={onSubmit} className={`flex flex-col gap-3 ${className}`}>
        <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-purple-700">Email</label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="flex-1 bg-paper border border-ink/30 px-4 py-3 font-ui text-[15px] text-ink placeholder:text-ink-400 focus:outline-none focus:border-ink"
            aria-label="Email address"
          />
          <button type="submit" disabled={state === "loading"}
            className="btn-primary text-sm px-5 py-3 disabled:opacity-50">
            {state === "loading" ? "…" : "Subscribe"}
          </button>
        </div>
        {msg && (
          <span className={`font-ui text-[13px] ${state === "err" ? "text-red-700" : "text-purple-700"}`}>{msg}</span>
        )}
      </form>
    );
  }

  // footer variant — tight, single-line
  return (
    <form onSubmit={onSubmit} className={`flex flex-col gap-2 ${className}`}>
      <div className="flex gap-2">
        <input
          type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="flex-1 min-w-0 bg-transparent border-b border-bone/30 py-1.5 font-ui text-[14px] text-bone placeholder:text-bone/40 focus:outline-none focus:border-bone"
          aria-label="Email address"
        />
        <button type="submit" disabled={state === "loading"}
          className="font-ui text-[13px] font-medium text-bone border border-bone/30 px-3 py-1.5 hover:bg-bone hover:text-purple-950 disabled:opacity-50">
          {state === "loading" ? "…" : "Subscribe"}
        </button>
      </div>
      {msg && (
        <span className={`font-ui text-[12px] ${state === "err" ? "text-red-300" : "text-purple-300"}`}>{msg}</span>
      )}
    </form>
  );
}
