import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/data/blogs";
import { BlogAuthorAvatar } from "@/components/blogs/BlogAuthorAvatar";

type Props = {
  post: BlogPost;
};

export function BlogCard({ post }: Props) {
  return (
    <article className="th-blog-card">
      <div className="th-blog-card-media">
        <Link
          href={`/blogs?topic=${encodeURIComponent(post.category.toLowerCase())}`}
          className="th-blog-cat th-blog-cat-overlay"
        >
          {post.category}
        </Link>
        <Link href={`/blogs/${post.slug}`} className="th-blog-card-thumb" aria-label={post.title}>
          <Image
            src={post.coverImage}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1140px) 50vw, 360px"
            className="object-cover"
          />
        </Link>
      </div>
      <div className="th-blog-card-body">
        <ul className="th-blog-card-meta">
          <li>
            <BlogAuthorAvatar size={32} />
            <span>{post.author}</span>
          </li>
          <li>{post.displayDate}</li>
        </ul>
        <h3 className="th-blog-card-title">
          <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="th-blog-card-excerpt">{post.excerpt}</p>
        <div className="th-blog-card-foot">
          <span className="th-blog-card-share" aria-hidden>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="6" cy="12" r="2.2" fill="currentColor" />
              <circle cx="18" cy="6" r="2.2" fill="currentColor" />
              <circle cx="18" cy="18" r="2.2" fill="currentColor" />
              <path
                d="M8 11.2 16 7.2M8 12.8l8 4"
                stroke="currentColor"
                strokeWidth="1.6"
              />
            </svg>
          </span>
          <Link href={`/blogs/${post.slug}`} className="th-blog-card-more" aria-label="Read more">
            <span />
            <span />
            <span />
          </Link>
        </div>
      </div>
    </article>
  );
}
