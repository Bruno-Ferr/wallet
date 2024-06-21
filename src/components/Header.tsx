import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/Select";

export default function Header({}) {
  return (
    <div className="min-h-24 w-96 flex items-center justify-between border border-gray-300 border-b-0">
      <div className="ml-2">
        <Select>
          <SelectTrigger className="w-56">
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
      <div className="mr-2">
        Logo
      </div>
    </div>
  )
}