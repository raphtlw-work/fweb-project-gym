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
import { addAdmin } from "@/app/admins/actions";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  matriculationNumber: z.string().regex(/^\d{7}[A-Za-z]$/, {
    message: "Matriculation number must be 7 digits followed by a letter.",
  }),
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  membershipStatus: z.enum(["Active", "Inactive"]),
  lastEntry: z.date().nullable().optional(),
  lastExit: z.date().nullable().optional(),
    .string()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      message: "Password strength does not meet the requirements.",
    }),
  type: z.enum(["Student", "Staff"]),
  startDate: z.date({
    required_error: "A date of entry is required.",
  }),
  remarks: z.string().optional(),
});

export function AddAdminModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      matriculationNumber: "",
      name: "",
      email: "",
      password: "",
      membershipStatus: "Active",
      lastEntry: null,
      lastExit: null,
      type: "Student",
      remarks: "",
    },
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      try {
        await addAdmin({
          email: `${values.matriculationNumber}@student.tp.edu.sg`,
          ...values,
          remarks: values.remarks ?? "",
          membershipStatus: "Active",
        });
        onOpenChange(false);
        form.reset();
      } catch (error) {
        toast({
          title: "Adding member failed",
          description: String(error),
          variant: "destructive",
        });
      }
    },
    [router]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px] max-h-[80vh] overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle>Add New Admin</DialogTitle>
          <DialogDescription>
            Enter the details of the new admin here.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='e.g. example@domain.com' {...field} />
                  </FormControl>
                  <FormDescription>Enter the email address</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='membershipStatus'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Membership Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select status' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='Active'>Active</SelectItem>
                      <SelectItem value='Inactive'>Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Choose membership status</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastEntry'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Last Entry</FormLabel>
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
                  <FormDescription>Enter last entry date</FormDescription>
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
              name='lastExit'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Last Exit</FormLabel>
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
                  <FormDescription>Enter last exit date</FormDescription>
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
              name='matriculationNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Matriculation No.</FormLabel>
                  <FormControl>
                    <Input placeholder='e.g. 2304509I' {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter student's matriculation/staff number or scan their
                    card.
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
                    <Input placeholder='Student/Staff name' {...field} />
                  </FormControl>
                  <FormDescription>Student/Staff name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='Enter password'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Set a password for admin</FormDescription>
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
              <Button type='submit'>Add Admin</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
