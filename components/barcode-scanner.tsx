"use client";

import { useState, useEffect } from "react";
import {
  fetchMemberByMatriculation,
  updateMember,
} from "@/app/members/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScannerHand } from "./icons/scanner-hand";

interface BarcodeScannerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BarcodeScanner({ open, onOpenChange }: BarcodeScannerProps) {
  const [matriculation, setMatriculation] = useState("");

  useEffect(() => {
    const updateMemberEntryExit = async () => {
      if (matriculation) {
        try {
          const member = await fetchMemberByMatriculation(matriculation);
          if (member) {
            const now = new Date();
            const updatedMember = {
              ...member,
              lastEntry: member.lastExit ? now : member.lastEntry,
              lastExit: member.lastEntry ? now : member.lastExit,
            };
            await updateMember(updatedMember);
          }
        } catch (error) {
          console.error("Failed to update member entry/exit:", error);
        }
      }
    };

    updateMemberEntryExit();
  }, [matriculation]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-md w-full'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-semibold'>Scanner</DialogTitle>
        </DialogHeader>
        <div className='space-y-6 py-4'>
          <div className='relative mx-auto w-48 h-48'>
            <ScannerHand
              style={{
                filter: "contrast(1.2) brightness(0.9)",
              }}
              fill='white'
            />
          </div>
          <div className='space-y-2 text-center'>
            <h3 className='text-lg font-semibold'>Scan Matriculation Card</h3>
            <DialogDescription>Check-in/out student</DialogDescription>
          </div>
          <Input
            type='text'
            placeholder='Matriculation Number'
            value={matriculation}
            onChange={(e) => setMatriculation(e.target.value)}
            className='w-full'
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
