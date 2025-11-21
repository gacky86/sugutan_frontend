// stateをApp.tsxで管理しないとログイン状態を維持できなかったため、こちらの実装はApp.tsxに移行

import { useState, useEffect } from "react";
import { getCurrentUser } from "@/api/auth";

// types
import type { User } from "@/types";

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  const handleGetCurrentUser = async () => {
    console.log("handleGetCurrentUser");

    try {
      const res = await getCurrentUser();
      console.log(res.data.success);

      if (res?.data.success === true) {
        console.log("ログインしてる");

        setIsSignedIn(true);
        setCurrentUser(res?.data.data);
      } else {
        setIsSignedIn(false);
      }
    } catch {
      setIsSignedIn(false);
    } finally {
      setLoading(false);
    }
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
