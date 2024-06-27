'use client'
import { Button } from "@/components/ui/Button"
import { Label } from "@/components/ui/Label"
import { AuthContext } from "@/context/AuthContext"
import { ArrowLeft } from "@phosphor-icons/react"
import { ethers } from "ethers"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useContext, useState } from "react"

export default function seedPhraseLogin() {
  const { logInWithSeedPhrase, isError} = useContext(AuthContext)
  const [seedPhrase, setSeedPhrase] = useState('')
  const [wallet, setWallet] = useState('')
  //const [isError, setIsError] = useState(false)

  // const logInWithSeedPhrase = () => {
  //   try {
  //     const recoveredWallet = ethers.Wallet.fromPhrase(seedPhrase)

  //     setWallet(recoveredWallet.address)
  //     setIsError(false)
  //     redirect('/yourwallet')
  //   } catch (err) {
  //     setIsError(true)
  //     return
  //   }
  // }

  return (
    <main className="min-h-[594px] max-w-96 flex flex-col items-center justify-between border border-gray-300 p-24 relative">
      <div className="w-72">
        <Link href={'/'} className="absolute top-6 left-6">
          <ArrowLeft size={22} className="text-gray-500"/>
        </Link>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <Label htmlFor="password">Seed phrase:</Label>
          <textarea className="border border-gray-300" placeholder="Type your seed phrase here..." rows={4} onChange={(e) => setSeedPhrase(e.target.value)} />
          {isError && <p className="text-red-500 text-center">Incorrect seed phrase</p>}
        </div>
        <Button className="w-full mb-6" onClick={() => logInWithSeedPhrase(seedPhrase)}>Sign In</Button>
      </div>
    </main>
  )
}