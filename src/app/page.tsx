"use client"
import Header from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {

  const logIn = () => {
    redirect('/yourwallet')
  }

  return (
    <main className="min-h-[594px] max-w-96 flex flex-col items-center justify-between border border-gray-300 p-24">
      <div>Logo</div>
      <div className="w-72 flex flex-col items-center">
        <h2 className="font-semibold text-3xl">Hey there!</h2>
        <p>The decentralized web waits for you</p>
      </div>
      <div className="w-72">
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" placeholder="Type your password" />
        </div>
        <Button className="w-full mb-6" onClick={logIn()}>Sign In</Button>
        <Button variant="secondary" className="w-full">Create new account</Button>
      </div>
    </main>
  );
}
