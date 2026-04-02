import TaskForm from "@/components/TaskForm";
import { getTaskById } from "@/actions/tasks";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const TaskDetailsPage = async ({ params }) => {
  const { id } = await params;

  const task = await getTaskById(id);
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Task Details</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskForm task={task} />
        </CardContent>
      </Card>
    </>
  );
};

export default TaskDetailsPage;
