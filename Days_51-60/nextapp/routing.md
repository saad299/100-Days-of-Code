# Routing in Next.js (App Router)

**Routing** is simply the system that decides: *"when a user visits this URL, show them this page."*

**Next.js App Router** makes routing file-system based — meaning you don't write any routing config or rules. You just create folders and files, and Next.js figures out the routes automatically.

The entire system boils down to 4 rules:

1. **Folder = URL segment.** `app/blog/about/` → `/blog/about`. Every folder you nest adds a segment to the URL.

2. **`page.jsx` makes a folder a real route.** A folder without `page.jsx` is invisible to the browser — it's just for organising code.

3. **`[brackets]` make a segment dynamic.** Instead of one folder per page, you write one folder that matches any value — and your code decides what to render based on that value.

4. **`(parentheses)` opt a folder out of the URL.** Purely for organisation — lets you share layouts across pages without polluting the URL.

Everything else (`layout.jsx`, `loading.jsx`, `error.jsx`) is just Next.js giving you **special hooks** at each route level — so you can wrap pages in a shared shell, show a spinner while loading, or catch errors — all scoped to exactly the routes you want.

**One line summary:** App Router turns your folder structure into your URL structure, with a few naming conventions to handle dynamic pages, shared layouts, and organisation — no config needed.

## File-based Routing
Here's what each concept means:

- Folders = URL segments. `app/blog/page.jsx` is automatically the `/blog` page. No config needed.
- `page.jsx` is the magic file. Without it, a folder is not a route — it just organises code. Only folders with a `page.jsx` become publicly accessible URLs.
- `layout.jsx` wraps every child route inside it. Put your navbar and sidebar here — it renders once and doesn't re-mount when you navigate between child pages.
- `[id]` dynamic segments capture a value from the URL. `app/blog/[id]/page.jsx` matches `/blog/1`, `/blog/42`, `/blog/anything`. You access the value via `params.id` in your component.
- `(groupName)` route groups let you organise folders without affecting the URL. `(marketing)/about/page.jsx` maps to `/about`, not `/marketing/about`. Useful for sharing a specific layout among a set of pages.
- Special files like `loading.jsx`, `error.jsx`, and `not-found.jsx` are automatically picked up by Next.js for their specific purposes — you just drop them in the right folder.
That's the whole mental model: folder = segment, page.jsx = route, layout.jsx = shell, [] = dynamic, () = group.

## Special files
`loading.jsx`, `error.jsx`, `not-found.jsx`, `route.js`

### Where to put these files?
Simple rule — put them in the folder whose route you want them to affect.
They're scoped to where you place them. A loading.jsx inside blog/ only activates for blog routes — not for /about or /.
route.ts is the same — place it in whatever folder matches the API URL you want:
`app/api/users/route.ts   →   /api/users  (GET, POST, etc.)`


```
app/
├── not-found.jsx        ← global 404 (any unmatched URL)
├── loading.jsx          ← loading UI for /
├── error.jsx            ← error boundary for /
│
├── blog/
│   ├── loading.jsx      ← loading UI only for /blog and its children
│   ├── error.jsx        ← errors only for /blog and its children
│   └── [id]/
│       └── not-found.jsx ← 404 only when a blog post isn't found
```

---

### Multiple `layout.jsx` files?

Yes

```
app/
├── layout.jsx           ← root layout, wraps EVERYTHING
│
├── blog/
│   └── layout.jsx       ← wraps only blog pages
│
├── dashboard/
│   └── layout.jsx       ← wraps only dashboard pages
```

They **nest inside each other** like Russian dolls:

```
Root layout
  └── Blog layout
        └── page.jsx
```

So a blog page gets both layouts applied — root first, then blog. This is exactly why route groups like `(marketing)` are useful — they let you add a layout to a specific set of pages without affecting others.

---

### Multiple `page.jsx` files?

Yes, and this is the whole point. **Every route needs its own `page.jsx`.**

```
app/
├── page.jsx             → /
├── about/
│   └── page.jsx         → /about
├── blog/
│   ├── page.jsx         → /blog
│   └── [id]/
│       └── page.jsx     → /blog/42
└── dashboard/
    ├── page.jsx         → /dashboard
    └── settings/
        └── page.jsx     → /dashboard/settings
```

Each `page.jsx` is a completely **independent component** responsible for rendering that specific URL. They share nothing with each other unless a `layout.jsx` is wrapping them.

---

**The root `layout.jsx` vs React's `main.jsx`**

Your analogy is spot on — but there's one key difference:

| | React `main.jsx` | Next.js root `layout.jsx` |
|---|---|---|
| Renders once? | Yes | Yes |
| Wraps everything? | Yes | Yes |
| Can be nested? | No | Yes — layouts nest |
| Required? | Yes | Yes |

In Next.js the root `layout.jsx` is where you put your `<html>` and `<body>` tags, global fonts, and providers (like auth or theme) — just like `main.jsx` in React. But unlike React, you can have **additional layouts deeper in the tree** for specific sections of your app.

---


Structure for blog site:

```
app/
├── layout.tsx                 ← Navbar with links to Home, Blog
├── page.tsx                   → /  (Home - just a welcome message)
│
├── blog/
│   ├── layout.tsx             ← Blog-specific layout (e.g. blog header)
│   ├── page.tsx               → /blog  (list of all posts)
│   └── [slug]/
│       ├── page.tsx           → /blog/my-first-post
│       └── not-found.tsx      ← when a post doesn't exist
│
├── about/
│   └── page.tsx               → /about  (who writes this blog)
│
├── components/
│   ├── Header.tsx
│   └── Footer.tsx
```

---

**Hardcode your posts data** in a separate file:

```js
// lib/posts.js
export const posts = [
  { slug: "my-first-post", title: "My First Post", body: "Hello world..." },
  { slug: "nextjs-is-cool", title: "Next.js is Cool", body: "Here is why..." },
  { slug: "learning-routing", title: "Learning Routing", body: "Folders = URLs..." },
]
```

---

**What you'll naturally practice:**

- Root `layout.tsx` — Navbar across all pages
- Nested `blog/layout.tsx` — extra wrapper only for blog routes
- `/blog/page.tsx` — loop through posts, render a list of `<Link>` to each
- `/blog/[slug]/page.tsx` — receive `params.slug`, find the matching post, render it
- `not-found.tsx` — if someone visits `/blog/abc123` that doesn't exist, show a nice message

---

The flow a user takes through your app will be:

`/ → /blog → /blog/nextjs-is-cool`

That single user journey touches **every routing concept** you just learned. Once you build this, routing will feel completely natural.