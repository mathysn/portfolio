import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type FieldShellProps = {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
};

function FieldShell({ id, label, error, className, children }: FieldShellProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-[13px] font-medium text-fg-2">
        {label}
      </label>
      {children}
      {error && (
        <span id={`${id}-error`} className="text-[13px] text-error-msg">
          {error}
        </span>
      )}
    </div>
  );
}

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
  id: string;
  label: string;
  error?: string;
  wrapperClassName?: string;
};

export function Input({ id, label, error, wrapperClassName, className, ...props }: InputProps) {
  return (
    <FieldShell id={id} label={label} error={error} className={wrapperClassName}>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn("field", className)}
        {...props}
      />
    </FieldShell>
  );
}

type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> & {
  id: string;
  label: string;
  error?: string;
  wrapperClassName?: string;
};

export function Textarea({ id, label, error, wrapperClassName, className, ...props }: TextareaProps) {
  return (
    <FieldShell id={id} label={label} error={error} className={wrapperClassName}>
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn("field", className)}
        {...props}
      />
    </FieldShell>
  );
}
