import client from "./client";
// import Cookies from "js-cookie";

// import types
import type {
  SignUpParams,
  SignInParams,
  EmailParams,
  PasswordParams,
} from "@/types";

// サインアップ（新規アカウント作成）
export const signUp = (params: SignUpParams) => {
  return client.post("auth", params);
};

// サインイン（ログイン）
export const signIn = (params: SignInParams) => {
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
  return client.get("/auth/validate_token");
};

// メールアドレス更新
export const updateEmail = (params: EmailParams) => {
  return client.patch(
    "/account/email",
    {
      user: params,
    },
    {
      withCredentials: true,
    },
  );
};

// パスワード更新
export const updatePassword = (params: PasswordParams) => {
  return client.patch(
    "/account/password",
    {
      user: params,
    },
    {
      withCredentials: true,
    },
  );
};

// アカウント削除
export const withdraw = (currentPassword: string) => {
  return client.delete("/account/withdraw", {
    data: {
      currentPassword,
    },
  });
};
