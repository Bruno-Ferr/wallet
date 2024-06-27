'use client'
import { ethers } from "ethers";
import { redirect, useRouter } from "next/navigation";
import { ReactNode, createContext, useState } from "react";

type AuthContextType = {
  wallet: any
  seedPhrase: string | null
  logIn: () => void
  logInWithSeedPhrase: (seedPhrase: string) => void
  signUp: (value: string) => void
  isError: boolean
}

export const AuthContext = createContext({} as AuthContextType)

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({children}: AuthProviderProps) {
  const [wallet, setWallet] = useState<any>()
  const [seedPhrase, setSeedPhrase] = useState<any>()
  const [isError, setIsError] = useState(false)
  const router = useRouter()

  const logInWithSeedPhrase = (seedPhrase: string) => {
    try {
      const recoveredWallet = ethers.Wallet.fromPhrase(seedPhrase)

      setWallet(recoveredWallet.address)
      setIsError(false)
      router.push('/yourwallet')
    } catch (err) {
      setIsError(true)
      return
    }
  }

  function logIn() {

  }

  function signUp(newSeedPhrase: string) {
    try {
      setWallet(ethers.Wallet.fromPhrase(newSeedPhrase).address)
      router.push('/yourwallet')
    } catch (err) {
      console.log(err)
    }
  }

  return(
    <AuthContext.Provider value={{wallet, logInWithSeedPhrase, isError, logIn, signUp, seedPhrase}}>
      {children}
    </AuthContext.Provider>
  )
}