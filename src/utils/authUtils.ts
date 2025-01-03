// utils/authUtils.ts
import { preAuthenticate } from "thirdweb/wallets/in-app";
import { inAppWallet, getProfiles, getUser } from "thirdweb/wallets";
import { signMessage } from "thirdweb/utils";
import axios from "axios";

// Function to pre-authenticate via email
export const preLogin = async (email: string, client: any) => {
  try {
    await preAuthenticate({
      client,
      strategy: "email",
      email,
    });
  } catch (error) {
    console.error("Error sending verification code:", error);
    throw new Error("Failed to send verification code");
  }
};

// Function to authenticate user
export const authenticateUser = async (account: any, client: any, serverClient: any) => {
  const profiles = await getProfiles({ client });
  const user = await getUser({
    client: serverClient,
    email: profiles[0]?.details.email,
  });

  try {
    const res = await axios.post(
      "https://hoc-api.syncvault.com/v1/web3/auth/nonce",
      { wallet: user?.walletAddress }
    );
    const sign = await signMessage({
      message: `Please sign this message with nonce number: ${res.data.nonce} and your wallet address: ${user?.walletAddress}`,
      account,
    });

    const loginResult = await axios.post(
      "https://hoc-api.syncvault.com/v1/web3/auth/login",
      {
        wallet: user?.walletAddress,
        signature: sign,
        email: profiles[0].details.email,
      }
    );

    return loginResult.data.access_token;
  } catch (error) {
    console.error("Authentication failed:", error);
    throw new Error("Authentication failed");
  }
};

// Function to handle Google authentication
export const authenticateWithGoogle = async (connect: Function, client: any, base: any) => {
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
    throw new Error("Google authentication failed");
  }
};
