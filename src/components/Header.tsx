'use client'
import { useContext } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/Select";
import { AuthContext } from "@/context/AuthContext";

export default function Header({}) {
  const {wallet} = useContext(AuthContext)

  function formatWalletAddress(address: string) {
    if (!address) return '';
    return address.substring(0, 6) + '...' + address.substring(address.length - 4);
  }

  return (
    <div className="min-h-24 w-96 flex items-center justify-between gap-12 border border-gray-300 border-b-0">
      {
        !!wallet ? ( 
          <>
            <div className="ml-2 w-1/3">
              <Select>
                <SelectTrigger className="max-w-full">
                  <SelectValue placeholder="Select network" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Mainnet Ethereum">Mainnet Ethereum</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

                <div className="flex flex-col items-center w-1/3">
                  <p>Address:</p>
                  <p>{formatWalletAddress(wallet)}</p>
                </div>
              
            <div className="w-1/3">
              Logo
            </div>
          </>
          ) : ( // Deveria fazer pela rota, ou trocar a primeira page para fazer por wallet ativa
            <>
              <div className="ml-2 w-2/3">
                <Select>
                  <SelectTrigger className="max-w-full">
                    <SelectValue placeholder="Select network" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Mainnet Ethereum">Mainnet Ethereum</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-1/3">
                Logo
              </div>
            </>
          )}
    </div>
  )
}