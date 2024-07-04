'use client'
import { Alchemy, Network } from "alchemy-sdk";
import { AlchemyProvider } from "ethers";
import { ethers } from "ethers";
import { url } from "inspector";
import { redirect, useRouter } from "next/navigation";
import { ReactNode, createContext, useEffect, useState } from "react";

type AuthContextType = {
  wallet: any
  seedPhrase: string | null
  logIn: () => void
  logInWithSeedPhrase: (seedPhrase: string) => void
  signUp: (value: string) => void
  sendTx: (to: string, amountInEther: string) => void
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
  const [currentNetwork, setCurrentNetwork] = useState<any>("eth-mainnet")
  const [seedPhrase, setSeedPhrase] = useState<any>()
  const [value, setValue] = useState<any>()
  const [NFTs, setNFTs] = useState<any>([])
  const [isError, setIsError] = useState(false)

  const router = useRouter()

  const provider = new AlchemyProvider('sepolia', process.env.ALCHEMY_API_KEY)

  const logInWithSeedPhrase = (seedPhrase: string) => {
    try {
      const recoveredWallet = ethers.Wallet.fromPhrase(seedPhrase, provider)

      setWallet(recoveredWallet)
      setIsError(false)
      getTokens(recoveredWallet.address)
      router.push('/yourwallet')
    } catch (err) {
      setIsError(true)
      return
    }
  }

  async function getTokens(addr: string) {
    const resA = await provider.getBalance(addr)
    setValue(ethers.formatEther(resA))

    const options = {method: 'GET', headers: {accept: 'application/json'}};

    fetch(`https://eth-mainnet.g.alchemy.com/nft/v3/${process.env.ALCHEMY_API_KEY}/getNFTsForOwner?owner=${addr}&withMetadata=true&pageSize=100`, options)
      .then(response => response.json())
      .then(response => {console.log(response); setNFTs(response)})
      .catch(err => console.error(err));
  }

  async function sendTx(to: string, amountInEth: string) {
    //address is valid
    const isValidAddr = ethers.isAddress(to)
    if(!isValidAddr) {console.log('address not valid'); return;}

    //build tx
    const amount = ethers.parseEther(amountInEth);

    const tx = {
      to,
      value: amount
    }

    const feeData = await provider.getFeeData()
    if(feeData.gasPrice == null) {console.log('gas null'); return;}
    const txFee = BigInt(21000) * feeData.gasPrice
    const balance = await provider.getBalance(wallet.address)
    if(balance < (amount + txFee)) {console.log('Insufficient amount in balance'); return;}

    try {
      const receipt = await wallet.sendTransaction(tx)
      console.log(receipt)
      //send
    } catch (err) {
      console.log(err)
    }
    
  }

  function logIn() {

  }

  function signUp(newSeedPhrase: string) {
    try {
      const recoveredWallet = ethers.Wallet.fromPhrase(newSeedPhrase, provider)
      setWallet(recoveredWallet)
      router.push('/yourwallet')
    } catch (err) {
      console.log(err)
    }
  }

  return(
    <AuthContext.Provider value={{wallet, logInWithSeedPhrase, isError, logIn, signUp, sendTx, seedPhrase, value, NFTs}}>
      {children}
    </AuthContext.Provider>
  )
}