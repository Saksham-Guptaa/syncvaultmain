"use client";
import React, { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { fetchUserTokens } from "@/utils/moralisHelpers";
import { prepareAndSendTransaction } from "@/utils/transactionHelpers";
import { FaArrowDown } from "react-icons/fa6";
import Moralis from "moralis";
import { getUser, getProfiles, walletConnect } from "thirdweb/wallets";
import { useThirdwebClients } from "@/app/context/ThirdwebClientContext";
import { useSendTransaction, useActiveAccount } from "thirdweb/react";
import { prepareTransaction, toWei } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import AuthGuard from "@/hoc/AuthGuard";

type Token = {
  name: string;
  address: string;
  img: string;
  quantity: number;
};
const WithdrawCrypto = () => {
  const router = useRouter();

  const active = useActiveAccount();

  const { client, serverClient } = useThirdwebClients();
  const {
    mutate: sendTx,
    data: transactionResult,
    error,
  } = useSendTransaction();

  const [selectedToken, setSelectedToken] = useState<any | null>(null);
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [withdrawalAddress, setWithdrawalAddress] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userTokens, setUserTokens] = useState<any[]>([]);
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const profiles = await getProfiles({ client });
        const user = await getUser({
          client: serverClient,
          email: profiles[0].details.email,
        });
        const address = user?.walletAddress ?? "";
        setWalletAddress(address);

        const tokens = await fetchUserTokens(
          address,
          process.env.MORALIS_API_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImRhNGVmZDMyLTA0N2EtNGRlNC1hNjJjLWEzZDRmN2U4M2ZiYiIsIm9yZ0lkIjoiNDIwODIxIiwidXNlcklkIjoiNDMyNzczIiwidHlwZUlkIjoiMDJhYWY0ZDAtNjM0YS00ZGYxLTkxZWQtYzNmNzRlOTRiNmYyIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MzQxNjc1MzEsImV4cCI6NDg4OTkyNzUzMX0.d6fJBCJ1vsvRb6v7_mFEjuX2dyBOROlXUkM8UFX8n54"
        );
        setUserTokens(tokens);
      } catch (error) {
        console.error("Error fetching tokens:", error);
      }
    };

    fetchTokens();
  }, [client, serverClient]);

  const handleWithdrawal = async () => {
    if (withdrawalAddress && withdrawalAmount) {
      await prepareAndSendTransaction(
        withdrawalAddress,
        withdrawalAmount,
        client,
        sendTx
      );
    }
  };

  // useEffect(() => {
  //   const fetchTokens = async () => {
  //     const profiles = await getProfiles({
  //       client,
  //     });

  //     const user = await getUser({
  //       client: serverClient,
  //       email: profiles[0].details.email,
  //     });
  //     const address = user?.walletAddress ?? "";
  //     setWalletAddress(address);

  //     try {
  //       if (!Moralis.Core.isStarted) {
  //         await Moralis.start({
  //           apiKey: process.env.MORALIS_API_KEY,
  //         });
  //       }

  //       //NATIVE
  //       const response =
  //         await Moralis.EvmApi.wallets.getWalletTokenBalancesPrice({
  //           // "chain": "0x2105",
  //           chain: "0x2105",
  //           address: address,
  //         });

  //       //Get other tokens
  //       const tokenResponse = await Moralis.EvmApi.token.getWalletTokenBalances(
  //         {
  //           chain: "0x2105",
  //           address: address,
  //         }
  //       );
  //       const tokenList = [...response.result, ...tokenResponse.result];
  //       console.log(tokenList);

  //       setUserTokens(tokenList);

  //       console.log(active);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   fetchTokens();
  // }, []);

  const handleAmountChange = (event: any) => {
    setWithdrawalAmount(event.target.value);
  };

  const handleAddressChange = (event: any) => {
    setWithdrawalAddress(event.target.value);
  };

  // const handleWithdrawal = async () => {
  //   const transaction = prepareTransaction({
  //     to: withdrawalAddress,
  //     value: toWei(withdrawalAmount),
  //     chain: baseSepolia,
  //     client,
  //   });

  //   sendTx(transaction, {
  //     onSuccess: (result) => {
  //       console.log("Transaction successful!", result);
  //     },
  //     onError: (err) => {
  //       console.error("Transaction failed!", err);
  //     },
  //   });
  // };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main Content */}
      <main className="p-6">
        {/* Header */}
        <div className="bg-black text-white min-h-screen p-4">
          {/* Header */}
          <div className="flex items-center mb-6">
            <button
              onClick={() => router.push("/wallet")}
              className="text-gray-400 border border-[#313335] p-1 mr-4"
            >
              <FiArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold">Withdraw Crypto</h1>
          </div>

          {/* Select Asset */}
          <div
            className="mb-6"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <h2 className="text-lg font-semibold mb-2">Select Asset</h2>
            <div className="flex items-center justify-between bg-[#131415] p-4 rounded-xl cursor-pointer relative">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-rose-500 mr-4">
                  {selectedToken && (
                    <img
                      src={selectedToken.logo}
                      alt={selectedToken.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  )}
                </div>
                <div>
                  <p className="font-semibold">
                    {selectedToken ? selectedToken.symbol : "Select your asset"}
                  </p>
                  {selectedToken && (
                    <p className="text-sm text-gray-400">
                      Quantity:{" "}
                      {parseFloat(
                        Number(selectedToken.balanceFormatted).toFixed(3)
                      )}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <FaArrowDown />
              </div>
            </div>

            {isDropdownOpen && (
              <div className="absolute right-[3%] bg-[#1a1b1c] mt-2 rounded-xl shadow-lg z-10">
                {userTokens.map((token) => (
                  <div
                    key={token.address}
                    className="flex items-center p-4 hover:bg-[#2c2d2e] cursor-pointer"
                    onClick={() => {
                      setSelectedToken(token);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <img
                      src={token.logo}
                      alt={token.symbol}
                      className="w-8 h-8 rounded-full mr-4"
                    />
                    <div>
                      <p className="font-semibold">{token?.symbol}</p>
                      <p className="text-sm text-gray-400">
                        Amount:{" "}
                        {parseFloat(Number(token?.balanceFormatted).toFixed(3))}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Enter Amount */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Enter Amount</h2>
            <input
              type="number"
              placeholder="Withdrawal Amount (Minimum: XX)"
              className="border border-[#131415] bg-transparent p-4 rounded-xl w-full text-white placeholder-gray-400 mb-2"
              onChange={handleAmountChange}
              value={withdrawalAmount}
            />
            <p className="text-sm text-gray-400">
              Available balance:{" "}
              {parseFloat(Number(selectedToken?.balanceFormatted).toFixed(3)) ??
                0}
            </p>
          </div>

          {/* Withdrawal Address */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Send to</h2>
            <input
              type="text"
              placeholder="Withdrawal Address"
              className="bg-transparent border border-[#131415] p-4 rounded-xl w-full text-white placeholder-gray-400"
              onChange={handleAddressChange}
              value={withdrawalAddress}
            />
          </div>

          {/* Proceed to Withdraw */}
          <button
            className={`bg-[#E9004C] w-full py-4 rounded-xl text-white font-semibold `}
            onClick={handleWithdrawal}
          >
            Proceed to Withdraw
          </button>
        </div>
      </main>
    </div>
  );
};

export default AuthGuard(WithdrawCrypto);
