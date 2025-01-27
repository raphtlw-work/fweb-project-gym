import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { UsageStatistics } from "@/components/usage-statistics";
import { AddMembers } from "@/components/add-members";
import { AddMemberModal } from "@/components/add-member-modal";
import { MembersTable } from "@/components/members-table";
import { connectToDatabase } from "@/lib/db";
import { Member } from "@/lib/schema";
import { PageClient } from "./client";

export default async function Home() {
  const db = await connectToDatabase();
  const members = (await db.collection("members").find().toArray()).map<Member>(
    (item: any) => {
      const { _id, ...rest } = item;

      return {
        ...rest,
        id: _id.toString(),
      };
    }
  );

  return (
    <div className='flex h-screen bg-background'>
      <Sidebar />
      <PageClient members={members} />
    </div>
  );
}
