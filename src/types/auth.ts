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
export interface EmailParams {
  email: string;
  currentPassword: string;
}
export interface PasswordParams {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
}
export interface WithdrawParams {
  currentPassword: string;
}
