"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateEquipmentHealth } from "@/app/equipment/actions";

export type UpdateHealthStatusModalProps = {
  equipmentId: string;
  onClose: () => void; // Callback to refresh the data after saving
};

export function UpdateHealthStatusModal({
  equipmentId,
  onClose,
}: UpdateHealthStatusModalProps) {
  const [healthStatus, setHealthStatus] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHealthStatus(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateEquipmentHealth(equipmentId, healthStatus);
      onClose(); // Close the modal after saving
    } catch (error) {
      console.error("Failed to update equipment's health status:", error);
    }
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Equipment Health Status</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='space-y-4'>
            <div>
              <Label htmlFor='healthStatus'>Health Status</Label>
              <Input
                id='healthStatus'
                value={healthStatus}
                onChange={handleChange}
                required
              />
            </div>
            <Button type='submit'>Update Status</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
