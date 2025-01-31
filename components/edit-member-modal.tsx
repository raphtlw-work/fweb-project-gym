"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Member } from "@/lib/schema";
import { updateMember } from "@/app/members/actions";

interface EditMemberModalProps {
  member: Member | null;
  onClose: () => void;
}

export function EditMemberModal({ member, onClose }: EditMemberModalProps) {
  const { register, handleSubmit, reset } = useForm<Member>({
    defaultValues: member || {},
  });

  React.useEffect(() => {
    reset(member || {});
  }, [member, reset]);

  const onSubmit = async (data: Member) => {
    await updateMember(data);
    onClose();
  };

  if (!member) return null;

  return (
    <Dialog open={!!member} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Member</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input label="Name" {...register("name")} />
            <Input label="Email" {...register("email")} />
            <Input label="Matriculation Number" {...register("matriculationNumber")} />
            <Input label="Membership Status" {...register("membershipStatus")} />
          </div>
          <DialogFooter>
            <Button type="submit">Save</Button>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
