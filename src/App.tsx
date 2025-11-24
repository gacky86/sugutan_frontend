// Libraries
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

// Style
import "@/App.css";

// Pages
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import CheckEmail from "@/pages/CheckEmail";
import Flashcards from "@/pages/Flashcards";

//Functions
// import { useAuth } from "@/hooks/useAuth";
import type { User } from "@/types";
import { getCurrentUser } from "@/api/auth";

// Contexts
import { AuthContext } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

// redux
import { Provider } from "react-redux";
import { store } from "@/stores/index";

// 認証情報が確認できる場合はPrivate内を表示
// それ以外の場合はSigninの表示
const App: React.FC = () => {
  // ローディング、サインイン、ユーザー情報を管理するstate
  // useAuth内でstateの定義をしてuseEffectによって認証状態を取得する
  // AuthContextに渡して子コンポーネントで使用する
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();
      if (res?.data.success === true) {
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

  // ユーザーが認証済みかどうかでルーティングを決定
  // 未認証だった場合は「/signin」ページに促す
  const Private = () => {
    if (!loading) {
      if (isSignedIn) {
        return <Outlet />;
      } else {
        return <Navigate to="/signin" />;
      }
    } else {
      return <></>;
    }
  };

  return (
    <Provider store={store}>
      <Router>
        <AuthContext.Provider
          value={{
            loading,
            setLoading,
            isSignedIn,
            setIsSignedIn,
            currentUser,
            setCurrentUser,
          }}
        >
          <Routes>
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="checkemail" element={<CheckEmail />} />
            <Route element={<Private />}>
              <Route path="/" element={<Flashcards />} />
            </Route>
          </Routes>
        </AuthContext.Provider>
      </Router>
    </Provider>
  );
};

export default App;
