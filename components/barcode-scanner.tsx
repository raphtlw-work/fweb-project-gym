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
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "next-themes";

interface BarcodeScannerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BarcodeScanner({ open, onOpenChange }: BarcodeScannerProps) {
  const [matriculation, setMatriculation] = useState("");

  const { toast } = useToast();

  useEffect(() => {
    const updateMemberEntryExit = async () => {
      const isValidMatriculation = /^[0-9]+[A-Z]$/.test(matriculation);

      if (isValidMatriculation) {
        try {
          const member = await fetchMemberByMatriculation(matriculation);
          if (member) {
            const now = new Date();
            if (member.lastEntry && member.lastExit === null) {
              member.lastExit = now;
            } else if (member.lastEntry && member.lastExit) {
              member.lastEntry = now;
              member.lastExit = null;
            }
            await updateMember(member);
          }
        } catch (error) {
          toast({
            title: "Failed to update member entry/exit",
            description: String(error),
            variant: "destructive",
          });
        } finally {
          setMatriculation("");
        }
      }
    };

    updateMemberEntryExit();
  }, [matriculation]);

  const { theme } = useTheme();

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
              fill={theme === "dark" ? "white" : "black"}
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
