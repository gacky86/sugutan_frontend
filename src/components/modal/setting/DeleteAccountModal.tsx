import { withdraw } from "@/api/auth";
import DeleteButton from "@/components/uis/common/DeleteButton";
import ModalTitle from "@/components/uis/common/ModalTitle";
import PasswordInput from "@/components/uis/common/PasswordInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeModal } from "@/stores/modalSlice";
import { AxiosError } from "axios";
import type { RailsErrorResponse } from "@/types";

const DeleteAccountModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [password, setPassword] = useState<{
    lengthCheck: boolean;
    patternCheck: boolean;
    input: string;
  }>({
    lengthCheck: true,
    patternCheck: true,
    input: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    message: "",
    hasError: false,
  });

  const handleWithdraw = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await withdraw(password.input);
      navigate("/signin");
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
  };

  return (
    <div className="text-center">
      <ModalTitle title="退会手続き" />
      <div className="my-6">
        <p>
          退会手続きを実行するとアカウント情報が削除され、作成した単語帳や登録済みの単語カードは全て削除されます。
        </p>
        <p>
          退会手続きを続行する場合はログインパスワードを入力し、下記の退会ボタンをクリックしてください。
        </p>
      </div>
      <div className="max-w-[450px] mx-auto">
        <form onSubmit={handleWithdraw}>
          <PasswordInput
            label="パスワード"
            name="currentPassword"
            id="currentPassword"
            setPassword={setPassword}
          />
          <div className="my-6 max-w-[200px] mx-auto">
            <DeleteButton
              text="退会"
              handleDelete={() => {}}
              disabled={!password.input}
            />
          </div>
          {errorMessage.hasError && <p>{errorMessage.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
