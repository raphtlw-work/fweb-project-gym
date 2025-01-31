"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Member } from "@/lib/schema";
import { Toggle } from "@/components/ui/toggle";
import { updateMember } from "@/app/members/actions";

interface EditMemberModalProps {
  member: Member | null;
  onClose: () => void;
}

export function EditMemberModal({ member, onClose }: EditMemberModalProps) {
  const form = useForm<Member>({
    defaultValues: {
      id: "",
      name: "",
      email: "",
      matriculationNumber: "",
      membershipStatus: "Active",
      lastEntry: null,
      lastExit: null,
      ...member,
    },
  });

  React.useEffect(() => {
    form.reset();
  }, [member, form.reset]);

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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Member name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='Member email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='matriculationNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Matriculation Number</FormLabel>
                  <FormControl>
                    <Input placeholder='e.g. 2304509I' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='membershipStatus'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between'>
                  <FormLabel>Membership Status</FormLabel>
                  <FormControl>
                    <Toggle
                      pressed={field.value === "Active"}
                      onPressedChange={(pressed) =>
                        field.onChange(pressed ? "Active" : "Inactive")
                      }
                    >
                      {field.value === "Active" ? "Active" : "Inactive"}
                    </Toggle>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type='submit'>Save</Button>
              <Button variant='outline' onClick={onClose}>
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
