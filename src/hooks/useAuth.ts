import { useState, useEffect } from "react";
import { getCurrentUser } from "@/api/auth";

// import types
import type { User } from "@/types";

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();
      if (res?.data.isLogin === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);
      } else {
        setIsSignedIn(false);
      }
    } catch {
      setIsSignedIn(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, []);

  return {
    loading,
    isSignedIn,
    currentUser,
    setLoading,
    setIsSignedIn,
    setCurrentUser,
  };
};
