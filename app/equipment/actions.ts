"use server";

import { connectToDatabase } from "@/lib/db";
import { Equipment } from "@/lib/schema";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function updateEquipment(equipment: Equipment) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("equipment");

    const { id, ...updateData } = equipment;
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      throw new Error("Equipment not found");
    }

    revalidatePath("/equipment");

    return { success: true };
  } catch (error) {
    console.error("Failed to update equipment:", error);
    throw new Error("Failed to update equipment");
  }
}
