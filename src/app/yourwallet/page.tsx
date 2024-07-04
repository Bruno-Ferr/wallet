"use client"
import { Network, Alchemy } from "alchemy-sdk";
import { ArrowUpRight, ChartLine, PlusMinus } from "@phosphor-icons/react";
import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { AuthContext } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import Nftpageopt from "@/components/Nftpageopt";

export default function YourWallet() {
  const {wallet, value, NFTs, sendTx} = useContext(AuthContext)
  const [currentPage, setCurrentPage] = useState('tokens')
  
  useEffect(() => {
    if(!wallet) redirect('/seedPhrase')
  }, [])

  function formatWalletEther(value: string, casasDecimais = 5) {
    return Number(value).toFixed(casasDecimais);
  }

  return (
    <div className="min-h-[594px] w-96 flex flex-col items-center border border-gray-300 p-2">
      <div className="flex flex-col items-center py-8">
        <h2 className="font-semibold text-3xl">{value && formatWalletEther(value)}ETH</h2>
        <p>$0.00 USD</p>
      </div>
      <div className="flex gap-2">
        <button className="flex flex-col items-center">
          <PlusMinus size={34} className="rounded-full bg-blue-500 text-white" />
          <p>Buy & Sell</p>
        </button>
        <button className="flex flex-col items-center" onClick={() => sendTx('0x19E059c9B1751aCeDd246f4212DF9fbb922FcE49', '0.001')}>
          <ArrowUpRight size={34} className="rounded-full bg-blue-500 text-white" />
          <p>Transfer</p>
        </button>
        <button className="flex flex-col items-center">
          <ChartLine size={34} className="rounded-full bg-blue-500 text-white" />
          <p>Portfolio</p>
        </button>
      </div>
      <div className="py-8 w-full">
        <nav className="flex gap-1 items-center w-full text-center cursor-pointer">
          <p className={`w-1/3 ${currentPage == 'tokens' && 'text-blue-500 border-b-2 border-blue-500'}`} onClick={() => setCurrentPage('tokens')}>Tokens</p>
          <p className={`w-1/3 ${currentPage == 'nft' && 'text-blue-500 border-b-2 border-blue-500'}`}  onClick={() => setCurrentPage('nft')}>NFT</p>
          <p className={`w-1/3 ${currentPage == 'activity' && 'text-blue-500 border-b-2 border-blue-500'}`}  onClick={() => setCurrentPage('activity')}>Activity</p>
        </nav>
        {currentPage == 'tokens' ? (<div className="w-full mt-2">
          <div className="flex w-full bg-slate-700 p-2">
            <div className="bg-gray-300 rounded-full">Image</div>
            <div className="flex justify-between w-full">
              <div className="ml-3 flex flex-col items-start">
                <h5>ETH</h5>
                <p>Ethereum</p>
              </div>
              <div className="flex  flex-col items-end">
                <h5>{value && formatWalletEther(value, 7)}ETH</h5>
                <p>$0.00 USD</p>
              </div>
            </div>
          </div>
        </div>) : currentPage == 'nft' ? (
          <Nftpageopt />
        ) : (
          <p>oi</p>
        )}
        
      </div>
    </div>
  )
}