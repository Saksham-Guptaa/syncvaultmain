"use client"
import { useThirdwebClients } from '@/app/context/ThirdwebClientContext';
import Settings from '@/Components/Settings';
import AuthGuard from '@/hoc/AuthGuard';
import {useRouter} from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi';
import { getBuyWithCryptoQuote } from 'thirdweb';
import { GetBuyWithCryptoQuoteParams } from 'thirdweb';
import { getUser, getProfiles } from 'thirdweb/wallets';
import { useBuyWithCryptoQuote } from 'thirdweb/react';
import Moralis from 'moralis';

type Token = {
    name: string;
    img: string;
    address: string;
  };

  const baseTokens = [
    {name: 'ETH', address: '0x464C8ec100F2F42fB4e42E07E203DA2324f9FC67', img:'https://s2.coinmarketcap.com/static/img/coins/64x64/31915.png'},
    {name: "USDC", address: '0x036CbD53842c5426634e7929541eC2318f3dCF7e', img: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png'},
    {name: "LINK", address: '0xE4aB69C077896252FAFBD49EFD26B5D171A32410', img:'https://cryptologos.cc/logos/chainlink-link-logo.png'},
    {name: "USDT", address: '0xd7e9C75C6C05FdE929cAc19bb887892de78819B7', img: 'https://cryptologos.cc/logos/tether-usdt-logo.png'},
    {name: "USDe", address: '0x28356C7B6087EebaFd1023D292eA9F5327e8F215', img: 'https://cryptologos.cc/logos/ethena-usde-usde-logo.png'},
    {name: "wstETH", address: '0x13e5FB0B6534BB22cBC59Fae339dbBE0Dc906871', img: 'https://assets.coingecko.com/coins/images/18834/standard/wstETH.png'}
  ]

const Page: React.FC = () => {
  const buyWithCryptoQuote = useBuyWithCryptoQuote()
  const BuyWithCryptoQuote = getBuyWithCryptoQuote


  const router = useRouter();
          const {client,serverClient} = useThirdwebClients()
          const [tokenHoldings, setTokenHoldings] = useState<any>(null)
          const [selectedToken, setSelectedToken] = useState<any>(null);
          const [isDropdownOpen, setIsDropdownOpen] = useState(false);
          const [isDropdownOpenTo, setIsDropdownOpenTo] = useState(false);
          const [selectedTokenTo, setSelectedTokenTo] = useState<Token>(baseTokens[0]);
          const [showSettings, setShowSettings] = useState(false); // State to toggle settings view
          const [fromAmount, setFromAmount] =useState('')
          const [toAmount, setToAmount] = useState('');
          const [walletAddress, setWalletAddress] = useState('')
          const [customToken, setCustomToken] = useState('')


  const handleFromChange = async(event: any) =>{
    setFromAmount(event.target.value)
    // const quote = await getBuyWithCryptoQuote({
      // client,
      // fromAddress: walletAddress, // wallet address
      // fromChainId: 8453, // chain id of the source token
      // fromTokenAddress: selectedToken.address, // token address of the source token
      // fromAmount: fromAmount, // amount of source token to swap
      // // optionally, you can use `toAmount` instead if you only want a certain amount of destination token
      // toChainId: 8453, // chain id of the destination token
      // toTokenAddress: selectedTokenTo.address, // token address of the destination token
      // toAddress: walletAddress, // optional: send the tokens to a different address
      // // maxSlippageBPS: 50, // optional: max 0.5% slippage
    //  });
    // const quote = GetBuy
    console.log({
      client,
      fromAddress: walletAddress, // wallet address
      fromChainId: 1, // chain id of the source token
      fromTokenAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7', // token address of the source token
      fromAmount: fromAmount, // amount of source token to swap
      // optionally, you can use `toAmount` instead if you only want a certain amount of destination token
      toChainId: 1, // chain id of the destination token
      toTokenAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // token address of the destination token
      toAddress: walletAddress, // optional: send the tokens to a different address
      // maxSlippageBPS: 50, // optional: max 0.5% slippage
    });
    
    const quote = await BuyWithCryptoQuote({
      client,
      fromAddress: walletAddress, // wallet address
      fromChainId: 1, // chain id of the source token
      fromTokenAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7', // token address of the source token
      fromAmount: fromAmount, // amount of source token to swap
      // optionally, you can use `toAmount` instead if you only want a certain amount of destination token
      toChainId: 1, // chain id of the destination token
      toTokenAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // token address of the destination token
      toAddress: walletAddress, // optional: send the tokens to a different address
      // maxSlippageBPS: 50, // optional: max 0.5% slippage
    })
    const qq = await quote;
     console.log(qq);
     
  }

  const handleToChange = (event: any) => {
    setToAmount(event.target.value)
  }

  useEffect(()=>{
      const fetchTokens = async() =>{
  
  
        const profiles = await getProfiles({
                    client,
                  })
        
                  const user = await getUser({
                        client: serverClient,
                        email: profiles[0].details.email,
                      });
                  const address = user?.walletAddress ?? '';
                  setWalletAddress(address)


                  const moralisApi = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjMxN2UzY2MxLWY2ODEtNDIyMC1hMjYwLTMwZTc5NTg5MjBjMyIsIm9yZ0lkIjoiNDIxMjczIiwidXNlcklkIjoiNDMzMjM5IiwidHlwZUlkIjoiNGRjNmEzYWQtYzdlZS00YjdjLTg4OWUtOWRiYTkxYTY2MzlhIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MzQ0NDIxMTIsImV4cCI6NDg5MDIwMjExMn0.MQuGHL2RuDcGvjTM5lLck9EZA30wMQpNkw4DiXgcR08'
          try {
            if (!Moralis.Core.isStarted) {
              await Moralis.start({
                apiKey: process.env.MORALIS_API_KEY || moralisApi,
              });
            }
            
            //NATIVE
            const nativeTokenBalance = await Moralis.EvmApi.wallets.getWalletTokenBalancesPrice({
              // "chain": "0x2105",
              "chain": "0x2105",
              "address": address
            });           
            

            //Get other tokens
            const nonNativeTokens = await Moralis.EvmApi.token.getWalletTokenBalances({
              "chain": "0x2105",
              "address": address
            });
            const tokenList = [ ...nativeTokenBalance.result, ...nonNativeTokens.result]
            console.log(tokenList);
            

            setTokenHoldings(tokenList)
          } catch (e) {
            console.error(e);
          }
                    }
                    fetchTokens()
                  },[])



    
  return (
    <div className=" bg-black min-h-screen flex justify-center items-center p-4">
            {showSettings ? (
        <Settings/>
      ) : (
           <div className="w-full  bg-[#131415] text-white rounded-xl p-6 space-y-6 shadow-lg">
             {/* Header */}
                      <div className="flex items-center mb-6">
                         <button
                           onClick={() => router.push("/wallet")}
                           className="text-gray-400 border border-[#313335] p-1 mr-4"
                         >
                           <FiArrowLeft size={24} />
                         </button>
                         <h1 className="text-2xl font-bold">Swap Crypto</h1>
                       </div>

             <div className="flex justify-between items-center">
               <h1 className="text-xl font-bold">Swap</h1>
               <button onClick={() => setShowSettings(true)} 
                 className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"
                 aria-label="Settings"
               >
                 ⚙️
               </button>
             </div>
     
             {/* From Section */}
             <div className="bg-[#1E1F20] rounded-lg p-2 space-y-2">
      <label className="text-gray-400 text-sm">From</label>
      <div className="flex flex-col relative">
        {/* Input Section */}
        <div className="flex items-center rounded-lg px-4 py-3 space-x-3">
          <input
            type="number"
            placeholder="0"
            className="bg-transparent text-lg w-full focus:outline-none placeholder-gray-500"
            onChange={handleFromChange}
          />
          <div className="text-right">
            <p className="text-gray-400 text-xs">Balance: 0.00</p>
          </div>
          <button className="bg-[#1E1F20] px-3 py-1 rounded-lg text-sm hover:bg-gray-600">
            Use Max
          </button>
          {/* Dropdown Trigger */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            { !selectedToken ?
            (<>Select</>)
            : (<><img
              src={selectedToken.logo}
              alt={`${selectedToken.name} Icon`}
              className="w-6 h-6 rounded-full"
            />
            <p>{selectedToken.symbol}</p></>)
}
          </div>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-full mt-2 left-0 right-[1%] bg-[#2c2d2e] rounded-lg shadow-lg z-10">
            {tokenHoldings?.map((token: any) => (
              <div
                key={token.symbol}
                className="flex  items-center p-3 hover:bg-gray-700 cursor-pointer space-x-3"
                onClick={() => {
                  setSelectedToken(token);
                  setIsDropdownOpen(false);
                }}
              >
                <img
                  src={token.logo}
                  alt={`${token.name} Icon`}
                  className="w-6 h-6 rounded-full"
                />
                <p className="text-white">{token.symbol} <span className='text-gray-500'>({token.balanceFormatted})</span></p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
     
             {/* Swap Button */}
             <div className="flex justify-center">
               <button className="px-5 py-3 bg-[#E9004C] rounded-lg text-white shadow-lg">
                 🔃
               </button>
             </div>
     
             {/* To Section */}
             <div className="bg-[#1E1F20] rounded-lg p-2 space-y-2">
      <label className="text-gray-400 text-sm">To</label>
      <div className="flex flex-col relative">
        {/* Input Section */}
        <div className="flex items-center rounded-lg px-4 py-3 space-x-3">
          <input
            type="number"
            placeholder="0"
            className="bg-transparent text-lg w-full focus:outline-none placeholder-gray-500"
            onChange={handleToChange}
          />
          <div className="text-right">
            <p className="text-gray-400 text-xs">Balance: 0.00</p>
          </div>

          {/* Dropdown Trigger */}
          <div
            className="flex pr-4 items-center space-x-2 cursor-pointer"
            onClick={() => setIsDropdownOpenTo(!isDropdownOpenTo)}
          >
            <img
              src={selectedTokenTo.img}
              alt={`${selectedTokenTo.name} Icon`}
              className="w-6 h-6 rounded-full"
            />
            <p>{selectedTokenTo.name}</p>
          </div>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpenTo && (
          <div className="absolute top-full  left-0 right-[1%] bg-[#2c2d2e] rounded-lg shadow-lg z-10">
            <form className='flex flex-row' onSubmit={(e)=>{
              e.preventDefault();
              setSelectedTokenTo({address: customToken, name: 'Token', img: '/hehe'})
              setIsDropdownOpenTo(false)
          }}>
            <input
                className="flex w-full items-center p-3 bg-gray-700 space-x-3"
                placeholder='Enter Token Address'
                value={customToken}
                onChange={(e) =>{setCustomToken(e.target.value)}}
              >
              </input>
              <button className='p-2' type='submit'>Select</button>
              </form>
            {baseTokens.map((token) => (
              <div
                key={token.name}
                className="flex items-center p-3 hover:bg-gray-700 cursor-pointer space-x-3"
                onClick={() => {
                  setSelectedTokenTo(token);
                  setIsDropdownOpenTo(false);
                }}
              >
                <img
                  src={token.img}
                  alt={`${token.name} Icon`}
                  className="w-6 h-6 rounded-full"
                />
                <p className="text-white">{token.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
     
             {/* Slippage Tolerance */}
             <div className="flex justify-between items-center">
               <p className="text-gray-400 text-sm">Slippage Tolerance</p>
               <p>1%</p>
             </div>
     
             {/* View Summary Button */}
             <button className="w-full bg-[#E9004C] text-white py-3 rounded-lg font-semibold hover:bg-pink-600">
               View Summary
             </button>
           </div>
             )}
         </div>
  )
}

export default AuthGuard(Page)