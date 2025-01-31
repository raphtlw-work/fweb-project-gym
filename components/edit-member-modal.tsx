"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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

const formSchema = z.object({
  id: z.string().nonempty({ message: "ID is required." }),
  name: z.string().min(3, { message: "Name must be at least 3 characters long." }),
  email: z.string().email({ message: "Invalid email address." }),
  matriculationNumber: z.string().regex(/^\d{7}[A-Za-z]$/, {
    message: "Matriculation number must be 7 digits followed by a letter.",
  }),
  membershipStatus: z.enum(["Active", "Inactive"], {
    required_error: "Membership status is required.",
  }),
  lastEntry: z.date().nullable(),
  lastExit: z.date().nullable(),
});

export function EditMemberModal({ member, onClose }: EditMemberModalProps) {
  const form = useForm<Member>({
    resolver: zodResolver(formSchema),
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
