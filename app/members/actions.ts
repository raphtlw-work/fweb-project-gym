"use server";

import { connectToDatabase } from "@/lib/db";
import { Member } from "@/lib/schema";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function updateMember(member: Member) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("members");

    const { id, ...updateData } = member;
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      throw new Error("Member not found");
    }

    revalidatePath("/members");

    return { success: true };
  } catch (error) {
    console.error("Failed to update member:", error);
    throw new Error("Failed to update member");
  }
}
