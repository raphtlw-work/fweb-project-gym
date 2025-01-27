import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Admin } from "@/lib/schema";

export async function GET() {
  try {
    const db = await connectToDatabase();
    const admins = await db.collection("admins").find().toArray();
    return NextResponse.json(admins);
  } catch (error) {
    console.error("Error fetching admins:", error);
    return NextResponse.json(
      { error: "Failed to fetch admins" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body: Admin = await req.json();
    const db = await connectToDatabase();
    const result = await db.collection("admins").insertOne(body);
    return NextResponse.json(
      { message: "Admin added successfully", result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding admin:", error);
    return NextResponse.json({ error: "Failed to add admin" }, { status: 500 });
  }
}
