"use client";

import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { updateMember } from "@/app/members/actions";
import { useToast } from "@/hooks/use-toast";
import { Member } from "@/lib/schema";

const formSchema = z.object({
  matriculationNumber: z.string().regex(/^\d{7}[A-Za-z]$/, {
    message: "Matriculation number must be 7 digits followed by a letter.",
  }),
  name: z.string().min(3, {
    message: "Name must be at least 3 characters long.",
  }),
  type: z.enum(["Student", "Staff"], {
    required_error: "Type is required.",
  }),
  startDate: z.date({
    required_error: "A starting date of entry is required.",
  }),
  remarks: z
    .string()
    .max(500, {
      message: "Remarks cannot exceed 500 characters.",
    })
    .optional(),
});

export function EditMemberModal({
  member,
  onClose,
}: {
  member: Member;
  onClose: () => void;
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      matriculationNumber: member.matriculationNumber,
      name: member.name,
      type: member.type,
      remarks: member.remarks,
    },
  });

  const { toast } = useToast();

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      try {
        await updateMember({
          ...member,
          ...values,
          remarks: values.remarks ?? "",
        });
        onClose();
        form.reset();
      } catch (error) {
        toast({
          title: "Updating member failed",
          description: String(error),
          variant: "destructive",
        });
      }
    },
    [onClose, router]
  );

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit Member</DialogTitle>
          <DialogDescription>
            Update the details of the member here.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='matriculationNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Matriculation No.</FormLabel>
                  <FormControl>
                    <Input placeholder='e.g. 2304509I' {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter student's matric number or scan their card.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Student name' {...field} />
                  </FormControl>
                  <FormDescription>Student name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a type' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='Student'>Student</SelectItem>
                      <SelectItem value='Staff'>Staff</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Choose type</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='startDate'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Starting date of entry</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={`w-[240px] pl-3 text-left font-normal ${
                            !field.value && "text-muted-foreground"
                          }`}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Enter start date</FormDescription>
                  <FormMessage />
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => field.onChange(new Date())}
                    className='mt-2'
                  >
                    Use Current Date
                  </Button>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='remarks'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remarks</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter some remarks'
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Enter some remarks</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type='submit'>Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
