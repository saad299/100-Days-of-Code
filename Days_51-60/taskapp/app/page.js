import Link from "next/link";
import { Button } from "@/components/ui/button";

function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center gap-4 bg-linear-to-br from-blue-50 to-indigo-100 rounded-2xl p-12">
      <h1 className="text-4xl font-bold text-blue-700">Task Manager</h1>
      <p className="text-lg text-indigo-500">Manage your tasks efficiently</p>
      <Button asChild size="lg">
        <Link href="/tasks">View All Tasks</Link>
      </Button>
    </div>
      {/* <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <h1>Home</h1>
        <Link href="/tasks">Tasks</Link>
        <Link href="/tasks/new">New Task</Link>
        {/* <Link href="/tasks">Task Detail</Link> */}
      {/* </div> */}
    </>
  );
}

export default Home;
