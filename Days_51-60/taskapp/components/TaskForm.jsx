"use client"
import { createTask, updateTask } from "@/actions/tasks";

const TaskForm = ({ task }) => {
  return (
    <form action={task ? updateTask.bind(null, task._id) : createTask}>
      <label>Title</label>
      <input type="text" name="title" defaultValue={task?.title || ""} />

      <label>Description</label>
      <textarea name="description" defaultValue={task?.description || ""} />

      <label>Status</label>
      <select name="status" defaultValue={task?.status || "pending"}>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <button type="submit">Save Task</button>
    </form>
  );
};

export default TaskForm;
