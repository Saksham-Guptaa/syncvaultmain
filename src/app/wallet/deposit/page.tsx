"use client";
import React, {useEffect, useState} from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { getProfiles, getUser } from "thirdweb/wallets";
import { useThirdwebClients } from "@/app/context/ThirdwebClientContext";
import QRCode from 'react-qr-code';
import AuthGuard from "@/hoc/AuthGuard";

const WalletPage: React.FC = () => {
  const router = useRouter();
  const {client, serverClient} = useThirdwebClients()
  const [walletAddress, setWalletAddress] = useState('')
  const [copied, setCopied] = useState(false);


  useEffect(()=>{
    const getWalletAddress = async() =>{
      const profiles = await getProfiles({
        client,
      })

      const user = await getUser({
            client: serverClient,
            email: profiles[0].details.email,
          });
      const address = user?.walletAddress ?? '';
      setWalletAddress(address)
  }
  getWalletAddress()
}, [])

const copyWalletAddressToClipboard = () => {
  navigator.clipboard.writeText(walletAddress).then(
    () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    },
    (err) => {
      console.error("Failed to copy text: ", err);
    }
  );
};

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main Content */}
      <main className="p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.push("/wallet")}
            className="text-gray-400 border border-[#313335] p-2 rounded-lg mr-4"
          >
            <FiArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold">Deposit Crypto</h1>
       
        </div>

        {/* Select Asset */}
        {/* <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Select Asset</h2>
          <div className="flex items-center bg-[#131415] p-4 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-rose-500 mr-4"></div>
            <div>
              <p className="font-semibold">SyncVault $SVT</p>
              <p className="text-sm text-gray-400">Price of token here</p>
            </div>
          </div>
        </div> */}

        {/* Select Network */}

        {/* Deposit Details */}
        <div className="border border-[#313335] flex flex-col md:flex-row p-6 items-center space-y-6 md:space-y-0 md:space-x-10 rounded-xl mb-6">
          {/* QR Code */}
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-lg">
              <div className="w-24 h-24 bg-gray-300">
              <QRCode
                        // title="GeeksForGeeks"
                        value={`ethereum:${walletAddress}`}
                        bgColor='#FFFFFF'
                        fgColor='#000000'
                        style={{ width: "100%", height: "100%" }}
                    />
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-4 text-center md:text-left">
            <p className="text-sm text-gray-400">
              Send only ERC20 to this address.
            </p>
            <p className="text-sm">
              Ensure the network is
              <span className="text-rose-500"> BASE</span>
            </p>
            {/* <p className="text-sm">Minimum Deposit: 0.00000001 USDT</p> */}
            {/* <p className="text-sm">
              Expected arrival & unlock: 15 Network Confirmations
            </p> */}
          </div>
        </div>

        {/* Deposit Address */}
        <div className="border border-[#313335] p-4 rounded-xl flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p className="text-sm text-gray-400 break-all">
            {walletAddress}
          </p>
        <button className="border border-[#313335] px-4 py-2 rounded text-sm"
        onClick={copyWalletAddressToClipboard}
        >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default AuthGuard(WalletPage);
