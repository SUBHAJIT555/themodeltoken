type PagePlaceholderProps = {
  title: string;
  description: string;
};

export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <div className="space-y-3">
      <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl">
        {title}
      </h1>
      <p className="max-w-2xl text-base text-[var(--muted)] md:text-lg">
        {description}
      </p>
    </div>
  );
}
