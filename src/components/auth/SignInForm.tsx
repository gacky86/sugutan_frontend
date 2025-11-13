import { useContext, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

import { signIn } from "@/api/auth";
import type { SignInParams } from "@/types";
import { AuthContext } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// components
import { GoogleIcon } from "@/components/auth/GoogleIcon";
import SubmitButton from "@/components/common/SubmitButton";

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params: SignInParams = {
      email: email,
      password: password,
    };

    try {
      const res = await signIn(params);
      console.log(res);

      if (res.status === 200) {
        // ログインに成功した場合はCookieに各値を格納
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        navigate("/");

        console.log("Signed in successfully!");
      } else {
        console.log("login error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-md m-auto text-center">
      <div className="my-6">
        <h2 className="text-2xl">Welcom back to Sugutan</h2>
        <p className="text-sm text-gray-500">
          Look up to your AI dictionary for English words whenever you want to
          build your own Flashcards!
        </p>
      </div>
      <form action="">
        <div className="text-start">
          <label className="block w-full text-gray-400" htmlFor="email">
            E-mail
          </label>
          <input
            className="block w-full h-9 p-1 border border-gray-300 rounded-md my-1
            duration-300
            hover:border-purple-400 hover:shadow-lg hover:shadow-purple-300/30
            focus:border-purple-400 focus:shadow-lg focus:shadow-purple-300/30"
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="text-start">
          <label className="block w-full text-gray-400" htmlFor="password">
            Password
          </label>
          <input
            className="block w-full h-9 p-1 border border-gray-300 rounded-md my-1
            duration-300
            hover:border-purple-400 hover:shadow-lg hover:shadow-purple-300/30
            focus:border-purple-400 focus:shadow-lg focus:shadow-purple-300/30"
            type="text"
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="my-6">
          <SubmitButton handleSubmit={handleSubmit} text="Log in" />
        </div>
      </form>
      <p>OR</p>
      <div className="my-6">
        <GoogleIcon text="Sign in" />
      </div>
      <div className="text-base">
        <p>
          アカウントをお持ちでない方は
          <Link to="/signup" className="text-sky-500 cursor-pointer">
            新規登録
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
