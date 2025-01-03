"use client";
import Cookies from "js-cookie";
import { useAuth } from "@/app/context/AuthContext";
import { useThirdwebClients } from "@/app/context/ThirdwebClientContext";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AiOutlineBank,
  AiOutlineHome,
  AiOutlinePieChart,
} from "react-icons/ai";
import {
  HiMiniScale,
  HiOutlineFire,
  HiOutlinePause,
  HiOutlinePuzzlePiece,
  HiOutlineReceiptPercent,
} from "react-icons/hi2";
import { getProfiles } from "thirdweb/wallets";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const isActiveHome = pathname === "/";
  const [profiles, setProfiles] = useState<Record<string, any> | null>(null); // State to store profiles as an object
  const [showLogout, setShowLogout] = useState(false);
  const isParticipationActive = pathname === "/participation";
  const stakingFeatureActive = pathname === "/staking";
  const isVotingActive = pathname === "/voting";
  const isQuestActive =
    pathname === "/quest" || /^\/quest\/\d+$/.test(pathname);
  const { logout, authToken, expirationInSeconds } = useAuth();

  const toggleLogout = () => {
    setShowLogout((prevState) => !prevState);
  };
  const { client, serverClient } = useThirdwebClients();

  const [isStakingModalVisible, setStakingModalVisible] = useState(false); // State to track modal visibility

  const handleStakingLinkClick = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent default navigation
    setStakingModalVisible(true); // Open the modal
  };

  const closeStakingModal = () => {
    setStakingModalVisible(false); // Close the modal
  };

  useEffect(() => {
    const effect = async () => {
      // router.push("/home");
      // const acc = wallet.getAccount();
      // console.log(wallet, acc);
      const profiles = await getProfiles({
        client,
      });
      setProfiles(profiles[0]);
      console.log(profiles[0]);
    };
    effect();
  }, [router]);

  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility

  const handleLinkClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the default link behavior
    setIsModalOpen(true); // Open the modal
  };

  const handleClose = () => {
    setIsModalOpen(false); // Close the modal
  };

  const getInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  const profile = profiles;
  const name = profile?.details?.name || "Unknown User";
  const email = profile?.details?.email || "No email available";
  const imageUrl = profile?.details?.picture || "/default-avatar.png";
  const [isWeb3Enabled, setIsWeb3Enabled] = useState(true);
  const handleToggle = () => {
    if (isWeb3Enabled) {
      const secureFlag = location.protocol === "https:" ? "Secure;" : "";
      document.cookie = `auth._token.local=${authToken}; path=/; ${secureFlag} SameSite=Strict;`;
      document.cookie = `auth._token_expiration.local=${expirationInSeconds}; path=/; ${secureFlag} SameSite=Strict;`;
      document.cookie = `auth.strategy=local; path=/; ${secureFlag} SameSite=Strict;`;
      window.location.href = "https://syncvault.com/";
    } else {
      setIsWeb3Enabled(true);
    }
  };
  return (
    <div className=" hidden  lg:block fixed  top-0 left-0 h-screen bg-[#0A0A0A] w-72 p-6 overflow-y-auto no-scrollbar z-40">
      {/* Logo Section */}

      <Link href="/" className="flex items-center mb-8">
        <img src="/logo.svg" alt="SyncVault" className="h-8" />
        <span className="ml-2 text-white font-space-grotesk font-semibold text-lg leading-[24px]">
          SyncVault
        </span>
      </Link>
      {/* Web3 Mode Switch */}
      <div className="text-white p-3 rounded-lg mb-6">
        <div className="flex items-center justify-center relative">
          {/* Video element */}
          <video
            className=" left-0 top-0 w-10 rounded-full h-full object-cover bgonly"
            autoPlay
            loop
            muted
          >
            <source src="/logoonly.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Text and Switch */}
          <p className="  text-center z-1 space-grotesk text-base">Web3 Mode</p>
          <div className="p-4">
            <label className="relative inline-flex items-center cursor-pointer ml-4 z-10">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isWeb3Enabled}
                onChange={() => {
                  setIsWeb3Enabled(!isWeb3Enabled);
                  handleToggle();
                }}
              />
              <div className="w-14 h-8 bg-[#1e1e1e] border border-gray-700 rounded-full peer-checked:bg-[#E9004C]"></div>
              <span className="absolute left-1 top-1.5 w-5 h-5 bg-white rounded-full transition-all peer-checked:translate-x-6"></span>
            </label>
          </div>
        </div>
      </div>

      {/* Navigation - Get Started */}
      <nav className="pb-4 mt-6 border-t border-[#1E1F20] pt-4">
        <ul className="space-y-4">
          <li className="font-body text-white text-sm font-extralight text-caption">
            GET STARTED
          </li>
          <li>
            <Link
              href="/"
              className={`flex items-center py-2 px-3 rounded-lg w-full 
          ${isActiveHome ? "bg-[#3A0013] text-white" : "hover:bg-[#3A0013] "}
        `}
            >
              <AiOutlineHome
                className={`w-5   h-5   ${
                  isActiveHome ? "text-white" : "text-white"
                }`}
              />
              <span
                className={`ml-4 font-body text-sm font-light 
            ${isActiveHome ? "text-white" : "text-white"}
          `}
              >
                Home
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/quest"
              className={`flex items-center py-2 px-3 rounded-lg w-full 
            ${isQuestActive ? "bg-[#3A0013] white" : "hover:bg-[#3A0013] "}
          `}
            >
              <HiOutlinePuzzlePiece
                className={`w-5  h-5  ${
                  isQuestActive ? "text-white" : "text-white"
                }`}
              />
              <span
                className={`ml-4 font-body text-sm font-light 
              ${isQuestActive ? "text-white" : "text-white"}
            `}
              >
                Quests
              </span>
            </Link>
          </li>

          <li>
            <a
              href="/staking"
              className={`flex relative items-center py-2 px-3 rounded-lg w-full 
          ${
            stakingFeatureActive ? "bg-[#3A0013] white" : "hover:bg-[#3A0013] "
          }`}
              onClick={handleStakingLinkClick} // Show modal on click
            >
              <HiOutlineFire
                className={`w-5   h-5   ${
                  stakingFeatureActive ? "text-white" : "text-white"
                }`}
              />
              <span
                className={`ml-4 font-body text-sm font-light 
            ${stakingFeatureActive ? "text-white" : "text-white"}`}
              >
                Staking Pools{" "}
                <span className="text-xs text-red-500">(Coming Soon)</span>
              </span>
            </a>

            {/* Modal */}
            {isStakingModalVisible && (
              <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
                <div className="bg-black text-white p-6 rounded-lg shadow-lg w-[90%] max-w-md relative">
                  {/* Close Button */}
                  <button
                    className="absolute top-4 right-4 text-gray-300 hover:text-white"
                    onClick={closeStakingModal}
                  >
                    ✖
                  </button>

                  {/* Modal Content */}
                  <h2 className="text-2xl font-bold mb-4">
                    Staking Pools Coming Soon
                  </h2>
                  <p className="mb-6 text-gray-300">
                    To get early access to Staking Pools, click on “Notify Me”.
                  </p>
                  <button className="w-full py-2 rounded bg-[#E9004C] text-white font-bold">
                    Notify Me
                  </button>
                </div>
              </div>
            )}
          </li>

          <li>
            <a
              href="/voting"
              className={`flex relative items-center py-2 px-3 rounded-lg w-full 
          ${isVotingActive ? "bg-[#3A0013] white" : "hover:bg-[#3A0013] "}`}
              onClick={handleLinkClick} // Trigger modal on click
            >
              <HiMiniScale
                className={`w-5 h-5 ${
                  isVotingActive ? "text-white" : "text-white"
                }`}
              />
              <span
                className={`ml-4 font-body text-sm font-light 
            ${isVotingActive ? "text-white" : "text-white"}`}
              >
                Voting Polls{" "}
                <span className="text-xs text-red-500">(Coming Soon)</span>
              </span>
            </a>

            {/* Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
                <div className="bg-black text-white p-6 rounded-lg shadow-lg w-[90%] max-w-md relative">
                  {/* Close Button */}
                  <button
                    className="absolute top-4 right-4 text-gray-300 hover:text-white"
                    onClick={handleClose}
                  >
                    ✖
                  </button>

                  {/* Modal Content */}
                  <h2 className="text-2xl font-bold mb-4">
                    Voting Polls Coming Soon
                  </h2>
                  <p className="mb-6 text-gray-300">
                    To get early access to Voting Polls click on “Notify Me”.
                  </p>
                  <button className="w-full py-2 rounded bg-[#E9004C] text-white font-bold">
                    Notify Me
                  </button>
                </div>
              </div>
            )}
          </li>
          <li>
            <Link
              href="/participation"
              className={`flex items-center py-2 px-3 rounded-lg w-full 
            ${
              isParticipationActive
                ? "bg-[#3A0013] text-white"
                : "hover:bg-[#3A0013] hover:text-white"
            }
          `}
            >
              <HiOutlineReceiptPercent
                className={`w-5 h-5 ${
                  isParticipationActive ? "text-white" : "text-white"
                }`}
              />
              <span
                className={`ml-4 font-body text-sm font-light 
              ${isParticipationActive ? "text-white" : "text-white"}
            `}
              >
                My Participations
              </span>
            </Link>
          </li>
        </ul>
      </nav>
      {authToken ? (
        <div className="border-t  w-60   fixed bottom-10 border-[#131415] pt-4 mt-4">
          <div
            onClick={toggleLogout}
            className="cursor-pointer flex items-center bg-[#131415] border border-gray-700 p-3 rounded-md"
          >
            <div className="h-10 w-10 rounded-full bg-blue-500  flex items-center justify-center text-white font-bold">
              {imageUrl ? (
                <span>{getInitial(name)}</span>
              ) : (
                <span>{getInitial(name)}</span>
              )}
            </div>{" "}
            <div className="ml-4">
              <p className="text-sm text-white font-roboto font-normal">
                {name}
              </p>
              {/* <p className="text-xs text-white font-roboto">
                @{email.split("@")[0]}
              </p> */}
            </div>
          </div>

          {/* Logout button (conditionally rendered) */}
          {showLogout && (
            <div className="mt-2 bg-[##313335]  p-2 rounded-md">
              <button
                onClick={() => {
                  alert("Logging out...");
                  logout();
                  router.push("/signup");
                }}
                className="w-full text-sm font-medium text-white bg-[#313335] py-2 rounded-lg shadow-md hover:from-red-700 hover:via-red-600 hover:to-red-700 transition-transform transform hover:scale-105 active:scale-95"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-2 bg-[##313335] fixed bottom-10 w-52  p-2 rounded-md">
          <button
            onClick={() => {
              router.push("/signup");
            }}
            className="w-full text-sm font-medium text-white bg-[#313335] py-2 rounded-lg shadow-md hover:from-red-700 hover:via-red-600 hover:to-red-700 transition-transform transform hover:scale-105 active:scale-95"
          >
            SignUp
          </button>
        </div>
      )}
    </div>
  );
}
