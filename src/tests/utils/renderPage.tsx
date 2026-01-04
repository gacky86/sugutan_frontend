// src/test/test-utils.tsx
import { Routes, Route } from "react-router-dom";
import { renderWithProviders } from "./renderWithProviders";
import type { User } from "@/types";
import Dictionary from "@/components/pages/Dictionary";

// ログイン済みのUser State
const authState = {
  loading: false,
  isSignedIn: true,
  currentUser: {
    id: 1,
    email: "test@example.com",
  } as User,
};

export const renderDictionaryPage = (preloadedState = {}) => {
  return renderWithProviders(
    <Routes>
      <Route path="/dictionary" element={<Dictionary />} />
    </Routes>,
    {
      preloadedState: {
        auth: authState, // デフォルトの認証状態
        ...preloadedState,
      },
      route: "/dictionary",
    }
  );
};
