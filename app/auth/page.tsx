"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginMemberAction, loginAdminAction } from "@/app/auth/actions";

export default function AuthPage() {

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
          <form action={loginMemberAction} method="post">
            <div className='flex flex-col gap-4'>
              <Input name="email" placeholder='Email' />
              <Input name="password" type="password" placeholder='Password' />
              <Button type='submit'>Login</Button>
            </div>
          </form>
        </TabsContent>
        <TabsContent value='admin'>
          <form action={loginAdminAction} method="post">
            <div className='flex flex-col gap-4'>
              <Input name="email" placeholder='Email' />
              <Input name="password" type="password" placeholder='Password' />
              <Button type='submit'>Login as Admin</Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
