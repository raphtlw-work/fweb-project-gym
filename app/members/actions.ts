"use server";

import { connectToDatabase } from "@/lib/db";
import { Member } from "@/lib/schema";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function fetchMemberByMatriculation(
  matriculation: string
): Promise<Member | null> {
  const db = await connectToDatabase();
  const collection = db.collection("members");

  const member = await collection.findOne({
    matriculationNumber: matriculation,
  });

  if (member) {
    return {
      id: member._id.toString(),
      name: member.name,
      email: member.email,
      matriculationNumber: member.matriculationNumber,
      membershipStatus: member.membershipStatus,
      matriculation: member.matriculation,
      lastEntry: member.lastEntry ? member.lastEntry : null,
      lastExit: member.lastExit ? member.lastExit : null,
    } as unknown as Member;
  }

  return null;
}

export async function addMember(member: Omit<Member, "id">) {
  const db = await connectToDatabase();
  const collection = db.collection("members");

  if (
    await collection.findOne({
      matriculationNumber: member.matriculationNumber,
    })
  ) {
    throw new Error("Member already exists.");
  }

  const result = await collection.insertOne(member);

  if (!result.insertedId) {
    throw new Error("Failed to add member");
  }

  revalidatePath("/members");

  return { success: true, id: result.insertedId.toString() };
}

export async function updateMember(member: Member) {
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
}
