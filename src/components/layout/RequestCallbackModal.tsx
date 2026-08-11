"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";

type RequestCallbackModalProps = {
  open: boolean;
  onClose: () => void;
};

const fieldClassName =
  "w-full rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-sm text-[var(--th-heading)] outline-none transition-colors placeholder:text-black/35 focus:border-black/25 focus:ring-2 focus:ring-black/5";

function CallbackDialog({ onClose }: { onClose: () => void }) {
  const titleId = useId();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
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
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="grid gap-3.5 sm:grid-cols-2">
              <label className="block text-left">
                <span className="mb-1.5 block text-xs font-medium text-black/55">
                  First Name
                </span>
                <input
                  required
                  name="firstName"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={fieldClassName}
                  placeholder="Jane"
                />
              </label>
              <label className="block text-left">
                <span className="mb-1.5 block text-xs font-medium text-black/55">
                  Last Name
                </span>
                <input
                  required
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={fieldClassName}
                  placeholder="Doe"
                />
              </label>
            </div>

            <label className="block text-left">
              <span className="mb-1.5 block text-xs font-medium text-black/55">
                Email
              </span>
              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={fieldClassName}
                placeholder="jane@company.com"
              />
            </label>

            <label className="block text-left">
              <span className="mb-1.5 block text-xs font-medium text-black/55">
                Phone
              </span>
              <input
                required
                type="tel"
                name="phone"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={fieldClassName}
                placeholder="+1 555 000 0000"
              />
            </label>

            <Button
              type="submit"
              variant="signup"
              size="lg"
              className="mt-2 w-full rounded-full"
            >
              Submit Request
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
