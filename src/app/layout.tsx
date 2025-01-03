"use client";
import { Inter } from "next/font/google";
import { ThirdwebProvider } from "thirdweb/react";
import Sidebar from "../Components/SideBar";
import Header from "../Components/Header";
import { ThirdwebClientProvider } from "./context/ThirdwebClientContext";
import "./globals.css";
import { usePathname } from "next/navigation"; // Import the usePathname hook
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Get the current route path

  // Define the pages where you want to hide the Sidebar and Header
  const hideSidebarAndHeader =
    pathname === "/signinLoading" ||
    pathname === "/signup" ||
    pathname === "/signIn";
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen flex`}>
        <ThirdwebClientProvider>
          <ThirdwebProvider>
            <AuthProvider>
              {!hideSidebarAndHeader && <Sidebar />}

              <div
                className={`flex flex-col flex-1 ${
                  hideSidebarAndHeader ? "ml-0" : "lg:ml-72"
                }`}
              >
                {!hideSidebarAndHeader && <Header />}

                <main className="flex-1 overflow-y-auto no-scrollbar bg-[#08080b] ">
                  {children}
                </main>
              </div>
            </AuthProvider>
          </ThirdwebProvider>
        </ThirdwebClientProvider>
      </body>
    </html>
  );
}
