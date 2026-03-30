import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello World" });
}

export async function POST(request) {
  const body = await request.json();
  console.log(body);
  return NextResponse.json({ message: "Hello World", body });
}

export async function PUT(request) {
  const body = await request.json();
  console.log(body);
  return NextResponse.json({ message: "Hello World", body });
}

export async function DELETE() {
  return NextResponse.json({ message: "Hello World" });
}
