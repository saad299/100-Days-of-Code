// import Image from "next/image";
import Link from "next/link";

const featuredPosts = [
  {
    slug: "getting-started-with-nextjs",
    title: "Getting Started with Next.js",
    excerpt: "A beginner-friendly walkthrough of setting up your first Next.js project from scratch.",
    date: "March 20, 2026",
    tag: "Next.js",
  },
  {
    slug: "server-vs-client-components",
    title: "Server vs Client Components Explained",
    excerpt: "Understanding when to use each type and why it matters for performance.",
    date: "March 14, 2026",
    tag: "React",
  },
  {
    slug: "mastering-tailwind-css",
    title: "Mastering Tailwind CSS",
    excerpt: "Tips and tricks to write clean, maintainable utility-first CSS at scale.",
    date: "March 8, 2026",
    tag: "CSS",
  },
];

function HomePage() {
  return (
    <main className="bg-[#0d0d0d] min-h-screen font-serif text-[#e8e8e8]">

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-8 pt-24 pb-20 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <span className="text-xs uppercase tracking-[2px] text-[#c8a96e] font-bold mb-4 block">
            Welcome to myblog
          </span>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight text-[#e8e8e8] mb-6">
            Ideas worth <br />
            <span className="text-[#c8a96e]">writing about.</span>
          </h1>
          <p className="text-[#6a6a6a] text-lg leading-relaxed max-w-md mb-8">
            A personal corner of the internet — covering web development, design thinking, and the occasional deep dive.
          </p>
          <div className="flex gap-4">
            <Link
              href="/blog"
              className="bg-[#c8a96e] text-[#0d0d0d] px-6 py-3 text-sm font-bold uppercase tracking-wide hover:bg-[#e0bf82] transition-colors duration-200 rounded-sm"
            >
              Read the Blog
            </Link>
            <Link
              href="/about"
              className="border border-[#2a2a2a] text-[#9a9a9a] px-6 py-3 text-sm uppercase tracking-wide hover:border-[#c8a96e] hover:text-[#c8a96e] transition-colors duration-200 rounded-sm"
            >
              About Me
            </Link>
          </div>
        </div>

        {/* Avatar */}
        <div className="relative w-56 h-56 md:w-64 md:h-64 shrink-0">
          <div className="w-full h-full rounded-full border-2 border-[#c8a96e] overflow-hidden bg-[#1a1a1a]">
            {/* <Image
              src="https://placehold.co/256x256/1a1a1a/c8a96e?text=:)"
              alt="Author avatar"
              width={256}
              height={256}
              className="object-cover w-full h-full"
            /> */}
          </div>
          <div className="absolute -bottom-2 -right-2 w-full h-full rounded-full border border-[#2a2a2a] -z-10" />
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-8">
        <div className="border-t border-[#1f1f1f]" />
      </div>

      {/* Featured Posts */}
      <section className="max-w-5xl mx-auto px-8 py-20">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-2xl font-bold tracking-tight">Recent Posts</h2>
          <Link
            href="/blog"
            className="text-[#c8a96e] text-sm uppercase tracking-wide hover:underline"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <article
              key={post.slug}
              className="group bg-[#111] border border-[#1f1f1f] rounded-sm p-6 hover:border-[#c8a96e] transition-colors duration-300"
            >
              <span className="text-xs uppercase tracking-[1.5px] text-[#c8a96e] font-bold mb-3 block">
                {post.tag}
              </span>
              <h3 className="text-lg font-bold text-[#e8e8e8] leading-snug mb-3 group-hover:text-[#c8a96e] transition-colors duration-200">
                <Link href={`/blog/${post.slug}`} className="no-underline">
                  {post.title}
                </Link>
              </h3>
              <p className="text-[#5a5a5a] text-sm leading-relaxed mb-6">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#3a3a3a]">{post.date}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs text-[#c8a96e] uppercase tracking-wide hover:underline"
                >
                  Read →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-5xl mx-auto px-8 pb-24">
        <div className="bg-[#111] border border-[#c8a96e]/30 rounded-sm px-10 py-12 text-center">
          <h2 className="text-3xl font-bold mb-3 tracking-tight">
            Want to get in touch?
          </h2>
          <p className="text-[#6a6a6a] mb-8 text-base">
            Whether it&apos;s feedback, a collab, or just to say hello.
          </p>
          <Link
            href="/contact"
            className="bg-[#c8a96e] text-[#0d0d0d] px-8 py-3 text-sm font-bold uppercase tracking-wide hover:bg-[#e0bf82] transition-colors duration-200 rounded-sm"
          >
            Contact Me
          </Link>
        </div>
      </section>

    </main>
  );
}

export default HomePage