"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { preAuthenticate } from "thirdweb/wallets/in-app";
import { inAppWallet, getProfiles, getUser } from "thirdweb/wallets";
import { useConnect, useSetActiveWallet } from "thirdweb/react"; // Import here
import { useThirdwebClients } from "../context/ThirdwebClientContext";
import { baseSepolia, base } from "thirdweb/chains";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signMessage } from "thirdweb/utils";
import { useAuth } from "../context/AuthContext";
import SigninLoading from "../signinLoading/page";
type Props = {};
const SignUpContent = (props: Props) => {
  const setActiveWallet = useSetActiveWallet();
  const { client, serverClient } = useThirdwebClients();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isChecked, setIsChecked] = useState(false);
  const redirect = searchParams.get("redirect") || "/";

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };
  // Use the hook here
  const { connect } = useConnect({
    client,
    accountAbstraction: { chain: base, sponsorGas: true },
  });

  const authenticate = async (account: any) => {
    const profiles = await getProfiles({
      client,
    });
    const user = await getUser({
      client: serverClient,
      email: profiles[0].details.email,
    });

    const res = await axios.post(
      "https://hoc-api.syncvault.com/v1/web3/auth/nonce",
      { wallet: user?.walletAddress }
    );

    const sign = await signMessage({
      message: `Please sign this message with nonce number: ${res.data.nonce} and your wallet address: ${user?.walletAddress}`,
      account,
    });
    try {
      const register = await axios.post(
        "https://hoc-api.syncvault.com/v1/web3/auth/register",
        {
          wallet: user?.walletAddress,
          signature: sign,
          first_name: (profiles[0].details as any).givenName || "User",
          last_name: (profiles[0].details as any).familyName || "Vault",
          email: profiles[0].details.email,
        }
      );
      login(register.data.access_token, register.data.expires_at);
      console.log(register);
      router.push(redirect);
    } catch (err) {
      console.log(err);
    }
    try {
      const loginResult = await axios.post(
        "https://hoc-api.syncvault.com/v1/web3/auth/login",
        {
          wallet: user?.walletAddress,
          signature: sign,
          email: profiles[0].details.email,
        }
      );
      const token = await loginResult.data.access_token;
      const expiration = await loginResult.data.expires_at;
      const expirationInSeconds = Math.floor(
        new Date(expiration).getTime() / 1000
      );
      login(token, expirationInSeconds);
      router.push(redirect);
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  useEffect(() => {
    const effect = async () => {
      if (isAuthenticated) {
        const profiles = await getProfiles({
          client,
        });
        console.log(profiles);

        const user = await getUser({
          client: serverClient,
          email: profiles[0].details.email,
        });
      }
    };
    effect();
  }, [isAuthenticated, router]);

  // Send email verification code
  const preLogin = async (email: string) => {
    try {
      setIsVerifying(true);
      await preAuthenticate({
        client,
        strategy: "email",
        email,
      });
      setIsEmailSent(true);
      setIsVerifying(false);
    } catch (error) {
      console.error("Error sending verification code:", error);
      setIsVerifying(false);
    }
  };

  // Handle login after email verification
  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await handleEmailLogin(email, verificationCode);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error verifying email or connecting wallet:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async (email: string, verificationCode: string) => {
    setIsLoading(true);
    try {
      await connect(async () => {
        const adminWallet = inAppWallet();
        const account = await adminWallet.connect({
          client,
          chain: base,
          strategy: "email",
          email,
          verificationCode,
        });
        setActiveWallet(adminWallet);
        await authenticate(account);
        return adminWallet;
      });
    } catch (error) {
      console.error("Email login failed:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      await connect(async () => {
        const adminWallet = inAppWallet();
        const personalAccount = await adminWallet.connect({
          client,
          chain: base,
          strategy: "google",
        });
        await setActiveWallet(adminWallet);
        await authenticate(personalAccount);
        return adminWallet;
      });
    } catch (error) {
      console.error("Google authentication failed:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.push(redirect);
      }
      // } else {
      //   router.push(redirect);
      // }
    }
  }, [isLoading, isAuthenticated, router]);

  return (
    <>
      {isLoading ? (
        <SigninLoading />
      ) : (
        <div className="relative h-screen overflow-x-hidden">
          <video
            autoPlay
            loop
            muted
            className="absolute inset-0 object-cover w-full ml-[10%] h-full"
          >
            <source
              src="https://res.cloudinary.com/dski9pira/video/upload/v1734196445/bgvid_wmnvog.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          {!isEmailSent ? (
            <div className="flex relative items-center justify-center w-full md:w-[50%] mx-auto min-h-screen bg-black mr-[100%] text-white">
              <div className="w-full max-w-lg p-6 rounded-lg">
                <h3 className="text-2xl md:text-4xl font-semibold text-center">
                  Start Using SyncVault
                </h3>
                <form
                  className="mt-6 space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (isEmailSent) {
                      handleLogin();
                    } else {
                      preLogin(email);
                    }
                  }}
                >
                  <div>
                    <input
                      type="email"
                      id="email"
                      className="block h-12 w-full px-4 py-2 mt-1 text-white bg-black border border-[#313333] rounded-md focus:ring-pink-500 focus:border-pink-500"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isEmailSent}
                    />
                  </div>
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="terms"
                      onChange={handleCheckboxChange}
                      checked={isChecked}
                      className="w-4 h-4 mt-1 text-[#E9004C] bg-gray-100 border-[#313333] rounded focus:ring-pink-500"
                    />
                    <label
                      htmlFor="terms"
                      className="ml-2 text-sm text-gray-400"
                    >
                      By clicking on &apos;Continue&apos;, you agree to our{" "}
                      <a href="#" className="text-[#E9004C] hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-[#E9004C] hover:underline">
                        Privacy Policy
                      </a>
                      .
                    </label>
                  </div>
                  <button
                    type="submit"
                    onClick={(e) => {
                      if (!isChecked) {
                        e.preventDefault();
                        toast.error(
                          "Please agree to the Terms of Service and Privacy Policy",
                          {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            theme: "colored",
                          }
                        );
                      }
                    }}
                    className="w-full h-12 py-2 text-xs font-medium text-white bg-[#E9004C] rounded-md  focus:outline-none focus:ring "
                  >
                    {isEmailSent
                      ? "Verify and Continue"
                      : "Send Verification Code"}
                  </button>
                </form>

                {/* Google Auth Button */}
                <div className="mt-4">
                  <button
                    onClick={(e) => {
                      if (!isChecked) {
                        e.preventDefault();
                        toast.error(
                          "Please agree to the Terms of Service and Privacy Policy",
                          {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            theme: "colored",
                          }
                        );
                      } else {
                        handleGoogleAuth();
                      }
                    }}
                    className="flex h-12 items-center justify-center w-full py-2 text-xs font-medium text-white bg-[#131415] rounded-md"
                  >
                    <div className="flex items-center justify-center">
                      <img
                        src="/google.png"
                        alt="Google"
                        className="w-4 h-4 mr-2"
                      />
                      Continue with Google
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col relative items-center justify-center w-full md:w-[50%] mx-auto min-h-screen bg-black mr-[100%] text-white">
              <h3 className="text-2xl md:text-4xl space-grotesk font-semibold text-center">
                Verify your Email
              </h3>
              <h4 className="space-grotesk mb-5">
                Verification code has been sent
              </h4>
              <input
                type="text"
                id="verificationCode"
                className="block h-12 w-full max-w-lg px-4 py-2 mt-1 text-white bg-black border border-[#313333] rounded-md focus:ring-pink-500 focus:border-pink-500"
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (isEmailSent) {
                    handleLogin();
                  } else {
                    preLogin(email);
                  }
                }}
                disabled={!isChecked}
                className="w-full max-w-lg mt-6 h-12 py-2 text-xs font-medium text-white bg-[#E9004C] rounded-md  focus:outline-none focus:ring "
              >
                {isEmailSent ? "Verify and Continue" : "Send Verification Code"}
              </button>
            </div>
          )}
        </div>
      )}
      <ToastContainer />
    </>
  );
};
const SignUp = (props: Props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpContent />
    </Suspense>
  );
};

export default SignUp;
