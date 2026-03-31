"use server";

export async function submitAction(_, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");
  // const reset = formData.get("reset");

  if (!name || !email || !message) {
    return { success: false, error: "Please input all fields" };
  }

  // if (formData.get("reset") === "true") {
  //   return { success: true, error: null }; // clean reset
  // }
  // if (formData.get("reset")) return { success: false, error: null };

  console.log({ name, email, message });

  // const client = await clientPromise;
  // const db = client.db("myblog");
  // await db.collection("contacts").insertOne({
  //   name,
  //   email,
  //   message,
  //   createdAt: new Date(),
  // });

  return { success: true, error: null };
}
