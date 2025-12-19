import client from "./client";
// import Cookies from "js-cookie";

// import types
import type { SignUpParams, SignInParams } from "@/types";

// サインアップ（新規アカウント作成）
export const signUp = (params: SignUpParams) => {
  return client.post("auth", params);
};

// サインイン（ログイン）
export const signIn = (params: SignInParams) => {
  console.log("signIn");

  return client.post("auth/sign_in", params);
};

// サインアウト（ログアウト）
export const signOut = () => {
  return client.delete("auth/sign_out", {
    withCredentials: true,
  });
};

// 認証済みのユーザーを取得
export const getCurrentUser = () => {
  console.log("getCurrentUSer");

  return client.get("/auth/validate_token");
};
