"use server";

import { connectToDatabase } from "@/lib/db";
import { Equipment } from "@/lib/schema";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function updateEquipmentHealth(
  equipmentId: string,
  healthStatus: string
) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("equipment");

    const result = await collection.updateOne(
      { _id: new ObjectId(equipmentId) },
      { $set: { healthStatus } } // Update only the healthStatus field
    );

    if (result.matchedCount === 0) {
      throw new Error("Equipment not found");
    }

    revalidatePath("/equipment"); // Assuming this is where the equipment is listed

    return { success: true };
  } catch (error) {
    console.error("Failed to update equipment health status:", error);
    throw new Error("Failed to update equipment health status");
  }
}
