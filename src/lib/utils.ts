export function absoluteUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
  return `${base.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}
