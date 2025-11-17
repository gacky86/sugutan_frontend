// サインアップ
export interface SignUpParams {
  email: string;
  password: string;
  passwordConfirmation: string;
  // confirmSuccessUrl: string;
}

// サインイン
export interface SignInParams {
  email: string;
  password: string;
}
