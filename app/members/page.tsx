import { Suspense } from "react";
import { Sidebar } from "@/components/sidebar";
import { MembersHeader } from "@/components/members-header";
import { MembersTable } from "@/components/members-table";
import { AddMemberButton } from "@/components/add-member-button";
import { Member } from "@/lib/schema";
import { connectToDatabase } from "@/lib/db";

export default async function MembersPage() {
  const db = await connectToDatabase();
  const members = (await db.collection("members").find().toArray()).map(
    (admin) => {
      const { _id, ...rest } = admin;

      return { ...rest, id: _id.toString() };
    }
  ) as Member[];

  return (
    <div className='flex h-screen bg-background'>
      <Sidebar />
      <main className='flex-1 overflow-y-auto p-8'>
        <div className='flex justify-between items-center mb-6'>
          <MembersHeader />
          <AddMemberButton />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <MembersTable data={members} />
        </Suspense>
      </main>
    </div>
  );
}
