import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// components
// import { GoogleIcon } from "@/components/auth/GoogleIcon";
import SubmitButton from "@/components/uis/common/SubmitButton";
import EmailInput from "@/components/uis/common/EmailInput";
import PasswordInput from "@/components/uis/common/PasswordInput";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/stores";
import { signUpThunk } from "@/stores/authSlice";

const SignUpForm = () => {
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
  const [passwordConfirmation, setPasswordConfirmation] = useState<{
    lengthCheck: boolean;
    patternCheck: boolean;
    input: string;
  }>({
    lengthCheck: true,
    patternCheck: true,
    input: "",
  });
  const [samePassword, setSamePassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState<{
    message: string;
    hasError: boolean;
  }>({
    message: "",
    hasError: false,
  });
  // ============= State定義 終了 ==============

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // ============= ボタン押下時関数 開始 ==============
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.input === passwordConfirmation.input) {
      try {
        await dispatch(
          signUpThunk({
            email: email,
            password: password.input,
            passwordConfirmation: passwordConfirmation.input,
          })
        ).unwrap();

        navigate("/checkemail");
      } catch (err) {
        setErrorMessage({
          message: err as string,
          hasError: true,
        });
      }
    } else {
      setSamePassword(false);
    }
  };
  // ============= ボタン押下時関数 終了 ==============

  return (
    <div className="max-w-md m-auto text-center">
      <div className="my-6">
        <h2 className="text-2xl">Welcom to Sugutan</h2>
        <p className="text-sm text-gray-500">
          Look up to your AI dictionary for English words whenever you want to
          build your own Flashcards!
        </p>
      </div>
      {/* 入力フォーム 開始 */}
      <form onSubmit={handleSubmit}>
        <EmailInput
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
        <PasswordInput
          label="Password Confirmation"
          name="passwordConfirmation"
          id="passwordConfirmation"
          setPassword={setPasswordConfirmation}
        />
        {/* パスワードチェック警告文 */}
        <div className="text-sm text-red-600 text-left">
          {password.patternCheck === false && (
            <p>
              パスワードに使用できない文字が入力されています（半角英数字、"_"
              アンダースコアのみ使用可）
            </p>
          )}
          {password.lengthCheck === false && (
            <p>パスワードの入力文字数は8文字以上20文字以下です</p>
          )}
          {samePassword === false && (
            <p>パスワードと確認用パスワードが一致しません</p>
          )}
          {errorMessage.hasError === true && <p>{errorMessage.message}</p>}
        </div>
        {/* Submitボタン */}
        {/* 入力バリデーション通過時以外はボタンをdisabledにする */}
        <div className="my-6">
          <SubmitButton
            text="Sign up"
            disabled={
              !email ||
              !password.input ||
              !password.lengthCheck ||
              !password.patternCheck ||
              !passwordConfirmation.input ||
              !passwordConfirmation.lengthCheck ||
              !passwordConfirmation.patternCheck
            }
          />
        </div>
      </form>
      {/* 入力フォーム 終了 */}

      {/* Googleログインボタン：実装保留中 */}
      {/* <p>OR</p>
      <div className="my-6">
        <GoogleIcon text="Sign in" />
      </div> */}

      <div className="text-base">
        <p>
          アカウントを既にお持ちの方は
          <Link to="/signin" className="text-sky-500 cursor-pointer">
            ログイン
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
