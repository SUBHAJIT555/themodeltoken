import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogListing } from "@/components/blogs/BlogListing";
import { blogs, getFeaturedPost } from "@/data/blogs";
import "@/components/blogs/blogs.css";

export const metadata: Metadata = {
  title: {
    absolute: "TheModelToken Blog | AI API Tutorials & LLM Insights",
  },
  description:
    "Deep dives into the latest LLMs, hands-on integration tutorials, and industry insights from TheModelToken.",
};

export default function BlogsPage() {
  const featured = getFeaturedPost();

  return (
    <div className="th-blog-page">
      <div className="th-blog-container">
        <Suspense
          fallback={
            <div className="th-blog-featured-row">
              <div className="th-blog-featured" />
            </div>
          }
        >
          <BlogListing posts={blogs} featured={featured} />
        </Suspense>
      </div>
    </div>
  );
}
