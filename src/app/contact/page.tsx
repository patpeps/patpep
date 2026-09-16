"use client";

import { useState } from "react";
import { CheckCircle2, Clock, Mail, Send } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        Questions about a lot, a custom synthesis, or a bulk supply agreement? Send the details and a
        member of our scientific team will respond.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        {sent ? (
          <div className="rounded-xl border border-border bg-surface p-8 text-center">
            <CheckCircle2 className="mx-auto h-9 w-9 text-accent" />
            <h2 className="mt-4 text-lg font-semibold tracking-tight">Message queued</h2>
            <p className="mt-2 text-sm text-muted">
              Thanks — we typically reply within one business day.
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="mt-6 text-sm text-accent hover:underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="space-y-4 rounded-xl border border-border bg-surface p-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" name="name" required />
              <Field label="Work email" name="email" type="email" required />
            </div>
            <Field label="Institution" name="institution" />
            <label className="block">
              <span className="mb-1.5 block text-xs text-muted">Topic</span>
              <select
                name="topic"
                className="w-full rounded-md border border-border bg-surface-2 px-3 py-2.5 text-sm outline-none focus:border-accent/60"
              >
                <option>Certificate of analysis request</option>
                <option>Custom synthesis</option>
                <option>Bulk or recurring order</option>
                <option>Order status</option>
                <option>Other</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs text-muted">Message</span>
              <textarea
                name="message"
                rows={6}
                required
                className="w-full rounded-md border border-border bg-surface-2 px-3 py-2.5 text-sm outline-none placeholder:text-muted focus:border-accent/60"
                placeholder="Include lot numbers or compound names where relevant."
              />
            </label>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-[#05221f] transition-opacity hover:opacity-90"
            >
              <Send className="h-4 w-4" /> Send message
            </button>
          </form>
        )}

        <aside className="space-y-4">
          <div className="rounded-xl border border-border bg-surface p-5">
            <Mail className="h-5 w-5 text-accent" />
            <h2 className="mt-3 text-sm font-semibold tracking-tight">Email</h2>
            <a
              href="mailto:research@pattersonpeptides.com"
              className="mt-1 block text-sm text-muted hover:text-accent"
            >
              research@pattersonpeptides.com
            </a>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <Clock className="h-5 w-5 text-accent" />
            <h2 className="mt-3 text-sm font-semibold tracking-tight">Hours</h2>
            <p className="mt-1 text-sm text-muted">
              Monday–Friday, 9:00–17:00 CT. Orders placed before 14:00 CT ship the same day.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  ...rest
}: { label: string; name: string; type?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-muted">{label}</span>
      <input
        id={name}
        name={name}
        type={type}
        {...rest}
        className="w-full rounded-md border border-border bg-surface-2 px-3 py-2.5 text-sm outline-none focus:border-accent/60"
      />
    </label>
  );
}
