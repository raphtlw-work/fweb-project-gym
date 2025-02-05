import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const client = await connectToDatabase();
  const db = client.db();
  const user = await db.collection("users").findOne({ email });
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }

  // Here you would normally create a session or a token.
  return NextResponse.json({ success: true, user });
}
