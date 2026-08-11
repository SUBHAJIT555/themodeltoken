import Link from "next/link";
import type { BlogPost } from "@/data/blogs";

type Props = {
  posts: BlogPost[];
};

export function RecentPosts({ posts }: Props) {
  return (
    <section className="th-blog-widget">
      <h3 className="th-blog-widget-title">Recent Posts</h3>
      <ul className="th-blog-recent-list">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blogs/${post.slug}`}>
              <span className="th-blog-chevron" aria-hidden>
                ›
              </span>
              <span>{post.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
