import type { BlogPost } from "@/data/blogs";
import { BlogCard } from "@/components/blogs/BlogCard";

type Props = {
  posts: BlogPost[];
};

export function RelatedBlogs({ posts }: Props) {
  if (!posts.length) return null;

  return (
    <section className="mt-14 border-t border-[#ebebeb] pt-10">
      <h2 className="mb-6 text-center text-xl font-bold text-[var(--blog-text)]">
        Related Posts
      </h2>
      <div className="th-blog-grid">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
