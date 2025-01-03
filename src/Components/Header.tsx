"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  AiOutlineAppstore,
  AiOutlineBank,
  AiOutlineBarChart,
  AiOutlineCheckCircle,
  AiOutlineDollarCircle,
  AiOutlineFlag,
  AiOutlineHighlight,
  AiOutlineHome,
  AiOutlineMinusCircle,
  AiOutlinePieChart,
  AiOutlineTeam,
  AiOutlineTool,
  AiOutlineWallet,
} from "react-icons/ai";
import { FiBell, FiSearch, FiSettings, FiMenu } from "react-icons/fi";
import { getProfiles } from "thirdweb/wallets";
import { useThirdwebClients } from "@/app/context/ThirdwebClientContext";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { usePathname } from "next/navigation";
import { HiMiniScale, HiOutlineFire } from "react-icons/hi2";
const Header = () => {
  const pathname = usePathname();
  const isActiveHome = pathname === "/";
  const isActiveWallet = pathname === "/wallet";
  const isParticipationActive = pathname === "/participation";
  const [profiles, setProfiles] = useState<Record<string, any> | null>(null); // State to store profiles as an object
  const { client, serverClient } = useThirdwebClients();
  const [showLogout, setShowLogout] = useState(false);
  const toggleLogout = () => {
    setShowLogout((prevState) => !prevState);
  };
  const router = useRouter();
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

  const profile = profiles;
  const name = profile?.details?.name || "Unknown User";
  const email = profile?.details?.email || "No email available";
  const imageUrl = profile?.details?.picture || "/default-avatar.png";
  const stakingFeatureActive = pathname === "/staking";
  const isVotingActive = pathname === "/voting";
  const isQuestActive =
    pathname === "/quest" || /^\/quest\/\d+$/.test(pathname);
  const { logout, authToken, expirationInSeconds } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isStakingModalVisible, setStakingModalVisible] = useState(false); // State to track modal visibility
  const handleLinkClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the default link behavior
    setIsModalOpen(true); // Open the modal
  };
  const handleStakingLinkClick = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent default navigation
    setStakingModalVisible(true); // Open the modal
  };

  const closeStakingModal = () => {
    setStakingModalVisible(false); // Close the modal
  };
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility

  const handleClose = () => {
    setIsModalOpen(false); // Close the modal
  };
  const [isWeb3Enabled, setIsWeb3Enabled] = useState(true);
  const handleToggle = () => {
    if (isWeb3Enabled) {
      // Set cookies with proper attributes
      const secureFlag = location.protocol === "https:" ? "Secure;" : "";
      document.cookie = `auth._token.local=${authToken}; path=/; ${secureFlag} SameSite=Strict;`;
      document.cookie = `auth._token_expiration.local=${expirationInSeconds}; path=/; ${secureFlag} SameSite=Strict;`;
      document.cookie = `auth.strategy=local; path=/; ${secureFlag} SameSite=Strict;`;
      window.location.href = "https://syncvault.com/";
    } else {
      setIsWeb3Enabled(true);
    }
  };
  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <header className="flex items-center border-b-[1px] border-black  lg:border-[15px] lg:border-black sticky top-0 z-50 justify-between px-4 py-4 lg:py-2 bg-[#000000] lg:bg-[#0A0A0A]">
      {/* Hamburger Button for Sidebar (Medium and Small Screens) */}
      <div className="rounded-xl w-full flex items-center sticky gap-5 top-0 z-50 justify-between ">
        <div className="flex items-center justify-between w-full  bg-[#000000] lg:bg-[#0A0A0A]">
          {/* Left: Menu button for small screens */}

          {/* Center: Search Input */}
          <div className="flex items-center justify-center space-x-2 rounded-md px-3 py-2 lg:justify-start">
            <div className="lg:hidden">
              <button onClick={toggleSidebar} className="text-white text-2xl">
                <FiMenu />
              </button>
            </div>
            {/* <FiSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-sm text-white focus:outline-none w-full lg:w-64"
            /> */}
          </div>

          {/* Right: Navigation Options for Large Screens */}
          <div className="flex space-x-6  items-center ">
            {/* <FiBell className="text-gray-400 cursor-pointer hover:text-white" /> */}
            <Link
              href="/wallet"
              className="text-gray-400 text-sm  hover:text-white"
            >
              Wallet
            </Link>

            <Link
              href="/leaderboard"
              className="text-gray-400 text-sm hover:text-white"
            >
              Leaderboard
            </Link>
          </div>

          {/* Get Started Button for Small Screens */}
        </div>

        {/* Sidebar for Medium and Small Screens */}
        <div
          className={`fixed inset-0 z-40 transform transition-transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:hidden`}
          onClick={toggleSidebar} // Trigger toggleSidebar for clicks outside the sidebar
        >
          <aside
            className="fixed top-0 left-0 h-screen bg-[#0A0A0A] w-72 p-6 overflow-y-auto no-scrollbar z-40"
            onClick={(e) => e.stopPropagation()} // Prevent toggleSidebar when clicking inside the sidebar
          >
            {/* User Profile Section */}
            <div className="border-t w-52 mb-10 border-[#131415] pt-4 ">
              <div
                onClick={toggleLogout}
                className="cursor-pointer flex items-center bg-[#131415] border border-gray-700 p-3 rounded-md"
              >
                <img
                  src={imageUrl}
                  alt="User"
                  className="h-10 w-10 rounded-full"
                />
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
                <div className="mt-2 bg-[#131415] border border-gray-700 p-2 rounded-md">
                  <button
                    onClick={() => {
                      alert("Logging out...");
                      logout();
                      router.push("/signup");
                    }}
                    className="w-full text-sm text-white font-roboto bg-red-500 py-2 rounded-md hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

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
                <p className="  text-center z-1 space-grotesk text-base">
                  Web3 Mode
                </p>
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

            {/* Navigation Section */}
            <nav>
              <ul className="space-y-4">
                {/* Get Started */}
                <li>
                  <Link
                    href="/"
                    className={`flex items-center py-2 px-3 rounded-lg w-full 
          ${isActiveHome ? "bg-[#3A0013] text-white" : "hover:bg-[#3A0013] "}
        `}
                  >
                    <AiOutlineHome
                      className={`w-4 h-4 ${
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
                {/* <li>
          <Link
            href="/use-earn"
            className="flex items-center text-white hover:bg-[#3A0013] py-2 px-3 rounded-lg"
          >
            <AiOutlineDollarCircle className="w-4 h-4" />
            <span className="ml-4 text-sm">Use & Earn</span>
          </Link>
        </li>
        <li>
          <Link
            href="/claim-music"
            className="flex items-center text-white hover:bg-[#3A0013] py-2 px-3 rounded-lg"
          >
            <AiOutlineMinusCircle className="w-4 h-4" />
            <span className="ml-4 text-sm">Claim-free music</span>
          </Link>
        </li> */}

                {/* Utility */}
                <li className="text-gray-500 text-xs font-bold mt-6">
                  UTILITY
                </li>
                <li>
                  <Link
                    href="/wallet"
                    className={`flex items-center py-2 px-3 rounded-lg w-full 
            ${
              isActiveWallet
                ? "bg-[#3A0013] text-white"
                : "hover:bg-[#3A0013] hover:text-white"
            }
          `}
                  >
                    <AiOutlineWallet
                      className={`w-4 h-4 ${
                        isActiveWallet ? "text-white" : "text-white"
                      }`}
                    />
                    <span
                      className={`ml-4 font-body text-sm font-light 
              ${isActiveWallet ? "text-white" : "text-white"}
            `}
                    >
                      Wallet
                    </span>
                  </Link>
                </li>
                {/* <li>
          <Link
            href="/communities"
            className="flex items-center text-white hover:bg-[#3A0013] py-2 px-3 rounded-lg"
          >
            <AiOutlineTeam className="w-4 h-4" />
            <span className="ml-4 text-sm">Communities</span>
          </Link>
        </li>
        <li>
          <Link
            href="/leaderboard"
            className="flex items-center text-white hover:bg-[#3A0013] py-2 px-3 rounded-lg"
          >
            <AiOutlineBarChart className="w-4 h-4" />
            <span className="ml-4 text-sm">Leaderboard</span>
          </Link>
        </li> */}

                {/* Web3 */}
                <li className="text-gray-500 text-xs font-bold mt-6">WEB3</li>
                <li>
                  <Link
                    href="/quest"
                    className={`flex items-center py-2 px-3 rounded-lg w-full 
            ${isQuestActive ? "bg-[#3A0013] white" : "hover:bg-[#3A0013] "}
          `}
                  >
                    <AiOutlineFlag
                      className={`w-4 h-4 ${
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
                            stakingFeatureActive
                              ? "bg-[#3A0013] white"
                              : "hover:bg-[#3A0013] "
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
                            ${
                              stakingFeatureActive ? "text-white" : "text-white"
                            }`}
                    >
                      Staking Pools{" "}
                      <span className="text-xs text-red-500">
                        (Coming Soon)
                      </span>
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
                          To get early access to Staking Pools, click on “Notify
                          Me”.
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
                          ${
                            isVotingActive
                              ? "bg-[#3A0013] white"
                              : "hover:bg-[#3A0013] "
                          }`}
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
                      <span className="text-xs text-red-500">
                        (Coming Soon)
                      </span>
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
                          To get early access to Voting Polls click on “Notify
                          Me”.
                        </p>
                        <button className="w-full py-2 rounded bg-[#E9004C] text-white font-bold">
                          Notify Me
                        </button>
                      </div>
                    </div>
                  )}
                </li>

                {/* Toolbar */}
                <li className="text-gray-500 text-xs font-bold mt-6">
                  TOOLBAR
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
                    <AiOutlineCheckCircle
                      className={`w-4 h-4 ${
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
                {/* <li>
          <Link
            href="/artist-tools"
            className="flex items-center text-white hover:bg-[#3A0013] py-2 px-3 rounded-lg"
          >
            <AiOutlineTool className="w-4 h-4" />
            <span className="ml-4 text-sm">Artist Tools</span>
          </Link>
        </li>
        <li>
          <Link
            href="/creator-tools"
            className="flex items-center text-white hover:bg-[#3A0013] py-2 px-3 rounded-lg"
          >
            <AiOutlineHighlight className="w-4 h-4" />
            <span className="ml-4 text-sm">Creator Tools</span>
          </Link>
        </li>
        <li>
          <Link
            href="/brand-tools"
            className="flex items-center text-white hover:bg-[#3A0013] py-2 px-3 rounded-lg"
          >
            <AiOutlineAppstore className="w-4 h-4" />
            <span className="ml-4 text-sm">Brand Tools</span>
          </Link>
        </li> */}
              </ul>
            </nav>
          </aside>
        </div>
      </div>
    </header>
  );
};

export default Header;
