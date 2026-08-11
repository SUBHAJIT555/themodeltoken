import Link from "next/link";
import type { BlogPost } from "@/data/blogs";

type Props = {
  post: BlogPost;
};

export function FeaturedBlogCard({ post }: Props) {
  return (
    <article className="th-blog-featured">
      <Link
        href={`/blogs/${post.slug}`}
        className="th-blog-featured-media"
        style={{
          backgroundImage: `url(${post.featuredImage ?? post.coverImage})`,
        }}
        aria-label={post.title}
      />
      <div className="th-blog-featured-body">
        <Link
          href={`/blogs?topic=${encodeURIComponent(post.category.toLowerCase())}`}
          className="th-blog-cat"
        >
          {post.category}
        </Link>
        <h2 className="th-blog-featured-title">
          <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
        </h2>
        <ul className="th-blog-featured-meta">
          <li>{post.author}</li>
          <li>{post.displayDate}</li>
        </ul>
      </div>
    </article>
  );
}
