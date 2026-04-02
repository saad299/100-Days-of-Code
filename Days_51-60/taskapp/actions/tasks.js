"use server";

import clientPromise from "../db/mongo";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// GET ALL TASKS
export async function getTasks() {
  const client = await clientPromise;
  const db = client.db("Task_App");
  const tasks = await db.collection("tasks").find().toArray();
  return JSON.parse(JSON.stringify(tasks));
}

// GET SINGLE TASK
export async function getTaskById(id) {
  const client = await clientPromise;
  const db = client.db("Task_App");
  const task = await db.collection("tasks").findOne({ _id: new ObjectId(id) });
  return JSON.parse(JSON.stringify(task));
}

// CREATE TASK
export async function createTask(formData) {
  const client = await clientPromise;
  const db = client.db("Task_App");
  await db.collection("tasks").insertOne({
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    createdAt: new Date(),
  });
  revalidatePath("/tasks");
  redirect("/tasks");
}

// UPDATE TASK
export async function updateTask(id, formData) {
  const client = await clientPromise;
  const db = client.db("Task_App");
  await db.collection("tasks").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        title: formData.get("title"),
        description: formData.get("description"),
        status: formData.get("status"),
        lastUpdated: new Date(),
      },
    }
  );
  revalidatePath("/tasks");
  redirect("/tasks");
}

// DELETE TASK
export async function deleteTask(id) {
  const client = await clientPromise;
  const db = client.db("Task_App");
  await db.collection("tasks").deleteOne({ _id: new ObjectId(id) });
  revalidatePath("/tasks");
}