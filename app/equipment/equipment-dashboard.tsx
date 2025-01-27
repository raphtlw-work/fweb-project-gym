"use client";

import React, { useState } from "react";
import { EquipmentTable } from "@/components/equipment-table";
import { MembersHeader } from "@/components/members-header";
import { Button } from "@/components/ui/button";
import { Equipment } from "@/lib/schema";
import { Plus } from "lucide-react";
import { AddEquipmentModal } from "@/components/add-equipment-modal";
import { EquipmentHeader } from "@/components/equipment-header";

export type EquipmentDashboardProps = {
  equipments: Equipment[];
};

export function EquipmentDashboard({ equipments }: EquipmentDashboardProps) {
  const [addEquipmentOpen, setAddEquipmentOpen] = useState(false);

  return (
    <main className='flex-1 overflow-y-auto p-8'>
      <div className='flex justify-between items-center mb-6'>
        <EquipmentHeader />
        <Button onClick={() => setAddEquipmentOpen(true)}>
          <Plus className='mr-2 h-4 w-4' /> Add Equipment
        </Button>
      </div>
      <AddEquipmentModal
        open={addEquipmentOpen}
        onOpenChange={setAddEquipmentOpen}
      />
      <EquipmentTable data={equipments} />
    </main>
  );
}
