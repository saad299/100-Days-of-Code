// export type Post = {
//   slug: string;
//   title: string;
//   excerpt: string;
//   date: string;
//   tag: string;
//   content: string;
// };

export const posts = [
  {
    slug: "getting-started-with-nextjs",
    title: "Getting Started with Next.js",
    excerpt: "A beginner-friendly walkthrough of setting up your first Next.js project from scratch.",
    date: "March 20, 2026",
    tag: "Next.js",
    content: `
Next.js is a React framework that gives you everything you need to build fast, production-ready web apps. 
Unlike plain React, it handles routing, server-side rendering, and much more out of the box.

## Installation

To create a new Next.js project, run the following command:

\`\`\`bash
npx create-next-app@latest my-blog
\`\`\`

You'll be asked a few setup questions — choose the App Router, TypeScript, and Tailwind CSS options.

## Project Structure

Once set up, your project will have an \`app/\` folder. Every \`page.tsx\` file inside it becomes a route automatically.

## What's Next?

From here, start building your pages, add components, and explore the power of Server Components!
    `,
  },
  {
    slug: "server-vs-client-components",
    title: "Server vs Client Components Explained",
    excerpt: "Understanding when to use each type and why it matters for performance.",
    date: "March 14, 2026",
    tag: "React",
    content: `
One of the biggest shifts in modern Next.js is understanding the difference between Server and Client Components.

## Server Components

By default, every component in the App Router is a Server Component. They run on the server, which means:
- They can fetch data directly
- They don't ship JavaScript to the browser
- They can't use hooks like useState or useEffect

## Client Components

Add \`"use client"\` at the top of a file to make it a Client Component. Use these when you need:
- Interactivity (onClick, forms)
- React hooks (useState, useEffect)
- Browser APIs

## The Golden Rule

Keep as many components as possible on the server. Only push to the client when you truly need interactivity. This keeps your app fast and lean.
    `,
  },
  {
    slug: "mastering-tailwind-css",
    title: "Mastering Tailwind CSS",
    excerpt: "Tips and tricks to write clean, maintainable utility-first CSS at scale.",
    date: "March 8, 2026",
    tag: "CSS",
    content: `
Tailwind CSS is a utility-first CSS framework that lets you style elements directly in your HTML/JSX using small, single-purpose classes.

## Why Tailwind?

Instead of writing custom CSS files, you compose styles inline:

\`\`\`jsx
<button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
  Click Me
</button>
\`\`\`

## Tips for Clean Code

- Group related classes together (layout → spacing → color → typography)
- Extract repeated patterns into reusable components
- Use arbitrary values like \`bg-[#c8a96e]\` for custom colors

## Responsive Design

Tailwind makes responsive design easy with prefixes:

\`\`\`jsx
<div className="text-sm md:text-base lg:text-lg">Hello</div>
\`\`\`

This sets different font sizes at different screen widths — no media queries needed!
    `,
  },
];

// Helper: get all posts
export function getAllPosts() {
  return posts;
}

// Helper: get a single post by slug
export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug);
}