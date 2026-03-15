// // server.ts
import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

// Define a type for your data
interface User {
  id: number;
  name: string;
  email: string;
}

interface UserParams {
  id: string;
}

const users: User[] = [
  { id: 1, name: "Ali", email: "ali@example.com" },
];

// TypeScript knows exactly what req and res are
app.get("/users/:id", (req: Request<UserParams>, res: Response) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user); // ✅ TypeScript ensures this matches the User shape
});

app.listen(3000, () => console.log("Server running on port 3000"));

// server.ts
// import express, { Request, Response } from "express";

// const app = express();
// app.use(express.json());

// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

// interface UserParams {
//   id: string;
// }

// const users: User[] = [
//   { id: 1, name: "Ali", email: "ali@example.com" },
// ];

// app.get("/users/:id", (req: Request<UserParams>, res: Response) => {
//   const id = parseInt(req.params.id);
//   const user = users.find((u) => u.id === id);

//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   res.json(user);
// });

// app.listen(3000, () => console.log("Server running on port 3000"));