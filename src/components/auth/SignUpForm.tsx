import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// components
import { GoogleIcon } from "@/components/auth/GoogleIcon";
import SubmitButton from "@/components/common/SubmitButton";
import type { SignUpParams } from "@/types";
import { signUp } from "@/api/auth";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params: SignUpParams = {
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
      confirmSuccessUrl: "http://localhost:5173/",
    };

    try {
      const res = await signUp(params);
      console.log(res);

      if (res.status === 200) {
        // アカウント作成に成功した場合はログイン画面にリダイレクト
        navigate("/checkemail");

        console.log("Create an account successfully!");
      } else {
        console.log("Account creation error");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="max-w-md m-auto text-center">
      <div className="my-6">
        <h2 className="text-2xl">Welcom to Sugutan</h2>
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
        <div className="text-start">
          <label className="block w-full text-gray-400" htmlFor="password">
            Password Confirmation
          </label>
          <input
            className="block w-full h-9 p-1 border border-gray-300 rounded-md my-1
            duration-300
            hover:border-purple-400 hover:shadow-lg hover:shadow-purple-300/30
            focus:border-purple-400 focus:shadow-lg focus:shadow-purple-300/30"
            type="text"
            id="password"
            name="password"
            value={passwordConfirmation}
            onChange={(e) => {
              setPasswordConfirmation(e.target.value);
            }}
          />
        </div>
        <div className="my-6">
          <SubmitButton handleSubmit={handleSubmit} text="Sign up" />
        </div>
      </form>
      <p>OR</p>
      <div className="my-6">
        <GoogleIcon text="Sign in" />
      </div>
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
