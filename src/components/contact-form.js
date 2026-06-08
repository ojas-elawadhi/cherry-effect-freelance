"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const idleMessage =
  "Tell us where the friction is. We will take a proper look and come back with clear next steps.";

function SubmitButton({ pending }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center rounded-full border border-primary/30 bg-primary px-6 py-4 text-sm font-bold uppercase tracking-[0.24em] text-white transition hover:-translate-y-0.5 hover:border-brand-yellow/40 hover:bg-[#ff3ba9] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Sending..." : "Get Free Assessment"}
    </button>
  );
}

function Field({ label, name, type = "text", rows, required = true }) {
  const baseClassName =
    "w-full rounded-[1.35rem] border border-white/10 bg-white/5 px-4 py-4 text-sm text-foreground outline-none transition placeholder:text-foreground/32 focus:border-brand-green focus:bg-white/8";

  return (
    <label className="space-y-3 text-xs font-semibold uppercase tracking-[0.3em] text-foreground/58">
      <span>{label}</span>
      {rows ? (
        <textarea
          name={name}
          rows={rows}
          required={required}
          className={`${baseClassName} resize-y`}
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          className={baseClassName}
        />
      )}
    </label>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const fields = {
      name: String(formData.get("name") || "").trim(),
      designation: String(formData.get("designation") || "").trim(),
      company: String(formData.get("company") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      comments: String(formData.get("comments") || "").trim(),
    };

    if (
      !fields.name ||
      !fields.designation ||
      !fields.company ||
      !fields.phone ||
      !fields.email
    ) {
      setStatus("error");
      setMessage(
        "Fill in the required details so we can assess your company properly."
      );
      return;
    }

    if (!emailPattern.test(fields.email)) {
      setStatus("error");
      setMessage("Add a valid email address and we will get back to you there.");
      return;
    }

    setStatus("pending");
    setMessage("");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          Name: fields.name,
          email: fields.email,
          phone: fields.phone,
          company_name: fields.company,
          designation: fields.designation,
          comments: fields.comments || "—",
        },
        { publicKey: PUBLIC_KEY }
      );

      setStatus("success");
      setMessage(
        "Assessment request received. We will reach out with the next steps shortly."
      );
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        "Something went wrong while sending. Please try again or email us directly."
      );
    }
  }

  const pending = status === "pending";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name" name="name" />
        <Field label="Designation" name="designation" />
        <Field label="Company Name" name="company" />
        <Field label="Phone Number" name="phone" type="tel" />
        <div className="md:col-span-2">
          <Field label="Email Address" name="email" type="email" />
        </div>
        <div className="md:col-span-2">
          <Field label="Comments" name="comments" rows={5} required={false} />
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p
          aria-live="polite"
          className={`max-w-xl text-sm leading-7 ${
            status === "success" ? "text-brand-green" : "text-foreground/70"
          }`}
        >
          {message || idleMessage}
        </p>
        <div className="w-full md:max-w-xs">
          <SubmitButton pending={pending} />
        </div>
      </div>
    </form>
  );
}
