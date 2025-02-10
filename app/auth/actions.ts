"use server";

import { connectToDatabase } from "@/lib/db";
import { Admin, Member } from "@/lib/schema";
import bcrypt from "bcrypt";
import { createSession } from "./session";
import { redirect } from "next/navigation";

export async function loginMemberAction(formData: FormData) {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  if (email.length === 0) {
    throw new Error("No email");
  }
  if (password.length === 0) {
    throw new Error("No password");
  }

  const db = await connectToDatabase();
  const user = await db.collection("members").findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  const { _id, ...rest } = user;
  const returned = {
    id: _id.toString(),
    ...rest,
  } as Member;

  await createSession(returned.id, "member");
  redirect("/");
}

export async function loginAdminAction(formData: FormData) {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  if (email.length === 0) {
    throw new Error("No email");
  }
  if (password.length === 0) {
    throw new Error("No password");
  }

  const db = await connectToDatabase();
  const admin = await db.collection("admins").findOne({ email });
  if (!admin) {
    throw new Error("Invalid credentials");
  }

  const isValid = await bcrypt.compare(password, admin.passwordHash);
  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  const { _id, ...rest } = admin;
  const returned = {
    id: _id.toString(),
    ...rest,
  } as Admin;

  await createSession(returned.id, "admin");
  redirect("/");
}
