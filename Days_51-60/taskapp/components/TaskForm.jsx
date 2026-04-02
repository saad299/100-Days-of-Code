"use client";
import { createTask, updateTask } from "@/actions/tasks";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const TaskForm = ({ task }) => {
  return (
    <form
      action={task ? updateTask.bind(null, task._id) : createTask}
      className="flex flex-col gap-5"
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="title" className="text-blue-700 font-semibold">
          Title
        </Label>
        <Input
          id="title"
          type="text"
          name="title"
          placeholder="Enter task title"
          defaultValue={task?.title || ""}
          className="border-blue-200 focus-visible:ring-blue-400"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="description" className="text-blue-700 font-semibold">
          Description
        </Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Enter task description"
          defaultValue={task?.description || ""}
          className="border-blue-200 focus-visible:ring-blue-400"
        />
      </div>

      <Label htmlFor="status" className="text-blue-700 font-semibold">Status</Label>
      <Select name="status" defaultValue={task?.status || "pending"}>
        <SelectTrigger className="border-blue-200 focus:ring-blue-400">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pending" className="text-gray-600">Pending</SelectItem>
          <SelectItem value="in-progress" className="text-yellow-600">In Progress</SelectItem>
          <SelectItem value="completed" className="text-green-600">Completed</SelectItem>
        </SelectContent>
      </Select>
      
      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
        {task ? "Update Task" : "Create Task"}
      </Button>
    </form>
  );
};

export default TaskForm;
