import Link from "next/link";

function NotFound() {
  return (
    <main className="bg-[#0d0d0d] min-h-screen font-serif text-[#e8e8e8] flex items-center justify-center px-8">
      <div className="text-center max-w-md">

        <p className="text-8xl font-bold text-[#1f1f1f] mb-2 tracking-tight">404</p>

        <h1 className="text-3xl font-bold tracking-tight mb-4">
          Page <span className="text-[#c8a96e]">Not Found.</span>
        </h1>

        <p className="text-[#5a5a5a] text-base leading-relaxed mb-10">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="bg-[#c8a96e] text-[#0d0d0d] px-6 py-3 text-sm font-bold uppercase tracking-wide hover:bg-[#e0bf82] transition-colors duration-200 rounded-sm"
          >
            Go Home
          </Link>
          <Link
            href="/blog"
            className="border border-[#2a2a2a] text-[#9a9a9a] px-6 py-3 text-sm uppercase tracking-wide hover:border-[#c8a96e] hover:text-[#c8a96e] transition-colors duration-200 rounded-sm"
          >
            Read Blog
          </Link>
        </div>

      </div>
    </main>
  );
}

export default NotFound;