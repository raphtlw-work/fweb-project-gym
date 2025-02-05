"use client";

import { useForm } from "react-hook-form";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type LoginFormInputs = {
  email: string;
  password: string;
};

type SignupFormInputs = {
  name: string;
  email: string;
  password: string;
  role: string;
};

export default function AuthPage() {
  const { register: loginRegister, handleSubmit: handleLoginSubmit } = useForm<LoginFormInputs>();
  const { register: signupRegister, handleSubmit: handleSignupSubmit } = useForm<SignupFormInputs>();

  const onLogin = async (data: LoginFormInputs) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    console.log(await res.json());
  };

  const onSignup = async (data: SignupFormInputs) => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    console.log(await res.json());
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <Tabs defaultValue="login">
        <TabsList>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <form onSubmit={handleLoginSubmit(onLogin)}>
            <div className="flex flex-col gap-4">
              <Input placeholder="Email" {...loginRegister("email", { required: true })} />
              <Input type="password" placeholder="Password" {...loginRegister("password", { required: true })} />
              <Button type="submit">Login</Button>
            </div>
          </form>
        </TabsContent>
        <TabsContent value="signup">
          <form onSubmit={handleSignupSubmit(onSignup)}>
            <div className="flex flex-col gap-4">
              <Input placeholder="Name" {...signupRegister("name", { required: true })} />
              <Input placeholder="Email" {...signupRegister("email", { required: true })} />
              <Input type="password" placeholder="Password" {...signupRegister("password", { required: true })} />
              <select {...signupRegister("role", { required: true })} className="border p-2 rounded">
                <option value="member">Member</option>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
              <Button type="submit">Sign Up</Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
