"use client"
import { ArrowUpRight, ChartLine, PlusMinus } from "@phosphor-icons/react";

export default function YourWallet() {
  return (
    <div className="min-h-[594px] w-96 flex flex-col items-center border border-gray-300 p-2">
      <div className="flex flex-col items-center py-8">
        <h2 className="font-semibold text-3xl">0.000001ETH</h2>
        <p>$0.00 USD</p>
      </div>
      <div className="flex gap-2">
        <button className="flex flex-col items-center">
          <PlusMinus size={34} className="rounded-full bg-blue-500 text-white" />
          <p>Buy & Sell</p>
        </button>
        <button className="flex flex-col items-center">
          <ArrowUpRight size={34} className="rounded-full bg-blue-500 text-white" />
          <p>Transfer</p>
        </button>
        <button className="flex flex-col items-center">
          <ChartLine size={34} className="rounded-full bg-blue-500 text-white" />
          <p>Portfolio</p>
        </button>
      </div>
      <div className="py-8 w-full">
        <nav className="flex gap-1 items-center w-full text-center">
          <p className="w-1/3 text-blue-500 border-b-2 border-blue-500">Tokens</p>
          <p className="w-1/3">NFT</p>
          <p className="w-1/3">Activity</p>
        </nav>
        <div className="w-full mt-2">
          <div className="flex w-full bg-slate-700 p-2">
            <div className="bg-gray-300 rounded-full">Image</div>
            <div className="flex justify-between w-full">
              <div className="ml-3 flex flex-col items-start">
                <h5>ETH</h5>
                <p>Ethereum</p>
              </div>
              <div className="flex  flex-col items-end">
                <h5>0.000001ETH</h5>
                <p>$0.00 USD</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}