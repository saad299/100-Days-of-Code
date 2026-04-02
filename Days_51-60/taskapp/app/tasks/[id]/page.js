import TaskForm from "@/components/TaskForm";
import { getTaskById } from "@/actions/tasks";

const TaskDetailsPage = async ({ params }) => {
  const { id } = await params;

  const task = await getTaskById(id);
  return (
    <>
      <h1>Task Details</h1>
      <TaskForm task={task} />
    </>
  );
};

export default TaskDetailsPage;
