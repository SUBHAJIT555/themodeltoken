"use client";

import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type RequestCallbackModalProps = {
  open: boolean;
  onClose: () => void;
};

type CallbackFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

const MAIL_ENDPOINT = "/mail.php";

const fieldClassName =
  "w-full rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-sm text-[var(--th-heading)] outline-none transition-colors placeholder:text-black/35 focus:border-black/25 focus:ring-2 focus:ring-black/5";

const fieldErrorClassName =
  "border-red-400 focus:border-red-400 focus:ring-red-100";

function CallbackDialog({ onClose }: { onClose: () => void }) {
  const titleId = useId();
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CallbackFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const onSubmit = async (values: CallbackFormValues) => {
    setSubmitError(null);

    const body = new FormData();
    body.append("formType", "callback");
    body.append("firstName", values.firstName.trim());
    body.append("lastName", values.lastName.trim());
    body.append("email", values.email.trim());
    body.append("phone", values.phone.trim());

    try {
      const response = await fetch(MAIL_ENDPOINT, {
        method: "POST",
        body,
      });

      const payload = (await response.json().catch(() => null)) as {
        success?: boolean;
        message?: string;
        error?: string;
      } | null;

      if (!response.ok || !payload?.success) {
        setSubmitError(payload?.error ?? "Failed to send request. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError("Network error. Please try again.");
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <button
        type="button"
        aria-label="Close request callback overlay"
        className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 w-full max-w-[440px] overflow-hidden rounded-2xl border border-black/10 bg-white p-6 shadow-[0_24px_60px_rgba(0,0,0,0.18)]"
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2
              id={titleId}
              className="text-xl font-semibold tracking-tight text-[var(--th-heading)]"
            >
              Request CallBack
            </h2>
            <p className="mt-1 text-sm text-black/50">
              Share your details and we&apos;ll get back to you shortly.
            </p>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-black/10 text-[var(--th-heading)] transition-colors hover:bg-black/5"
          >
            <X className="size-4" />
          </button>
        </div>

        {submitted ? (
          <div className="rounded-xl bg-black/[0.03] px-4 py-8 text-center">
            <p className="text-sm font-medium text-[var(--th-heading)]">
              Thanks — we received your request.
            </p>
            <p className="mt-1 text-sm text-black/50">
              Our team will contact you soon.
            </p>
            <Button
              type="button"
              variant="signup"
              size="sm"
              className="mt-5 rounded-full"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5" noValidate>
            <div className="grid gap-3.5 sm:grid-cols-2">
              <label className="block text-left">
                <span className="mb-1.5 block text-xs font-medium text-black/55">
                  First Name
                </span>
                <input
                  autoComplete="given-name"
                  placeholder="Jane"
                  className={cn(fieldClassName, errors.firstName && fieldErrorClassName)}
                  {...register("firstName", {
                    required: "First name is required",
                    validate: (value) =>
                      value.trim().length > 0 || "First name is required",
                  })}
                />
                {errors.firstName ? (
                  <span className="mt-1 block text-xs text-red-500">
                    {errors.firstName.message}
                  </span>
                ) : null}
              </label>
              <label className="block text-left">
                <span className="mb-1.5 block text-xs font-medium text-black/55">
                  Last Name
                </span>
                <input
                  autoComplete="family-name"
                  placeholder="Doe"
                  className={cn(fieldClassName, errors.lastName && fieldErrorClassName)}
                  {...register("lastName", {
                    required: "Last name is required",
                    validate: (value) =>
                      value.trim().length > 0 || "Last name is required",
                  })}
                />
                {errors.lastName ? (
                  <span className="mt-1 block text-xs text-red-500">
                    {errors.lastName.message}
                  </span>
                ) : null}
              </label>
            </div>

            <label className="block text-left">
              <span className="mb-1.5 block text-xs font-medium text-black/55">
                Email
              </span>
              <input
                type="email"
                autoComplete="email"
                placeholder="jane@company.com"
                className={cn(fieldClassName, errors.email && fieldErrorClassName)}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
              />
              {errors.email ? (
                <span className="mt-1 block text-xs text-red-500">
                  {errors.email.message}
                </span>
              ) : null}
            </label>

            <label className="block text-left">
              <span className="mb-1.5 block text-xs font-medium text-black/55">
                Phone
              </span>
              <input
                type="tel"
                autoComplete="tel"
                placeholder="+1 555 000 0000"
                className={cn(fieldClassName, errors.phone && fieldErrorClassName)}
                {...register("phone", {
                  required: "Phone is required",
                  validate: (value) =>
                    value.trim().length > 0 || "Phone is required",
                })}
              />
              {errors.phone ? (
                <span className="mt-1 block text-xs text-red-500">
                  {errors.phone.message}
                </span>
              ) : null}
            </label>

            {submitError ? (
              <p className="text-sm text-red-500">{submitError}</p>
            ) : null}

            <Button
              type="submit"
              variant="signup"
              size="lg"
              className="mt-2 w-full rounded-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Submit Request"}
            </Button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

export function RequestCallbackModal({
  open,
  onClose,
}: RequestCallbackModalProps) {
  return (
    <AnimatePresence>
      {open ? <CallbackDialog key="callback-dialog" onClose={onClose} /> : null}
    </AnimatePresence>
  );
}
