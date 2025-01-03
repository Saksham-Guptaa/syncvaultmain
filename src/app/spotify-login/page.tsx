"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { SkeletonCard } from "@/Components/SkeletonCard";

const Page = () => {
  const { authToken } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Use searchParams hook to get query parameters
  const searchParams = useSearchParams();
  const code = searchParams?.get("code"); // Get 'code' from the URL query parameters
  const redirect = searchParams?.get("redirect") || "/quest"; // Get 'redirect' query parameter or fallback

  useEffect(() => {
    if (code) {
      const fetchData = async () => {
        try {
          const platform = "Spotify";

          // Make the API request with code, authToken, and platform
          const response = await axios.post(
            `https://hoc-api.syncvault.com/v1/web3/oauth/callback`,
            { code, platform },
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );

          // Set the response data
          setData(response.data);
          router.push(redirect);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [code, authToken, redirect, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <SkeletonCard />
    </div>
  );
};

const SpotifyLoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  );
};

export default SpotifyLoginPage;
// const initiateOAuth = () => {
//   const currentPath = window.location.pathname;
//   const redirectUri = encodeURIComponent(currentPath);
//   const spotifyLoginUrl = `https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=${encodeURIComponent(
//     "https://yourapp.com/oauth/callback"
//   )}&scope=YOUR_SCOPES&response_type=code&state=${redirectUri}`;

//   window.location.href = spotifyLoginUrl;
// };
