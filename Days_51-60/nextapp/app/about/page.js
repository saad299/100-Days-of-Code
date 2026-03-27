// import Image from "next/image";
import Link from "next/link";

const skills = [
  "Next.js", "React", "TypeScript", "Tailwind CSS",
  "Node.js", "PostgreSQL", "Git", "Figma",
];

const timeline = [
  {
    year: "2026",
    title: "Started this Blog",
    description: "Decided to document my learnings and share what I build.",
  },
  {
    year: "2025",
    title: "Learned Next.js",
    description: "Dove deep into the App Router, server components, and full-stack React.",
  },
  {
    year: "2024",
    title: "First Freelance Project",
    description: "Built and shipped a landing page for a local business.",
  },
  {
    year: "2023",
    title: "Started Learning Web Dev",
    description: "Picked up HTML, CSS, and JavaScript — and never looked back.",
  },
];

function AboutPage() {
  return (
    <main className="bg-[#0d0d0d] min-h-screen font-serif text-[#e8e8e8]">

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-8 pt-24 pb-16 flex flex-col md:flex-row items-center gap-14">
        {/* Avatar */}
        <div className="relative shrink-0 w-48 h-48 md:w-56 md:h-56">
          <div className="w-full h-full rounded-full border-2 border-[#c8a96e] overflow-hidden bg-[#1a1a1a]">
            {/* <Image
              src="https://placehold.co/224x224/1a1a1a/c8a96e?text=:)"
              alt="Author photo"
              width={224}
              height={224}
              className="object-cover w-full h-full"
            /> */}
          </div>
          <div className="absolute -bottom-2 -right-2 w-full h-full rounded-full border border-[#2a2a2a] -z-10" />
        </div>

        {/* Bio */}
        <div className="flex-1">
          <span className="text-xs uppercase tracking-[2px] text-[#c8a96e] font-bold mb-3 block">
            About Me
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5 leading-tight">
            Hey, I&apos;m <span className="text-[#c8a96e]">Your Name.</span>
          </h1>
          <p className="text-[#6a6a6a] text-base leading-relaxed mb-4">
            I&apos;m a self-taught web developer passionate about building clean, performant web experiences. I write about what I learn — Next.js, React, design systems, and the occasional life lesson.
          </p>
          <p className="text-[#6a6a6a] text-base leading-relaxed">
            When I&apos;m not coding, I&apos;m probably reading, sketching UI ideas, or overthinking too much about the perfect color palette.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-8">
        <div className="border-t border-[#1f1f1f]" />
      </div>

      {/* Skills */}
      <section className="max-w-5xl mx-auto px-8 py-16">
        <h2 className="text-2xl font-bold tracking-tight mb-8">
          Things I work with
        </h2>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="bg-[#111] border border-[#2a2a2a] text-[#9a9a9a] text-sm px-4 py-2 rounded-sm uppercase tracking-wide hover:border-[#c8a96e] hover:text-[#c8a96e] transition-colors duration-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-8">
        <div className="border-t border-[#1f1f1f]" />
      </div>

      {/* Timeline */}
      <section className="max-w-5xl mx-auto px-8 py-16">
        <h2 className="text-2xl font-bold tracking-tight mb-10">My Journey</h2>
        <div className="flex flex-col gap-0">
          {timeline.map((item, index) => (
            <div key={index} className="flex gap-8 group">
              {/* Year + line */}
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-[#c8a96e] mt-1 shrink-0" />
                {index < timeline.length - 1 && (
                  <div className="w-px flex-1 bg-[#2a2a2a] my-1" />
                )}
              </div>

              {/* Content */}
              <div className="pb-10">
                <span className="text-xs uppercase tracking-[1.5px] text-[#c8a96e] font-bold mb-1 block">
                  {item.year}
                </span>
                <h3 className="text-lg font-bold text-[#e8e8e8] mb-1">{item.title}</h3>
                <p className="text-[#5a5a5a] text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-8">
        <div className="border-t border-[#1f1f1f]" />
      </div>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-8 py-16 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">Want to work together?</h2>
          <p className="text-[#6a6a6a] text-sm">I&apos;m always open to new opportunities and conversations.</p>
        </div>
        <div className="flex gap-4">
          <Link
            href="/contact"
            className="bg-[#c8a96e] text-[#0d0d0d] px-6 py-3 text-sm font-bold uppercase tracking-wide hover:bg-[#e0bf82] transition-colors duration-200 rounded-sm whitespace-nowrap"
          >
            Get in Touch
          </Link>
          <Link
            href="/blog"
            className="border border-[#2a2a2a] text-[#9a9a9a] px-6 py-3 text-sm uppercase tracking-wide hover:border-[#c8a96e] hover:text-[#c8a96e] transition-colors duration-200 rounded-sm whitespace-nowrap"
          >
            Read Blog
          </Link>
        </div>
      </section>

    </main>
  );
}

export default AboutPage;