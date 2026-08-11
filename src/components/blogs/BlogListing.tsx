"use client";

import { useSearchParams } from "next/navigation";
import { BlogCard } from "@/components/blogs/BlogCard";
import { BlogSidebar } from "@/components/blogs/BlogSidebar";
import { FeaturedBlogCard } from "@/components/blogs/FeaturedBlogCard";
import type { BlogPost } from "@/data/blogs";

type Props = {
  posts: BlogPost[];
  featured: BlogPost;
};

export function BlogListing({ posts, featured }: Props) {
  const searchParams = useSearchParams();
  const topicSlug = searchParams.get("topic")?.toLowerCase() ?? "";
  const gridPosts = topicSlug
    ? posts.filter((post) => post.category.toLowerCase() === topicSlug)
    : posts;

  return (
    <>
      {!topicSlug ? (
        <div className="th-blog-featured-row">
          <FeaturedBlogCard post={featured} />
        </div>
      ) : null}

      <div className="th-blog-layout">
        <main className="th-blog-main">
          {topicSlug ? (
            <h1 className="th-blog-topic-heading">
              {gridPosts[0]?.category ?? topicSlug}
            </h1>
          ) : null}
          <div className="th-blog-grid">
            {gridPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </main>
        <BlogSidebar recentPosts={posts} />
      </div>
    </>
  );
}
