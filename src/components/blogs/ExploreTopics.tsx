import Link from "next/link";

type Topic = {
  name: string;
  count: number;
  slug: string;
};

type Props = {
  topics: Topic[];
};

export function ExploreTopics({ topics }: Props) {
  return (
    <section className="th-blog-widget">
      <h3 className="th-blog-widget-title">Explore Topics</h3>
      <div className="th-blog-topics">
        {topics.map((topic) => (
          <Link
            key={topic.slug}
            href={`/blogs?topic=${encodeURIComponent(topic.slug)}`}
            className="th-blog-topic"
          >
            <span className="th-blog-topic-name">{topic.name}</span>
            <span className="th-blog-topic-count">({topic.count})</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
