import Link from "next/link";
import TaskList from "@/components/TaskList";
import { getTasks } from "@/actions/tasks";

const TasksPage = async () => {
  const tasks = await getTasks();
  
  return (
    <>
      <h1>Tasks</h1>
      <Link href="/tasks/new">Add New Task</Link>
      <TaskList tasks={tasks} />
    </>
  );
};

export default TasksPage;
