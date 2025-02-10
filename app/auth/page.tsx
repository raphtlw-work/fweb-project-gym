"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

export default function AuthPage() {
  const { register: memberRegister, handleSubmit: handleMemberSubmit } = useForm<{ email: string; password: string }>();
  const { register: adminRegister, handleSubmit: handleAdminSubmit } = useForm<{ email: string; password: string }>();

  const onMemberSubmit = async (data: { email: string; password: string }) => {
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      const response = await fetch("/api/auth/login", { method: "POST", body: formData });
      console.log(await response.json());
    } catch (error) {
      console.error("Member login error:", error);
    }
  };

  const onAdminSubmit = async (data: { email: string; password: string }) => {
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      const response = await fetch("/api/auth/admin/login", { method: "POST", body: formData });
      console.log(await response.json());
    } catch (error) {
      console.error("Admin login error:", error);
    }
  };

  return (
    <div className='max-w-md mx-auto mt-20'>
      <h1 className='mx-auto mt-20 font-bold text-3xl'>FastGym</h1>

      <div className='mt-20'></div>

      <Tabs defaultValue='login'>
        <TabsList>
          <TabsTrigger value='login'>Member Login</TabsTrigger>
          <TabsTrigger value='admin'>Admin Login</TabsTrigger>
        </TabsList>
        <TabsContent value='login'>
          <form onSubmit={handleMemberSubmit(onMemberSubmit)}>
            <div className='flex flex-col gap-4'>
              <Input {...memberRegister("email")} placeholder='Email' />
              <Input {...memberRegister("password")} type="password" placeholder='Password' />
              <Button type='submit'>Login</Button>
            </div>
          </form>
        </TabsContent>
        <TabsContent value='admin'>
          <form onSubmit={handleAdminSubmit(onAdminSubmit)}>
            <div className='flex flex-col gap-4'>
              <Input {...adminRegister("email")} placeholder='Email' />
              <Input {...adminRegister("password")} type="password" placeholder='Password' />
              <Button type='submit'>Login as Admin</Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
