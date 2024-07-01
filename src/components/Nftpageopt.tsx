import { AuthContext } from "@/context/AuthContext"
import { useContext } from "react"



export default function Nftpageopt({}) {
  const {NFTs} = useContext(AuthContext)

  return (
    <>  
      {NFTs.totalCount < 1 ? (
          <div>
            <p>You don't have any NFTs yet!</p>
          </div>
        ) : (
          <div>
            {NFTs.ownedNfts.map((nft: any) => {
              return (  
                <div>
                  
                </div>
              )
            })}
          </div>
        )
      }
    </>
  )
}