import Link from "next/link";
import TaskList from "@/components/TaskList";
import { getTasks } from "@/actions/tasks";
import { Button } from "@/components/ui/button";

const TasksPage = async () => {
  const tasks = await getTasks();

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between bg-blue-50 p-4 rounded-xl">
          <div>
            <h1 className="text-3xl font-bold text-blue-700">All Tasks</h1>
            <p className="text-muted-foreground mt-1">
              {tasks.length} tasks total
            </p>
          </div>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/tasks/new">+ Add New Task</Link>
          </Button>
        </div>
        <TaskList tasks={tasks} />
      </div>
    </>
  );
};

export default TasksPage;
