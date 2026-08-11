import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/data/blogs";

type Props = {
  posts: BlogPost[];
};

export function PopularPosts({ posts }: Props) {
  return (
    <section className="th-blog-widget">
      <h3 className="th-blog-widget-title">Popular Posts</h3>
      <ul className="th-blog-popular-list">
        {posts.map((post, index) => (
          <li key={post.slug} className="th-blog-popular-item">
            <Link
              href={`/blogs/${post.slug}`}
              className="th-blog-popular-thumb"
              aria-label={post.title}
            >
              <Image
                src={post.coverImage}
                alt=""
                fill
                sizes="60px"
                className="object-cover"
              />
              <span className="th-blog-popular-rank">{index + 1}</span>
            </Link>
            <div className="min-w-0">
              <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
              <div className="th-blog-popular-date">{post.displayDate}</div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
