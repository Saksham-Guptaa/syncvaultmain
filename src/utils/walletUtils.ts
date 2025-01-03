// utils/walletUtils.ts
import { inAppWallet } from "thirdweb/wallets";
import { useConnect } from "thirdweb/react";

// Function to handle wallet connection for email login
export const connectWalletForEmail = async (email: string, verificationCode: string, client: any, base: any) => {
  try {
    const adminWallet = inAppWallet();
    const account = await adminWallet.connect({
      client,
      chain: base,
      strategy: "email",
      email,
      verificationCode,
    });
    return account;
  } catch (error) {
    console.error("Email login failed:", error);
    throw new Error("Failed to connect wallet via email");
  }
};

// Function to initiate the wallet connection for Google Auth
export const connectWalletForGoogle = async (client: any, base: any) => {
  try {
    const adminWallet = inAppWallet();
    const account = await adminWallet.connect({
      client,
      chain: base,
      strategy: "google",
    });
    return account;
  } catch (error) {
    console.error("Google authentication failed:", error);
    throw new Error("Failed to connect wallet via Google");
  }
};
