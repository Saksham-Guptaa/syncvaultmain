"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";

const AuthGuard = (Component: React.ComponentType) => {
  return function ProtectedComponent(props: any) {
    const router = useRouter();
    const pathname = usePathname();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
      const authToken = Cookies.get("authToken");
      if (!authToken) {
        setShowModal(true);
      }
    }, []);
    const handleSignIn = () => {
      setShowModal(false);
      router.push(`/signup?redirect=${encodeURIComponent(pathname)}`);
    };
    if (showModal) {
      return (
        <div className="flex justify-center items-center h-[80vh]">
          <div className="bg-black text-white p-6 rounded-lg shadow-lg w-[90%] max-w-md relative">
            {/* Close Button */}
            {/* Modal Content */}
            <h2 className="text-2xl font-bold space-grotesk mb-4">
              Login To Continue
            </h2>
            <button
              onClick={handleSignIn}
              className="w-full py-2 space-grotesk rounded bg-[#E9004C] text-white font-bold "
            >
              Login
            </button>
          </div>
        </div>
      );
    }

    // Render the wrapped component if authenticated
    return <Component {...props} />;
  };
};

export default AuthGuard;
