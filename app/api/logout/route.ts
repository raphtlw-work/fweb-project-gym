import { deleteSession } from "@/app/auth/session";
import { redirect } from "next/navigation";

export const POST = async () => {
  await deleteSession(); // This will delete the session

  return redirect("/auth");
};
