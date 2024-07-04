'use client'
import { useContext } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/Select";
import { AuthContext } from "@/context/AuthContext";
import { Copy } from "@phosphor-icons/react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover";

export default function Header({}) {
  const {wallet} = useContext(AuthContext)

  function formatWalletAddress(address: string) {
    if (!address) return '';
    return address.substring(0, 6) + '...' + address.substring(address.length - 4);
  }

  function copyText(entryText: string){
    navigator.clipboard.writeText(entryText);
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

            <Popover>
              <PopoverTrigger asChild>
                <div className="flex flex-col items-center w-1/3 cursor-pointer" onClick={() => copyText(wallet.address)}>
                  <div className="flex">
                    <p className="text-black mr-2">Address:</p>
                    <Copy className="text-gray-500" size={18} />
                  </div>
                  <p>{formatWalletAddress(wallet.address)}</p>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-fit p-1 bg-green-200">
                <p>Copied!</p>
              </PopoverContent>
            </Popover>
                
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