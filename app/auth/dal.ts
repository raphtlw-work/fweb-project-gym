import "server-only";

import { cookies } from "next/headers";
import { decrypt, SessionPayload } from "@/app/auth/session";
import { cache } from "react";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import { Member } from "@/lib/schema";
import { ObjectId } from "mongodb";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = (await decrypt(cookie)) as SessionPayload;

  if (!session?.userId) {
    redirect("/login");
  }

  return { isAuth: true, userId: session.userId, role: session.role };
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const db = await connectToDatabase();
    const user = await db
      .collection("members")
      .findOne({ _id: new ObjectId(session.userId) });

    const { _id, ...rest } = user!;
    const returned = {
      id: _id.toString(),
      ...rest,
    } as Member;

    return returned;
  } catch (error) {
    console.log("Failed to fetch user");
    return null;
  }
});
