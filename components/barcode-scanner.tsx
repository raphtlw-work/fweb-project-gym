"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
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
            <p className='text-sm text-muted-foreground'>
              Check-in/out student
            </p>
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
