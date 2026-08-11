import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BlogAuthorAvatar } from "@/components/blogs/BlogAuthorAvatar";
import { BlogContent } from "@/components/blogs/BlogContent";
import { BlogSidebar } from "@/components/blogs/BlogSidebar";
import { RelatedBlogs } from "@/components/blogs/RelatedBlogs";
import {
  blogs,
  getBlogBySlug,
  getRelatedPosts,
} from "@/data/blogs";
import "@/components/blogs/blogs.css";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return blogs.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: {
      absolute: `${post.title} | TheModelToken Blog`,
    },
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: [{ url: post.coverImage, alt: post.title }],
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = getRelatedPosts(post.slug, 2);
  const heroSrc = post.heroImage ?? post.coverImage;

  return (
    <div className="th-blog-article-page">
      <div className="th-blog-container">
        <Link href="/blogs" className="th-blog-back">
          <ArrowLeft className="size-4" aria-hidden />
          Back to Blogs
        </Link>

        <div className="th-blog-layout">
          <article className="th-blog-main">
            <header className="th-blog-article-header">
              <div className="th-blog-article-meta">
                <span className="th-blog-cat">{post.category}</span>
                <BlogAuthorAvatar size={28} />
                <span>{post.author}</span>
                <span>{post.displayDate}</span>
              </div>
              <h1>{post.title}</h1>
            </header>

            <div className="th-blog-hero">
              <Image
                src={heroSrc}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 992px) 100vw, 740px"
                className="object-cover"
              />
            </div>

            <BlogContent content={post.content} />
            <RelatedBlogs posts={related} />
          </article>

          <BlogSidebar recentPosts={blogs} />
        </div>
      </div>
    </div>
  );
}
