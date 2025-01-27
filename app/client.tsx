"use client";

import { AddMemberModal } from "@/components/add-member-modal";
import { AddMembers } from "@/components/add-members";
import { DashboardHeader } from "@/components/dashboard-header";
import { MembersTable } from "@/components/members-table";
import { UsageStatistics } from "@/components/usage-statistics";
import { Member } from "@/lib/schema";
import { useState } from "react";

export type PageClientProps = {
  members: Member[];
};

export function PageClient({ members }: PageClientProps) {
  const [addMemberOpen, setAddMemberOpen] = useState(false);

  return (
    <main className='flex-1 overflow-y-auto p-8'>
      <DashboardHeader />
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6'>
        <UsageStatistics />
        <AddMembers onAddMember={() => setAddMemberOpen(true)} />
      </div>
      <MembersTable data={members} />
      <AddMemberModal open={addMemberOpen} onOpenChange={setAddMemberOpen} />
    </main>
  );
}
