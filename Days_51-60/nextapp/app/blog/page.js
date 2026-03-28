import Link from "next/link";
import { getAllPosts } from "@/data/posts";
import Fetching from "@/components/Fetching";

function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="bg-[#0d0d0d] min-h-screen font-serif text-[#e8e8e8]">
      {/* Header */}
      <section className="max-w-5xl mx-auto px-8 pt-24 pb-12">
        <span className="text-xs uppercase tracking-[2px] text-[#c8a96e] font-bold mb-3 block">
          The Blog
        </span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          All <span className="text-[#c8a96e]">Articles.</span>
        </h1>
        <p className="text-[#6a6a6a] text-base leading-relaxed max-w-lg">
          {posts.length} posts on web development, design, and everything in
          between.
        </p>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-8">
        <div className="border-t border-[#1f1f1f]" />
      </div>

      {/* Posts List */}
      <section className="max-w-5xl mx-auto px-8 py-16 flex flex-col gap-0">
        {posts.map((post, index) => (
          <article key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex flex-col md:flex-row md:items-center justify-between gap-4 py-8 no-underline"
            >
              <div className="flex-1">
                <span className="text-xs uppercase tracking-[1.5px] text-[#c8a96e] font-bold mb-2 block">
                  {post.tag}
                </span>
                <h2 className="text-xl font-bold text-[#e8e8e8] mb-2 group-hover:text-[#c8a96e] transition-colors duration-200">
                  {post.title}
                </h2>
                <p className="text-[#5a5a5a] text-sm leading-relaxed max-w-xl">
                  {post.excerpt}
                </p>
              </div>
              <div className="flex md:flex-col items-center md:items-end gap-4 md:gap-2 shrink-0">
                <span className="text-xs text-[#3a3a3a]">{post.date}</span>
                <span className="text-xs text-[#c8a96e] uppercase tracking-wide group-hover:underline">
                  Read →
                </span>
              </div>
            </Link>
            {index < posts.length - 1 && (
              <div className="border-t border-[#1f1f1f]" />
            )}
          </article>
        ))}
      </section>
      {/* Spacer between posts and fetching component */}
      <div className="py-8">
        <Fetching />
      </div>
    </main>
  );
}

export default BlogPage;
