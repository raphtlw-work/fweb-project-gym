"use server";

import { connectToDatabase } from "@/lib/db";
import bcrypt from "bcrypt";

export async function loginMemberAction(formData: FormData) {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";
  const db = await connectToDatabase();
  const user = await db.collection("members").findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }
  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    throw new Error("Invalid credentials");
  }
  // TODO: create session or token
  return { success: true, user };
}

export async function loginAdminAction(formData: FormData) {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";
  const db = await connectToDatabase();
  const admin = await db.collection("admins").findOne({ email });
  if (!admin) {
    throw new Error("Invalid credentials");
  }
  const isValid = await bcrypt.compare(password, admin.passwordHash);
  if (!isValid) {
    throw new Error("Invalid credentials");
  }
  // TODO: create session or token
  return { success: true, admin };
}
