This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


```
db/mongodb.js
└── imported by → actions/tasks.js
└── reason → tasks.js needs the DB connection to run queries

actions/tasks.js
└── imported by → tasks/page.js, tasks/[id]/page.js, TaskForm.jsx, TaskCard.jsx
└── reason →
    - tasks/page.js uses getTasks
    - tasks/[id]/page.js uses getTaskById
    - TaskForm.jsx uses createTask and updateTask
    - TaskCard.jsx uses deleteTask

components/TaskForm.jsx
└── imported by → tasks/new/page.js, tasks/[id]/page.js
└── reason →
    - tasks/new/page.js renders empty form to create task
    - tasks/[id]/page.js renders pre-filled form to edit task

components/TaskCard.jsx
└── imported by → TaskList.jsx
└── reason → TaskList maps over tasks and renders a TaskCard for each

components/TaskList.jsx
└── imported by → tasks/page.js
└── reason → tasks/page.js passes all tasks to TaskList to display them

tasks/page.js
└── not imported by anyone
└── reason → it's a route, Next.js loads it automatically at /tasks

tasks/new/page.js
└── not imported by anyone
└── reason → it's a route, Next.js loads it automatically at /tasks/new

tasks/[id]/page.js
└── not imported by anyone
└── reason → it's a route, Next.js loads it automatically at /tasks/abc123
```

---

Visually the dependency chain is:

```
mongodb.js
    ↓
actions/tasks.js
    ↓              ↓            ↓            ↓
tasks/page.js  [id]/page.js  TaskForm.jsx  TaskCard.jsx
    ↓              ↓                            ↑
TaskList.jsx   TaskForm.jsx              TaskList.jsx
    ↓
TaskCard.jsx
```

---

One important thing — **pages are never imported by anyone**. Next.js automatically maps them to routes based on their folder location. Only components and utility files get imported.