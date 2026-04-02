import TaskForm from "@/components/TaskForm";
import { createTask } from "@/actions/tasks";

const NewTaskPage = () => {
  return (
    <div>
      <h1>New Task</h1>
      <TaskForm action={createTask} />
    </div>
  );
}

export default NewTaskPage;