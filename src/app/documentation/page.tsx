import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Documentation",
};

export default function DocumentationPage() {
  return (
    <PageShell
      eyebrow="Developers"
      title="Documentation"
      description="Developer documentation and API guides."
    />
  );
}
