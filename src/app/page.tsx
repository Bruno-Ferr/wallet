"use client"
import Header from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { ethers } from "ethers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [password, setPassword] = useState('')
 
  const logIn = () => {

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
          <input type="password" placeholder="Your password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button className="w-full mb-1" onClick={() => logIn()}>Sign In</Button>
        <Link href={'/seedPhrase'} className="underline">Forgot your password?</Link>
        <Button variant="secondary" className="w-full mt-4">Create new account</Button>
      </div>
    </main>
  );
}
