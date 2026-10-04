"use client";

import { ArrowRight, Check } from "lucide-react";
import { startTransition, useActionState, useState, type CSSProperties, type FormEvent } from "react";
import { sendMessage } from "@/app/contact/actions";
import { Button } from "@/components/ui/Button";
import { ChipGroup } from "@/components/ui/ChipGroup";
import { Input, Textarea } from "@/components/ui/Field";
import { cn } from "@/lib/utils";
import {
  contactSubjects,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactState,
  type ContactSubject,
} from "@/lib/contact";

const initialState: ContactState = { status: "idle" };

/** Glass card holding the form; remounting the form resets it after a successful send. */
export function ContactCard({ style, className }: { style?: CSSProperties; className?: string }) {
  const [formKey, setFormKey] = useState(0);
  return (
    <div
      data-reveal=""
      style={style}
      className={cn(
        "glass flex flex-col rounded-[28px] p-5 sm:rounded-[32px] sm:p-8 md:p-10 xl:min-h-[560px] fit:min-h-0",
        className,
      )}
    >
      <ContactForm key={formKey} onReset={() => setFormKey((k) => k + 1)} />
    </div>
  );
}

function ContactForm({ onReset }: { onReset: () => void }) {
  const [state, formAction, pending] = useActionState(sendMessage, initialState);
  const [subject, setSubject] = useState<ContactSubject>("Freelance");
  const [clientErrors, setClientErrors] = useState<ContactErrors>({});
  // Server errors stay visible until the field is edited.
  const [dirty, setDirty] = useState<Partial<Record<ContactField, boolean>>>({});

  if (state.status === "sent") return <SentPanel onReset={onReset} />;

  const serverErrors = state.status === "error" ? (state.errors ?? {}) : {};
  const errorFor = (field: ContactField) => clientErrors[field] ?? (dirty[field] ? undefined : serverErrors[field]);

  // With JS, submit is dispatched manually: React's automatic form reset would
  // otherwise wipe the fields when the server returns an error.
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const { errors } = validateContact({
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      subject,
      message: String(data.get("message") ?? ""),
    });
    if (errors) {
      setClientErrors(errors);
      const first = (["name", "email", "message"] as const).find((f) => errors[f]);
      if (first) form.querySelector<HTMLElement>(`#contact-${first}`)?.focus();
      return;
    }
    setClientErrors({});
    setDirty({});
    startTransition(() => formAction(data));
  }

  function clearError(field: ContactField) {
    setDirty((d) => ({ ...d, [field]: true }));
    if (!clientErrors[field]) return;
    setClientErrors((errors) => {
      const next = { ...errors };
      delete next[field];
      return next;
    });
  }

  return (
    <form action={formAction} onSubmit={onSubmit} noValidate className="flex flex-1 flex-col gap-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-display text-[clamp(32px,3vw,40px)] leading-none text-fg-strong">Envoyer un message</h2>
        <span className="font-mono text-xs text-faint">Réponse sous 48 h</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          id="contact-name"
          name="name"
          label="Nom"
          placeholder="Votre nom"
          autoComplete="name"
          error={errorFor("name")}
          onChange={() => clearError("name")}
        />
        <Input
          id="contact-email"
          name="email"
          type="email"
          label="Email"
          placeholder="vous@exemple.com"
          autoComplete="email"
          error={errorFor("email")}
          onChange={() => clearError("email")}
        />
      </div>

      <ChipGroup label="Objet" name="subject" options={contactSubjects} value={subject} onChange={setSubject} />

      <Textarea
        id="contact-message"
        name="message"
        label="Message"
        placeholder="Parlez-moi de votre projet, de vos délais, de votre budget…"
        // Fills the card only when the page fits the viewport (desktop); fixed height otherwise.
        wrapperClassName="fit:flex-1 fit:[&>textarea]:flex-1"
        error={errorFor("message")}
        onChange={() => clearError("message")}
      />

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Site web</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <span className="max-w-[260px] text-[13px] leading-[1.5] text-faint">
          Vos informations servent uniquement à vous répondre.
        </span>
        <Button
          type="submit"
          size="submit"
          loading={pending}
          icon={pending ? undefined : <ArrowRight size={18} />}
          className="w-full justify-between sm:w-auto"
        >
          {pending ? "Envoi en cours…" : "Envoyer le message"}
        </Button>
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="text-[13px] text-error-msg">
          {state.message}
        </p>
      )}
    </form>
  );
}

function SentPanel({ onReset }: { onReset: () => void }) {
  return (
    <div role="status" className="flex flex-1 flex-col items-center justify-center gap-[18px] text-center">
      <span className="btn-primary grid size-[84px] place-items-center rounded-full">
        <Check size={34} aria-hidden="true" />
      </span>
      <h2 className="mt-3.5 font-display text-[56px] leading-none text-fg-strong">
        Message <em className="text-accent-light">envoyé</em>
      </h2>
      <p className="max-w-[360px] text-base leading-[1.6] text-muted">
        Merci ! Je reviens vers vous sous 48 h à l&apos;adresse indiquée.
      </p>
      <Button variant="soft" onClick={onReset} className="mt-3">
        Écrire un autre message
      </Button>
    </div>
  );
}
