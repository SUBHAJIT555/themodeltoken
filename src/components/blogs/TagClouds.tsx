import Link from "next/link";

type Topic = {
  name: string;
  count: number;
  slug: string;
};

type Props = {
  topics: Topic[];
};

export function TagClouds({ topics }: Props) {
  return (
    <section className="th-blog-widget">
      <h3 className="th-blog-widget-title">Tag Clouds</h3>
      <div className="th-blog-tags">
        {topics.map((topic) => (
          <Link
            key={topic.slug}
            href={`/blogs?topic=${encodeURIComponent(topic.slug)}`}
            className="th-blog-tag"
          >
            {topic.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
