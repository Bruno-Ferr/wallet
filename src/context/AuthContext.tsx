'use client'
import { Alchemy, Network } from "alchemy-sdk";
import { ethers } from "ethers";
import { redirect, useRouter } from "next/navigation";
import { ReactNode, createContext, useEffect, useState } from "react";

type AuthContextType = {
  wallet: any
  seedPhrase: string | null
  logIn: () => void
  logInWithSeedPhrase: (seedPhrase: string) => void
  signUp: (value: string) => void
  isError: boolean
  value: any
  NFTs: any
}

export const AuthContext = createContext({} as AuthContextType)

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({children}: AuthProviderProps) {
  const [wallet, setWallet] = useState<any>()
  const [currentNetwork, setCurrentNetwork] = useState<any>()
  const [seedPhrase, setSeedPhrase] = useState<any>()
  const [value, setValue] = useState<any>()
  const [NFTs, setNFTs] = useState<any>([])
  const [isError, setIsError] = useState(false)
  const router = useRouter()

  const logInWithSeedPhrase = (seedPhrase: string) => {
    try {
      const recoveredWallet = ethers.Wallet.fromPhrase(seedPhrase)

      setWallet(recoveredWallet.address)
      setIsError(false)
      getTokens(recoveredWallet.address)
      router.push('/yourwallet')
    } catch (err) {
      setIsError(true)
      return
    }
  }

  async function getTokens(addr: string) {
    // Optional config object, but defaults to demo api-key and eth-mainnet.
    const settings = {
      apiKey: "s-vHBaDfU14XzTTkHoaYdhsGp3wKZtKT", // Replace with your Alchemy API Key.
      network: Network.ETH_MAINNET, // Replace with your network.
    };
    const alchemy = new Alchemy(settings);

    const res = await alchemy.core.getBalance(addr, "latest");
    setValue(ethers.formatEther(res._hex))

    const options = {method: 'GET', headers: {accept: 'application/json'}};

    fetch(`https://eth-mainnet.g.alchemy.com/nft/v3/s-vHBaDfU14XzTTkHoaYdhsGp3wKZtKT/getNFTsForOwner?owner=${addr}&withMetadata=true&pageSize=100`, options)
      .then(response => response.json())
      .then(response => {console.log(response); setNFTs(response)})
      .catch(err => console.error(err));
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
    <AuthContext.Provider value={{wallet, logInWithSeedPhrase, isError, logIn, signUp, seedPhrase, value, NFTs}}>
      {children}
    </AuthContext.Provider>
  )
}