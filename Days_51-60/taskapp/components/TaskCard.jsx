"use client";
import { deleteTask } from "@/actions/tasks";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const formatDate = (date) => {
  const d = new Date(date);
  const hours = d.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;
  return `${d.getDate().toString().padStart(2, "0")}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d.getFullYear()} ${hours12.toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}:${d.getSeconds().toString().padStart(2, "0")} ${ampm}`;
};

const statusBorder = (status) => {
  if (status === "completed") return "border-l-4 border-l-green-500";
  if (status === "in-progress") return "border-l-4 border-l-yellow-500";
  return "border-l-4 border-l-gray-400";
};

const statusBadgeStyles = (status) => {
  if (status === "completed") return "bg-green-100 text-green-700 hover:bg-green-100";
  if (status === "in-progress") return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";
  return "bg-gray-100 text-gray-600 hover:bg-gray-100";
};

const TaskCard = ({ task }) => {
  return (
    <Card className={`flex flex-col justify-between ${statusBorder(task.status)}`}>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg text-blue-700">{task.title}</CardTitle>
          <Badge className={statusBadgeStyles(task.status)}>{task.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p className="text-gray-600 text-sm">{task.description}</p>
        <p className="text-xs text-muted-foreground">🕒 Created: {formatDate(task.createdAt)}</p>
        {task.lastUpdated && (
          <p className="text-xs text-muted-foreground">✏️ Updated: {formatDate(task.lastUpdated)}</p>
        )}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button asChild variant="outline" size="sm" className="flex-1 border-blue-300 text-blue-600 hover:bg-blue-50">
          <Link href={`/tasks/${task._id}`}>Edit</Link>
        </Button>
        <form action={deleteTask.bind(null, task._id)} className="flex-1">
          <Button type="submit" variant="destructive" size="sm" className="w-full">
            Delete
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;