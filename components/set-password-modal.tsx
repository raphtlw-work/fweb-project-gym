"use client";

import * as React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalClose,
} from "@/components/ui.";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

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
      // Replace this comment with an API call to update the password:
      // await updatePasswordAPI(memberId, password)
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
    <Modal open={open} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>Set Password</ModalHeader>
        <ModalClose />
        <ModalBody>
          <Input
            type='password'
            placeholder='Enter new password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant='outline' onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Set Password</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
