"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface BarcodeScannerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BarcodeScanner({ open, onOpenChange }: BarcodeScannerProps) {
  const [matriculation, setMatriculation] = useState("")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Scanner</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 rounded-full"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="relative mx-auto w-48 h-48">
            <img
              src="/scanner-hand.png"
              alt="Scanner Illustration"
              className="w-full h-full object-contain"
              style={{
                filter: 'contrast(1.2) brightness(0.9)'
              }}
            />
          </div>
          <div className="space-y-2 text-center">
            <h3 className="text-lg font-semibold">Scan Matriculation Card</h3>
            <p className="text-sm text-muted-foreground">Check-in/out student</p>
          </div>
          <Input
            type="text"
            placeholder="Matriculation Number"
            value={matriculation}
            onChange={(e) => setMatriculation(e.target.value)}
            className="w-full"
          />
        </div>
        <style jsx global>{`
          .noise {
            position: fixed;
            z-index: 9999;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            opacity: 0.05;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 2000 2000' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          }
          
          [data-dialog-overlay] {
            backdrop-filter: blur(4px);
          }
          
          [data-dialog-content] {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 2000 2000' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            background-blend-mode: overlay;
            background-color: white;
          }
        `}</style>
      </DialogContent>
    </Dialog>
  )
}

