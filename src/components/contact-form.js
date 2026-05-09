"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitAssessment } from "@/app/actions";

const initialState = {
  status: "idle",
  message: "",
  fields: {
    name: "",
    designation: "",
    company: "",
    phone: "",
    email: "",
    comments: "",
  },
};

function SubmitButton() {
  const { pending } = useFormStatus();

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

function Field({ label, name, type = "text", rows, defaultValue, required = true }) {
  const baseClassName =
    "w-full rounded-[1.35rem] border border-white/10 bg-white/5 px-4 py-4 text-sm text-foreground outline-none transition placeholder:text-foreground/32 focus:border-brand-green focus:bg-white/8";

  return (
    <label className="space-y-3 text-xs font-semibold uppercase tracking-[0.3em] text-foreground/58">
      <span>{label}</span>
      {rows ? (
        <textarea
          name={name}
          rows={rows}
          defaultValue={defaultValue}
          required={required}
          className={`${baseClassName} resize-y`}
        />
      ) : (
        <input
          type={type}
          name={name}
          defaultValue={defaultValue}
          required={required}
          className={baseClassName}
        />
      )}
    </label>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(submitAssessment, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="Name"
          name="name"
          defaultValue={state.fields?.name}
        />
        <Field
          label="Designation"
          name="designation"
          defaultValue={state.fields?.designation}
        />
        <Field
          label="Company Name"
          name="company"
          defaultValue={state.fields?.company}
        />
        <Field
          label="Phone Number"
          name="phone"
          type="tel"
          defaultValue={state.fields?.phone}
        />
        <div className="md:col-span-2">
          <Field
            label="Email Address"
            name="email"
            type="email"
            defaultValue={state.fields?.email}
          />
        </div>
        <div className="md:col-span-2">
          <Field
            label="Comments"
            name="comments"
            rows={5}
            required={false}
            defaultValue={state.fields?.comments}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p
          aria-live="polite"
          className={`max-w-xl text-sm leading-7 ${
            state.status === "success" ? "text-brand-green" : "text-foreground/70"
          }`}
        >
          {state.message ||
            "Tell us where the friction is. We will take a proper look and come back with clear next steps."}
        </p>
        <div className="w-full md:max-w-xs">
          <SubmitButton />
        </div>
      </div>
    </form>
  );
}

