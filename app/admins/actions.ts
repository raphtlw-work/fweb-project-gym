"use server";

import { connectToDatabase } from "@/lib/db";
import { Admin } from "@/lib/schema";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";

export async function deleteAdmins(admins: Admin[]) {
  const db = await connectToDatabase();
  for (const admin of admins) {
    const result = await db.collection("admins").deleteOne({
      _id: new ObjectId(admin.id),
    });
    console.log(result);
  }

  revalidatePath("/admins");
}

export async function addAdmin(
  admin: Omit<Admin, "id" | "passwordHash"> & { password: string }
) {
  const db = await connectToDatabase();
  const collection = db.collection("admins");

  if (
    await collection.findOne({
      matriculationNumber: admin.matriculationNumber,
    })
  ) {
    throw new Error("Member already exists.");
  }

  const result = await collection.insertOne({
    ...admin,
    passwordHash: await bcrypt.hash(admin.password, 10),
  });

  if (!result.insertedId) {
    throw new Error("Failed to add member");
  }

  revalidatePath("/admins");

  return { success: true, id: result.insertedId.toString() };
}
