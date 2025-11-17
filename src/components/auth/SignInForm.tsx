// import Cookies from "js-cookie";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

// components
// import { GoogleIcon } from "@/components/auth/GoogleIcon";
import SubmitButton from "@/components/common/SubmitButton";
import TextInput from "@/components/common/TextInput";
import PasswordInput from "@/components/common/PasswordInput";

// func
import { signIn } from "@/api/auth";
// type
import type { SignInParams, RailsErrorResponse } from "@/types";

const SignInForm: React.FC = () => {
  // ============= State定義 開始 ==============
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState<{
    lengthCheck: boolean;
    patternCheck: boolean;
    input: string;
  }>({
    lengthCheck: true,
    patternCheck: true,
    input: "",
  });
  const [errorMessage, setErrorMessage] = useState<{
    message: string;
    hasError: boolean;
  }>({
    message: "",
    hasError: false,
  });
  // ============= State定義 終了 ==============

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // ============= ボタン押下時関数 開始 ==============
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params: SignInParams = {
      email: email,
      password: password.input,
    };
    try {
      const res = await signIn(params);
      console.log(res);

      if (res.status === 200) {
        setIsSignedIn(true);
        setCurrentUser(res.data.data);
        navigate("/");
      } else {
        console.log("login error");
      }
      // エラー処理
    } catch (err) {
      console.log(err);

      const error = err as AxiosError<RailsErrorResponse>;
      const message = error.response?.data?.error || "エラーが発生しました";
      setErrorMessage({
        message: message,
        hasError: true,
      });
    }
  };
  // ============= ボタン押下時関数 終了 ==============

  return (
    <div className="max-w-md m-auto text-center">
      <div className="my-6">
        <h2 className="text-2xl">Welcom back to Sugutan</h2>
        <p className="text-sm text-gray-500">
          Look up to your AI dictionary for English words whenever you want to
          build your own Flashcards!
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="E-mail"
          name="email"
          id="email"
          type="text"
          value={email}
          onChange={setEmail}
        />
        <PasswordInput
          label="Password"
          name="password"
          id="password"
          setPassword={setPassword}
        />
        {/* パスワードチェック警告文 */}
        <div className="text-sm text-red-600 text-left">
          {/* {password.patternCheck === false && (
            <p>
              パスワードに使用できない文字が入力されています（半角英数字、"_"
              アンダースコアのみ使用可）
            </p>
          )}
          {password.lengthCheck === false && (
            <p>パスワードの入力文字数は8文字以上20文字以下です</p>
          )} */}
          {errorMessage.hasError === true && <p>{errorMessage.message}</p>}
        </div>
        {/* Submitボタン */}
        {/* 入力バリデーション通過時以外はボタンをdisabledにする */}
        <div className="my-6">
          <SubmitButton text="Log in" disabled={false} />
          {/* <SubmitButton text="Log in" disabled={!email || !password.input} /> */}
        </div>
      </form>
      {/* Googleログインボタン：実装保留中 */}
      {/* <p>OR</p>
      <div className="my-6">
        <GoogleIcon text="Sign in" />
      </div> */}
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
