import TaskForm from "@/components/TaskForm";
import { createTask } from "@/actions/tasks";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

const NewTaskPage = () => {
  return (
    <div>
      <Card>
        <CardHeader className="bg-blue-600 rounded-t-xl">
          <CardTitle className="text-white">Create New Task</CardTitle>
        </CardHeader>
        <CardDescription className="text-black pl-8 text-xl">
          Fill in the details to create a new task.
        </CardDescription>
        <CardContent className="mt-4">
          <TaskForm action={createTask} />
        </CardContent>
      </Card>
    </div>
  );
};

export default NewTaskPage;
