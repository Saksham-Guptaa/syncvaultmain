import Cookies from "js-cookie";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextType {
  authToken: string | null;
  expirationInSeconds: number | null;
  login: (token: string | null, expirationInSeconds: number | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authToken, setAuthToken] = useState<string | null>(() => {
    return Cookies.get("authToken") || null; // Load from cookies
  });

  const [expirationInSeconds, setExpirationInSeconds] = useState<number | null>(
    () => {
      const exp = Cookies.get("authTokenExpiration");
      return exp ? parseInt(exp, 10) : null; // Load from cookies and convert to number
    }
  );

  const login = (token: string | null, expirationInSeconds: number | null) => {
    setAuthToken(token);
    setExpirationInSeconds(expirationInSeconds);

    if (token && expirationInSeconds) {
      Cookies.set("authToken", token, { secure: true, sameSite: "strict" });
      Cookies.set("authTokenExpiration", expirationInSeconds.toString(), {
        secure: true,
        sameSite: "strict",
      });
    } else {
      Cookies.remove("authToken");
      Cookies.remove("authTokenExpiration");
    }
  };

  const logout = () => {
    setAuthToken(null);
    setExpirationInSeconds(null);
    Cookies.remove("authToken");
    Cookies.remove("authTokenExpiration");
  };

  return (
    <AuthContext.Provider
      value={{ authToken, expirationInSeconds, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
