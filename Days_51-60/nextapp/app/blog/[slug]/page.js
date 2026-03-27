import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/data/posts";
// import { notFound } from "next/navigation";
import NotFound from "@/app/blog/[slug]/not-found";

// Tells Next.js all possible slugs at build time
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

async function BlogPostPage({ params }) {
  const post = getPostBySlug((await params).slug);

  // If no post matches the slug, show Next.js 404 page
  // if (!post) notFound();
  if (!post) {
    return <NotFound />;
  }


  return (
    <main className="bg-[#0d0d0d] min-h-screen font-serif text-[#e8e8e8]">

      {/* Back link */}
      <div className="max-w-3xl mx-auto px-8 pt-12">
        <Link
          href="/blog"
          className="text-xs uppercase tracking-[1.5px] text-[#6a6a6a] hover:text-[#c8a96e] transition-colors duration-200 no-underline"
        >
          ← Back to Blog
        </Link>
      </div>

      {/* Post Header */}
      <section className="max-w-3xl mx-auto px-8 pt-10 pb-12">
        <span className="text-xs uppercase tracking-[2px] text-[#c8a96e] font-bold mb-4 block">
          {post.tag}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
          {post.title}
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-[#3a3a3a]">{post.date}</span>
          <span className="text-[#2a2a2a]">—</span>
          <span className="text-sm text-[#5a5a5a]">{post.excerpt}</span>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-8">
        <div className="border-t border-[#1f1f1f]" />
      </div>

      {/* Post Content */}
      <section className="max-w-3xl mx-auto px-8 py-14">
        <div className="text-[#9a9a9a] text-base leading-8 whitespace-pre-line">
          {post.content}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-8">
        <div className="border-t border-[#1f1f1f]" />
      </div>

      {/* Footer nav */}
      <div className="max-w-3xl mx-auto px-8 py-10 flex justify-between items-center">
        <Link
          href="/blog"
          className="text-sm text-[#6a6a6a] hover:text-[#c8a96e] transition-colors duration-200 no-underline uppercase tracking-wide"
        >
          ← All Posts
        </Link>
        <Link
          href="/contact"
          className="text-sm text-[#6a6a6e] hover:text-[#c8a96e] transition-colors duration-200 no-underline uppercase tracking-wide"
        >
          Contact Me →
        </Link>
      </div>

    </main>
  );
}

export default BlogPostPage;


// // "use client";

// const BlogPost = async ({ params }) => {
//   const { slug } = await params;
//   let stringed = slug === String
//   return (
//     <>
//       <h1>This is some Blog Post page of {stringed ? slug.toUpperCase() : slug}</h1>
//     </>
//   );
// };


// export default BlogPost