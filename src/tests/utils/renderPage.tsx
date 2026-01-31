// src/test/test-utils.tsx
import { Routes, Route } from "react-router-dom";
import { renderWithProviders } from "./renderWithProviders";
import type { User } from "@/types";
import Dictionary from "@/components/pages/Dictionary";
import SignIn from "@/components/pages/SignIn";
import SignUp from "@/components/pages/SignUp";
import Flashcards from "@/components/pages/Flashcards";
import CheckEmail from "@/components/pages/CheckEmail";
import Cards from "@/components/pages/Cards";
import Learning from "@/components/pages/Learning";
// import type { ModalState } from "@/stores/modalSlice";
// import { mockFlashcards } from "@/mocks/mockData";

// ログイン済みのUser State
const authState = {
  loading: false,
  isSignedIn: true,
  currentUser: {
    id: 1,
    email: "test@example.com",
  } as User,
};
// const modalState: ModalState = {
//   isVisible: true,
//   modalContent: "flashcardDetail",
//   modalProps: {
//     flashcard: mockFlashcards[0],
//   },
// };

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
    },
  );
};
export const renderFlashcardsPage = (preloadedState = {}) => {
  return renderWithProviders(
    <Routes>
      <Route path="/" element={<Flashcards />} />
    </Routes>,
    {
      preloadedState: {
        auth: authState, // デフォルトの認証状態
        ...preloadedState,
      },
      route: "/",
    },
  );
};
export const renderCardsPage = (preloadedState = {}) => {
  return renderWithProviders(
    <Routes>
      <Route path="/flashcards/:id/cards" element={<Cards />} />
    </Routes>,
    {
      preloadedState: {
        auth: authState, // デフォルトの認証状態
        ...preloadedState,
      },
      route: "/flashcards/1/cards",
    },
  );
};
export const renderSignInPage = (preloadedState = {}) => {
  return renderWithProviders(
    // ページ遷移を確認するため、単語帳一覧ページも一緒にレンダリング
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<Flashcards />} />
    </Routes>,
    {
      preloadedState: {
        ...preloadedState,
      },
      route: "/signin",
    },
  );
};
export const renderSignUpPage = (preloadedState = {}) => {
  return renderWithProviders(
    // ページ遷移を確認するため、単語帳一覧ページも一緒にレンダリング
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/checkemail" element={<CheckEmail />} />
    </Routes>,
    {
      preloadedState: {
        ...preloadedState,
      },
      route: "/signup",
    },
  );
};
export const renderLearningPage = (preloadedState = {}) => {
  return renderWithProviders(
    // ページ遷移を確認するため、単語帳一覧ページも一緒にレンダリング
    <Routes>
      <Route path="/" element={<Flashcards />} />
      <Route path="/learning" element={<Learning />} />
    </Routes>,
    {
      preloadedState: {
        auth: authState, // デフォルトの認証状態
        ...preloadedState,
      },
      route: "/",
    },
  );
};
