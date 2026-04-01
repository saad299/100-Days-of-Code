"use server";

import clientPromise from "@/db/mongodb";

export async function submitAction(_, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  if (!name || !email || !message) {
    return { success: false, error: "Please input all fields" };
  }

  try {
    const client = await clientPromise;
    const db = client.db("Contact_Form");
    await db.collection("contacts").insertOne({
      name,
      email,
      message,
      createdAt: new Date(),
    });
    console.log({ name, email, message });
    return { success: true, error: null };
  } catch (error) {
    console.error("Database error:", error);
    return { success: false, error: "Failed to save contact" };
  }
}
