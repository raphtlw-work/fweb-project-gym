"use client";

import { AddMemberModal } from "@/components/add-member-modal";
import { MembersHeader } from "@/components/members-header";
import { MembersTable } from "@/components/members-table";
import { Button } from "@/components/ui/button";
import { Member } from "@/lib/schema";
import { Plus } from "lucide-react";
import { useState } from "react";

export type MemberDashboardProps = {
  members: Member[];
};

export function MemberDashboard({ members }: MemberDashboardProps) {
  const [addMemberOpen, setAddMemberOpen] = useState(false);

  return (
    <main className='flex-1 overflow-y-auto p-8'>
      <div className='flex justify-between items-center mb-6'>
        <MembersHeader />
        <Button onClick={() => setAddMemberOpen(true)}>
          <Plus className='mr-2 h-4 w-4' /> Add Member
        </Button>
      </div>
      <AddMemberModal open={addMemberOpen} onOpenChange={setAddMemberOpen} />
      <MembersTable data={members} />
    </main>
  );
}
