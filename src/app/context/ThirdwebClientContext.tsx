import { THIRDWEB_CLIENT_ID, THIRDWEB_SECRET_KEY } from "@/utils/constants";
import React, { createContext, useContext, ReactNode } from "react";
import { ThirdwebClient, createThirdwebClient } from "thirdweb";

// Define the type for the context
interface ThirdwebClientContextType {
  client: ThirdwebClient;
  serverClient: ThirdwebClient;
}

// Create the context with a default value (null)
const ThirdwebClientContext = createContext<ThirdwebClientContextType | null>(
  null
);

// Create a provider component
export const ThirdwebClientProvider = ({ children }: { children: ReactNode }) => {
  const client = createThirdwebClient({
    clientId: THIRDWEB_CLIENT_ID,
  });

  const serverClient = createThirdwebClient({
    secretKey:
      THIRDWEB_SECRET_KEY,
  });

  return (
    <ThirdwebClientContext.Provider value={{ client, serverClient }}>
      {children}
    </ThirdwebClientContext.Provider>
  );
};

// Custom hook to use the ThirdwebClient
export const useThirdwebClients = (): ThirdwebClientContextType => {
  const context = useContext(ThirdwebClientContext);
  if (!context) {
    throw new Error(
      "useThirdwebClients must be used within a ThirdwebClientProvider"
    );
  }
  return context;
};
