"use client";

import { AddAdminModal } from "@/components/add-admin-modal";
import { AdminHeader } from "@/components/admin-header";
import { AdminTable } from "@/components/admin-table";
import { Button } from "@/components/ui/button";
import { Admin } from "@/lib/schema";
import { Plus } from "lucide-react";
import { useState } from "react";

export type AdminDashboardProps = {
  admins: Admin[];
};

export function AdminDashboard({ admins }: AdminDashboardProps) {
  const [addAdminOpen, setAddAdminOpen] = useState(false);

  return (
    <main className='flex-1 overflow-y-auto p-8'>
      <div className='flex justify-between items-center mb-6'>
        <AdminHeader />
        <Button onClick={() => setAddAdminOpen(true)}>
          <Plus className='mr-2 h-4 w-4' /> Add Admin
        </Button>
      </div>
      <AddAdminModal open={addAdminOpen} onOpenChange={setAddAdminOpen} />
      <AdminTable data={admins} />
    </main>
  );
}
