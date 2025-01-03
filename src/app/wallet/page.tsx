"use client";
import React, {useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useThirdwebClients } from "../context/ThirdwebClientContext";
import { getProfiles, getUser } from "thirdweb/wallets";
import Moralis from 'moralis';
import AuthGuard from "@/hoc/AuthGuard";


type Token = {
  name: string;
  img: string;
};


const baseTokens = [
  {name: 'ETH', address: '0x464C8ec100F2F42fB4e42E07E203DA2324f9FC67', img:'https://s2.coinmarketcap.com/static/img/coins/64x64/31915.png'},
  {name: "USDC", address: '0x036CbD53842c5426634e7929541eC2318f3dCF7e', img: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png'},
  {name: "LINK", address: '0xE4aB69C077896252FAFBD49EFD26B5D171A32410', img:'https://cryptologos.cc/logos/chainlink-link-logo.png'},
  {name: "USDT", address: '0xd7e9C75C6C05FdE929cAc19bb887892de78819B7', img: 'https://cryptologos.cc/logos/tether-usdt-logo.png'},
  {name: "USDe", address: '0x28356C7B6087EebaFd1023D292eA9F5327e8F215', img: 'https://cryptologos.cc/logos/ethena-usde-usde-logo.png'},
  {name: "wstETH", address: '0x13e5FB0B6534BB22cBC59Fae339dbBE0Dc906871', img: 'https://assets.coingecko.com/coins/images/18834/standard/wstETH.png'}

]

const WalletPage: React.FC = () => {
  const {client, serverClient} = useThirdwebClients()
  const [activeTabCurrency, setActiveTabCurrency] = useState("crypto");
  const [activeTab, setActiveTab] = useState("Overview"); // quests, staking-polls, voting-polls
  const [walletAddress, setWalletAddress] = useState<string>('')
  const router = useRouter();
  const [showSettings, setShowSettings] = useState(false); // State to toggle settings view
  const [netWorth, setNetWorth] = useState(0);
  const [tokens, setTokens] = useState<any[]>([])
  const [transactionList, setTransactionList] = useState<any[]>([])

  useEffect(() => {   
        const effect = async() =>{
          const profiles = await getProfiles({
            client,
          })

          const user = await getUser({
                client: serverClient,
                email: profiles[0].details.email,
              });
          const address = user?.walletAddress ?? '';
          console.log(address);
          
          setWalletAddress(address);
          
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
            const usd = nativeTokenBalance.result[0].usdValue ?? 0;
            const tokenList = [ ...nativeTokenBalance.result, ...nonNativeTokens.result]
            

            // const nativeTransactions = await Moralis.EvmApi.transaction.getWalletTransactionsVerbose({
            //   "chain": "0x2105",
            //   "order": "DESC",
            //   "address": "0xD3b68E5b7A8d60876c27F1aC753aB50C7Ee0e6b4"
            // });


            const nativeTransactions = await Moralis.EvmApi.transaction.getWalletTransactions({
              "chain": "0x2105",
              "order": "DESC",
              "address": address
            });

            console.log(nativeTransactions.result[0]?.value?.ether);
            


            const transactions = await Moralis.EvmApi.token.getWalletTokenTransfers({
              "chain": "0x2105",
              "order": "DESC",
              "address": address
            });
            

            const list = [...nativeTransactions.result, ...transactions.result ]
            console.log(list);
            
            setTransactionList(list)

            // const responseMainnet = await Moralis.EvmApi.wallets.getWalletNetWorth({
            //   "chains": [
            //     "0x2105",
            //     "0x2105"
            //   ],
            //   "excludeSpam": true,
            //   "excludeUnverifiedContracts": true,
            //   "address": address
            // });
            setNetWorth(usd)            
            setTokens(tokenList);
          
          } catch (e) {
            console.error(e);
          }
      }
      effect();
      }, []);

      const [selectedToken, setSelectedToken] = useState<Token>(baseTokens[0]);
      const [isDropdownOpen, setIsDropdownOpen] = useState(false);
      const [isDropdownOpenTo, setIsDropdownOpenTo] = useState(false);
      const [selectedTokenTo, setSelectedTokenTo] = useState<Token>(baseTokens[0]);


  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sidebar */}

      {/* Main Content */}
      <main className=" p-6">
        {/* Header */}

        {/* My Participations Section */}
        <div className="flex justify-between mt-10 items-center mb-6">
          <h1 className="text-2xl font-bold">My Wallet</h1>
          <button className="bg-[#E9004C] text-white px-4 py-2 rounded-md">
          Buy $SVTS Tokens
          </button>
        </div>
        {/* Tabs */}
        <div className="flex space-x-6 border-b border-gray-700">
          {["Overview", "Transaction History"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 ${
                activeTab === tab
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-gray-400"
              }`}
            >
              {tab
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </button>
          ))}
        </div>
        {/* Content Based on Tabs */}
        {activeTab === "Overview" && (
          <>
            {/* Sub-Tabs */}
            <div className="bg-black text-white min-h-screen py-6">
      {/* Toggle Buttons */}
      <div className="flex gap-2 mb-6">
        <button
          className={`px-4 w-[50%] lg:w-36 py-2 rounded-md ${
            activeTabCurrency === "crypto" ? "bg-[#3A0013] border border-[#AF0039] text-white" : "border border-[#313335] text-gray-300"}`}
          onClick={() => setActiveTab("crypto")}
        >
          Crypto
        </button>

      </div>

      {activeTabCurrency === "crypto" ? (
        <>
          {/* Balance Section */}
          <div className="bg-[#0A0A0A] rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold">Total Balance</h2>
            <p className="text-3xl font-bold mt-2">${netWorth}</p>
            <p className={`${tokens[0]?.usdPrice24hrPercentChange > 0 ? 'text-green-500' : 'text-red-500'} text-sm mt-1`}>{parseFloat(Number(tokens[0]?.usdPrice24hrPercentChange).toFixed(2)) ?? 0}% in last 24 hours</p>
            {/* Action Buttons */}
            <div className="flex justify-between mt-6">
              <button onClick={() => router.push("/wallet/send")} className="bg-[#FFFFFF] text-black w-full py-2 rounded mx-1">Send</button>
              <button  onClick={() => router.push("/wallet/deposit")} className="bg-[#FFFFFF] text-black w-full py-2 rounded mx-1">Deposit</button>
              <button onClick={() => router.push("/wallet/swap")} className="bg-[#FFFFFF] text-black w-full py-2 rounded mx-1">Convert</button>
            </div>
          </div>
          {/* Assets Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Assets</h2>
            {tokens.map((token, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b-2 border-[#27292B] p-4 mb-4"
              >
                <div className="flex items-center">
                  <img
                    className= "w-8 h-8 rounded-full mr-4 " src={token.logo}
                  ></img>
                  <div>
                    <p className="font-semibold">{token.name}</p>
                    <p className="text-sm text-gray-400">{parseFloat(Number(token.balanceFormatted).toFixed(6))} {token.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${parseFloat(Number(token.usdValue).toFixed(2)) ?? 0}</p>
                  <p className={`${token.usdPrice24hrPercentChange > 0 ? 'text-green-500' : 'text-red-500'} text-sm`}>{parseFloat(Number(token.usdPrice24hrPercentChange).toFixed(2)) ?? 0}%</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center mt-20">
          <h2 className="text-2xl font-semibold">Coming Soon</h2>
          <p className="text-gray-400 mt-2">Fiat dashboard is under development.</p>
        </div>
      )}
    </div>
          </>
        )}
    
        {activeTab === "Transaction History" && (
          <div className="min-h-screen bg-black text-white p-4">
          {transactionList.map((transaction, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 mb-2 bg-gray-800 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    transaction.toAddress ?? transaction.to._value === walletAddress
                      ? "bg-green-500"
                      : transaction.fromAddress ?? transaction.from._value === walletAddress
                      ? "bg-red-500"
                      : "bg-green-500"
                  }`}
                >
                  {transaction.toAddress ?? transaction.to._value === walletAddress ? (
                    <span className="text-xl">↑</span>
                  ) : (
                    <span className="text-xl">↓</span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    {
                    // transaction.type === "deposit"
                    //   ? `Deposited ${transaction.amount}$${transaction.currency}`
                    //   : 
                      transaction.fromAddress ?? transaction.from === walletAddress
                      ? `Sent ${transaction.value?.ether ?? parseFloat((Number(transaction.value.rawValue) / 1e18).toFixed(2))}       ${transaction.tokenSymbol}`
                      : `Received ${transaction.value?.ether ?? parseFloat((Number(transaction.value) / 1e18).toFixed(2))}       ${transaction.tokenSymbol?? 'ETH'}`}
                  </p>
                  {/* <p className="text-xs text-gray-400">{transaction._data.blockTimestamp}</p> */}
                </div>
              </div>
              <div>
                <a
                  href={`https://sepolia.basescan.org/tx/${transaction.transactionHash ?? transaction.hash}`}
                  target="_blank"
                  className="text-gray-400 hover:text-white"
                  aria-label="View details"
                >
                  ↗
                </a>
              </div>
            </div>
          ))}
        </div>
        )}
      </main>
    </div>
  );
};
export default AuthGuard(WalletPage);
