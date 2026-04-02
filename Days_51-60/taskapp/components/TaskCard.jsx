"use client";
import { deleteTask } from "@/actions/tasks";
import Link from "next/link";

const formatDate = (date) => {
  const d = new Date(date);
  const hours = d.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;

  return `${d.getDate().toString().padStart(2, "0")}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d.getFullYear()} ${hours12.toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}:${d.getSeconds().toString().padStart(2, "0")} ${ampm}`;
};

const TaskCard = ({ task }) => {
  // const createdAt = new Date(task.createdAt);
  // const updatedAt = new Date(task.updatedAt);

  // const formattedCreatedAt = `${createdAt.getDate()}-${createdAt.getMonth() + 1}-${createdAt.getFullYear()}
  //                   Time: ${createdAt.getHours()}-${createdAt.getMinutes()}-${createdAt.getSeconds()}`;

  // const formattedUpdatedAt = `${updatedAt.getDate()}-${updatedAt.getMonth() + 1}-${updatedAt.getFullYear()}
  //                   Time: ${updatedAt.getHours()}-${updatedAt.getMinutes()}-${updatedAt.getSeconds()}`;
  // const createdAt = new Date(task.createdAt);
  // const formattedCreated = `${createdAt.getDate().toString().padStart(2, '0')}-${(createdAt.getMonth() + 1).toString().padStart(2, '0')}-${createdAt.getFullYear()} Time: ${createdAt.getHours().toString().padStart(2, '0')}-${createdAt.getMinutes().toString().padStart(2, '0')}-${createdAt.getSeconds().toString().padStart(2, '0')}`;

  //
  
  return (
    <>
      <div>
        <h3>Title: {task.title}</h3>
        <p>Description: {task.description}</p>
        <p>Status: {task.status}</p>
        <p>Created: {formatDate(task.createdAt)}</p>
        {task.lastUpdated && <p>Updated: {formatDate(task.lastUpdated)}</p>}
        <Link href={`/tasks/${task._id}`}>Edit</Link>
        <form action={deleteTask.bind(null, task._id)}>
          <button type="submit">Delete</button>
        </form>
      </div>
    </>
  );
};

export default TaskCard;
