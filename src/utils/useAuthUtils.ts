// utils/useAuthUtils.ts
import { useAuth } from "@/app/context/AuthContext";

// Hook to handle login state
export const useAuthUtils = () => {
  const { login } = useAuth();

  const setAuthToken = (token: string , expirationInSeconds: number) => {
    login(token, expirationInSeconds)
  };

  return {
    setAuthToken,
  };
};
