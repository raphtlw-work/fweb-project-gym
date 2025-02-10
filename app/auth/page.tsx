"use client";

import { useForm } from "react-hook-form";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function AuthPage() {
  const { register: loginRegister, handleSubmit: handleLoginSubmit } =
    useForm<LoginFormInputs>();

  const onLogin = async (data: LoginFormInputs) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    console.log(await res.json());
  };

  return (
    <div className='max-w-md mx-auto mt-20'>
      <h1 className='mx-auto mt-20 font-bold text-3xl'>FastGym</h1>

      <div className='mt-20'></div>

      <Tabs defaultValue='login'>
        <TabsList>
          <TabsTrigger value='login'>Login</TabsTrigger>
        </TabsList>
        <TabsContent value='login'>
          <form onSubmit={handleLoginSubmit(onLogin)}>
            <div className='flex flex-col gap-4'>
              <Input
                placeholder='Email'
                {...loginRegister("email", { required: true })}
              />
              <Input
                type='password'
                placeholder='Password'
                {...loginRegister("password", { required: true })}
              />
              <Button type='submit'>Login</Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
