"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import { AddMemberModal } from "@/components/add-member-modal"

export function AddMemberButton() {
  const [addMemberOpen, setAddMemberOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setAddMemberOpen(true)}>
        <Plus className="mr-2 h-4 w-4" /> Add Member
      </Button>
      <AddMemberModal open={addMemberOpen} onOpenChange={setAddMemberOpen} />
    </>
  )
}

