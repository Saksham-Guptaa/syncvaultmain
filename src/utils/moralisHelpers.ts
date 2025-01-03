import Moralis from "moralis";

export const fetchUserTokens = async (walletAddress: string, apiKey: string) => {
  if (!Moralis.Core.isStarted) {
    await Moralis.start({
      apiKey: apiKey,
    });
  }

  try {
    // Fetch Native Token Balances
    const nativeResponse = await Moralis.EvmApi.wallets.getWalletTokenBalancesPrice({
      chain: "0x2105",
      address: walletAddress,
    });

    // Fetch Other Token Balances
    const tokenResponse = await Moralis.EvmApi.token.getWalletTokenBalances({
      chain: "0x2105",
      address: walletAddress,
    });

    return [...nativeResponse.result, ...tokenResponse.result];
  } catch (error) {
    console.error("Error fetching tokens:", error);
    throw error;
  }
};
