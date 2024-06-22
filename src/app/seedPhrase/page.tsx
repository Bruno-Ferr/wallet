"use client"
import { Button } from "@/components/ui/Button"
import { Label } from "@/components/ui/Label"
import { ethers } from "ethers"
import { redirect } from "next/navigation"
import { useState } from "react"

export default function seedPhraseLogin() {
  const [seedPhrase, setSeedPhrase] = useState('')
  const [wallet, setWallet] = useState('')
  const [isError, setIsError] = useState(false)

  const logInWithSeedPhrase = () => {
    try {
      const recoveredWallet = ethers.Wallet.fromPhrase(seedPhrase)

      setWallet(recoveredWallet.address)
      setIsError(false)
      redirect('/yourwallet')
    } catch (err) {
      setIsError(true)
      return
    }
  }

  return (
    <main className="min-h-[594px] max-w-96 flex flex-col items-center justify-between border border-gray-300 p-24">
      <div className="w-72">
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <Label htmlFor="password">Seed phrase:</Label>
          <textarea className="border border-gray-300" placeholder="Type your seed phrase here..." rows={4} onChange={(e) => setSeedPhrase(e.target.value)} />
          {isError && <p className="text-red-500 text-center">Incorrect seed phrase</p>}
        </div>
        <Button className="w-full mb-6" onClick={() => logInWithSeedPhrase()}>Sign In</Button>
      </div>
    </main>
  )
}