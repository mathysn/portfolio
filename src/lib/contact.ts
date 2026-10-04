import { z } from "zod";

export const contactSubjects = ["Freelance", "CDI", "Collaboration", "Autre"] as const;
export type ContactSubject = (typeof contactSubjects)[number];

// Partagé par la validation client (affichage immédiat) et la server action.
export const contactSchema = z.object({
  name: z.string().trim().min(1, "Indiquez votre nom").max(120, "Nom trop long"),
  email: z.string().trim().pipe(z.email("Adresse email invalide")),
  subject: z.enum(contactSubjects).catch("Autre"),
  message: z.string().trim().min(1, "Écrivez quelques mots sur votre projet").max(5000, "Message trop long"),
});

/** Raw form values, before validation. */
export type ContactInput = Record<"name" | "email" | "subject" | "message", string>;
export type ContactField = "name" | "email" | "message";
export type ContactErrors = Partial<Record<ContactField, string>>;

export type ContactState =
  | { status: "idle" }
  | { status: "sent" }
  | { status: "error"; errors?: ContactErrors; message?: string };

export function validateContact(input: ContactInput) {
  const result = contactSchema.safeParse(input);
  if (result.success) return { data: result.data, errors: undefined };
  const errors: ContactErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as ContactField;
    errors[field] ??= issue.message;
  }
  return { data: undefined, errors };
}
