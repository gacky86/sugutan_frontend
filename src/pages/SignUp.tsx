import { useState } from "react";
// import Cookies from "js-cookie"

import { signUp } from "@/api/auth";
import type { SignUpParams } from "@/types";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params: SignUpParams = {
      name: name,
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
        navigate("/");

        console.log("Create an account successfully!");
      } else {
        console.log("Account creation error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form action="">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label htmlFor="email">E-mail</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <label htmlFor="password_confirmation">Password Confirmation</label>
        <input
          type="text"
          id="password_confirmation"
          name="password_confirmation"
          value={passwordConfirmation}
          onChange={(e) => {
            setPasswordConfirmation(e.target.value);
          }}
        />
        <button onClick={handleSubmit}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
