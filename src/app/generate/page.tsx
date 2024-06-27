"use client"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Label } from "@/components/ui/Label"
import { AuthContext } from "@/context/AuthContext"
import { ArrowLeft, RadioButton } from "@phosphor-icons/react"
import { ethers } from "ethers"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useContext, useState } from "react"
import seedPhraseLogin from "../seedPhrase/page"

export default function createWallet() {
  const [newSeedPhrase, setNewSeedPhrase] = useState<string>('')
  const {signUp} = useContext(AuthContext)
  const [isError, setIsError] = useState(false)

  function generateWallet() {
    const mnemonic = ethers.Wallet.createRandom().mnemonic?.phrase;
    !!mnemonic && setNewSeedPhrase(mnemonic)
    //Something went wrong, toast from shadcn
  }

  return (
    <main className="min-h-[594px] max-w-96 flex flex-col items-center justify-between border border-gray-300 p-24 relative">
      <div className="w-72">
        <Link href={'/'} className="absolute top-6 left-6">
          <ArrowLeft size={22} className="text-gray-500"/>
        </Link>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <Button onClick={() => generateWallet()}>
            Generate new wallet
          </Button>
          <Label htmlFor="password">Your wallet seed phrase:</Label>
          <Card className="w-full h-32">
            <p className="p-1">{newSeedPhrase}</p>
          </Card>
        </div>
        <Button variant='outline' className="w-full mb-6" disabled={!newSeedPhrase} onClick={() => signUp(newSeedPhrase)}>Open your new wallet</Button>
      </div>
    </main>
  )
}