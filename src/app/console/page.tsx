import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Console",
};

export default function ConsolePage() {
  return (
    <PageShell
      eyebrow="Platform"
      title="Console"
      description="Manage and test your AI workloads."
    />
  );
}
