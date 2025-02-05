import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { User } from "@/lib/schema";

export async function POST(request: Request) {
  const { name, email, password, role } = await request.json();

  const client = await connectToDatabase();
  const db = client.db();
  const existingUser = await db.collection("users").findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser: Partial<User> = {
    id: new Date().getTime().toString(),
    name,
    email,
    passwordHash,
    role,
  };

  await db.collection("users").insertOne(newUser);
  return NextResponse.json({ success: true });
}
