// app/dashboard/page.jsx
"use client";

import { useState, useEffect } from "react";

export default function Dashboard() {
  const [data, setData] = useState(null);

  // GET
  useEffect(() => {
    fetch("/api", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(setData);
    console.log("Data Loaded");
  }, []);

  const fetchUsers = async () => {
    const res = await fetch("/api", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data); // display on frontend
  };

  // POST
  const handlePost = async () => {
    const res = await fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Ali" }),
    });
    const data = await res.json();
    console.log(data);
    fetchUsers();
  };

  // PUT
  const handlePut = async () => {
    const res = await fetch("/api", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Updated Ali" }),
    });
    const data = await res.json();
    console.log(data);
    fetchUsers();
  };

  // DELETE
  const handleDelete = async () => {
    const res = await fetch("/api", { method: "DELETE" });
    const data = await res.json();
    console.log(data);
    fetchUsers();
  };

  return (
    <div className="text-center text-xl">
      <p>GET Response: {data?.message}</p>
      <button
        onClick={handlePost}
        className="bg-blue-500 text-white px-4 py-2 rounded m-2 cursor-pointer"
      >
        POST
      </button>
      <button
        onClick={handlePut}
        className="bg-green-500 text-white px-4 py-2 rounded m-2 cursor-pointer"
      >
        PUT
      </button>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded m-2 cursor-pointer"
      >
        DELETE
      </button>
    </div>
  );
}
