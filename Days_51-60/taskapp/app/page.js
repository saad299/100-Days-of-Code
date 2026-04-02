import Link from "next/link";

function Home() {
  return (
    <>
      <div>
        <h1>Task Manager</h1>
        <p>Manage your tasks efficiently</p>
        <Link href="/tasks/new">New Task</Link>
        <br />
        <Link href="/tasks">View All Tasks</Link>
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
