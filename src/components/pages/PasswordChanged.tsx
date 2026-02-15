import { useNavigate } from "react-router-dom";
import MainButton from "../uis/common/MainButton";

const PasswordChanged = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-xl mx-auto my-20 text-center">
      <div className="my-2">
        <h2 className="text-2xl">パスワードを変更完了</h2>
      </div>
      <div className="py-2 text-left border-t-2 border-indigo-700">
        <p>パスワードの変更が完了しました。</p>
        <p>
          下のボタンよりログインページにアクセスし、再度ログインをしてください。
        </p>
      </div>
      <div className="mx-auto text-center  max-w-[200px]">
        <MainButton
          text="ホームへ戻る"
          disabled={false}
          onClick={() => navigate("/signin")}
        />
      </div>
    </div>
  );
};

export default PasswordChanged;
