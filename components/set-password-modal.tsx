"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { setMemberPassword } from "@/app/members/actions";

interface SetPasswordModalProps {
  memberId: string;
  open: boolean;
  onClose: () => void;
}

export function SetPasswordModal({
  memberId,
  open,
  onClose,
}: SetPasswordModalProps) {
  const [password, setPassword] = React.useState("");
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      await setMemberPassword(memberId, password);
      toast({
        title: "Password updated",
        description: "The password has been successfully updated.",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error updating password",
        description: "There was an error updating the password.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px] max-h-[80vh] overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle>Set Password</DialogTitle>
          <DialogDescription>Update the user's password.</DialogDescription>
        </DialogHeader>
        <div className='py-4'>
          <Input
            type='password'
            placeholder='Enter new password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Set Password</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
