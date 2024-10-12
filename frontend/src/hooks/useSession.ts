// hooks/useSession.ts
"use client";

import { useEffect, useState } from "react";
import { decrypt } from "@/lib/decrypt";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export interface UserData {
    user_id     : string
    username     : string
    password     : string
    created_at   : Date
    updated_at  : Date
}

interface UseSessionReturn {
  userData: UserData | null;
  isLoading: boolean;
  error: Error | null;
 
}

export function useSession(session : RequestCookie | undefined): UseSessionReturn {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const getSessionData = async () => {
    try {
      setIsLoading(true);
      // Gunakan API Route untuk mengambil data session
      if (session?.value) {
        const decryptedData = await decrypt(session.value);
        console.log(decryptedData);
      } else {
        setUserData(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      setUserData(null);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getSessionData();
  }, []);

  return {
    userData,
    isLoading,
    error,
  
  };
}