"use server";

import { Resend } from "resend";
import { validateContact, type ContactState } from "@/lib/contact";
import { site } from "@/lib/site";

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: bots fill every field, humans never see this one.
  if (formData.get("website")) return { status: "sent" };

  const { data, errors } = validateContact({
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    subject: String(formData.get("subject") ?? ""),
    message: String(formData.get("message") ?? ""),
  });
  if (!data) return { status: "error", errors };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.info("[contact] RESEND_API_KEY absente — message non envoyé :", data);
    return { status: "sent" };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
    to: process.env.CONTACT_TO_EMAIL || site.email,
    replyTo: data.email,
    subject: `[${data.subject}] Nouveau message de ${data.name}`,
    text: `${data.message}\n\n— ${data.name} <${data.email}>`,
  });

  if (error) {
    console.error("[contact] Échec de l'envoi Resend :", error);
    return {
      status: "error",
      message: `L'envoi a échoué. Réessayez dans un instant ou écrivez directement à ${site.email}.`,
    };
  }
  return { status: "sent" };
}
