"use server";

import { connectToDatabase } from "@/lib/db";
import { Admin } from "@/lib/schema";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function deleteAdmins(admins: Admin[]) {
  console.log(admins);
  const db = await connectToDatabase();
  for (const admin of admins) {
    const result = await db.collection("admins").deleteOne({
      _id: new ObjectId(admin.id),
    });
    console.log(result);
  }

  revalidatePath("/admins");
}
