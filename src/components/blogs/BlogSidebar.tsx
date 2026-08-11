import {
  BLOG_ABOUT,
  type BlogPost,
  getPopularPosts,
  getTopicCounts,
} from "@/data/blogs";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { ExploreTopics } from "@/components/blogs/ExploreTopics";
import { PopularPosts } from "@/components/blogs/PopularPosts";
import { RecentPosts } from "@/components/blogs/RecentPosts";
import { TagClouds } from "@/components/blogs/TagClouds";

type Props = {
  recentPosts: BlogPost[];
};

export function BlogSidebar({ recentPosts }: Props) {
  const topics = getTopicCounts();

  return (
    <aside className="th-blog-sidebar">
      <RecentPosts posts={recentPosts} />

      <section className="th-blog-widget th-blog-about">
        <div className="th-blog-about-logo flex justify-center">
          <BrandLogo href={null} iconSize={22} className="justify-center" />
        </div>
        <p>{BLOG_ABOUT}</p>
      </section>

      <PopularPosts posts={getPopularPosts()} />
      <ExploreTopics topics={topics} />
      <TagClouds topics={topics} />
    </aside>
  );
}
