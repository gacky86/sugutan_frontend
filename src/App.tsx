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
import SignIn from "@/components/pages/SignIn";
import SignUp from "@/components/pages/SignUp";
import CheckEmail from "@/components/pages/CheckEmail";
import Flashcards from "@/components/pages/Flashcards";
import Cards from "@/components/pages/Cards";
import Dictionary from "@/components/pages/Dictionary";
import Learning from "@/components/pages/Learning";
import NotFoundError from "@/components/pages/NotFoundError";
import ServerError from "@/components/pages/ServerError";

import { useEffect } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/stores/index";
import { fetchCurrentUser } from "./stores/authSlice";

// toast
import { ToastContainer } from "react-toastify";

// 認証情報が確認できる場合はPrivate内を表示
// それ以外の場合はSigninの表示
const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { loading, isSignedIn } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

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
    <>
      <Router>
        <Routes>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="checkemail" element={<CheckEmail />} />
          <Route path="/not-found" element={<NotFoundError />} />
          <Route path="/server-error" element={<ServerError />} />
          <Route element={<Private />}>
            <Route path="/" element={<Flashcards />} />
            <Route path="/dictionary" element={<Dictionary />} />
            <Route path="/flashcards/:id/cards" element={<Cards />} />
            <Route path="/learning" element={<Learning />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer closeOnClick autoClose={2000} />
    </>
  );
};

export default App;
