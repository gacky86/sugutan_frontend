import { useState } from "react";
import { AxiosError } from "axios";

import ModalTitle from "@/components/uis/common/ModalTitle";
import PasswordInput from "@/components/uis/common/PasswordInput";
import SubmitButton from "@/components/uis/common/SubmitButton";
import type { PasswordParams, RailsErrorResponse } from "@/types";
import { updatePassword } from "@/api/auth";
import { useNavigate } from "react-router-dom";
import { closeModal } from "@/stores/modalSlice";
import { useDispatch } from "react-redux";

const EditPasswordModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ============= State定義 開始 ==============
  const [currentPassword, setCurrentPassword] = useState<{
    lengthCheck: boolean;
    patternCheck: boolean;
    input: string;
  }>({
    lengthCheck: true,
    patternCheck: true,
    input: "",
  });
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
  // ============= ボタン押下時関数 開始 ==============
  const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params: PasswordParams = {
      currentPassword: currentPassword.input,
      password: password.input,
      passwordConfirmation: passwordConfirmation.input,
    };
    if (password.input === passwordConfirmation.input) {
      try {
        await updatePassword(params);
        navigate("/password-changed");
        dispatch(closeModal());
      } catch (err) {
        const error = err as AxiosError<RailsErrorResponse>;
        if (error.response?.status === 422) {
          setErrorMessage({
            message: "現在のパスワードが正しくありません",
            hasError: true,
          });
          return;
        }
        throw error;
      }
    } else {
      setSamePassword(false);
    }
  };
  // ============= ボタン押下時関数 終了 ==============

  return (
    <div className="text-center">
      <ModalTitle title="パスワード変更" />
      <form onSubmit={handleUpdatePassword}>
        <PasswordInput
          label="現在のパスワード"
          name="currentPassword"
          id="currentPassword"
          setPassword={setCurrentPassword}
        />
        <PasswordInput
          label="新しいパスワード"
          name="password"
          id="password"
          setPassword={setPassword}
        />
        <PasswordInput
          label="新しいパスワード(確認用)"
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
          {(password.lengthCheck === false ||
            passwordConfirmation.lengthCheck === false) && (
            <p>パスワードの入力文字数は8文字以上20文字以下です</p>
          )}
          {samePassword === false && (
            <p>パスワードと確認用パスワードが一致しません</p>
          )}
          {errorMessage.hasError === true && <p>{errorMessage.message}</p>}
        </div>
        {/* Submitボタン */}
        {/* 入力バリデーション通過時以外はボタンをdisabledにする */}
        <div className="my-6 max-w-[200px] mx-auto">
          <SubmitButton
            text="パスワード変更"
            disabled={
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
    </div>
  );
};

export default EditPasswordModal;
