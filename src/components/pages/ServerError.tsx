import catImg from "@/assets/889.png";

import MainButton from "@/components/uis/common/MainButton";

import { useNavigate } from "react-router-dom";

const ServerError = () => {
  const navigate = useNavigate();

  return (
    <div>
      <img src={catImg} alt="猫の画像" className="mx-auto h-[300px]" />
      <h3 className="mx-auto text-xl text-auqa-blue text-center">
        サーバーエラーが発生しました
      </h3>
      <p className="mx-5 ">
        何らかの理由でサーバーが応答していません。時間をおいて再度アクセスするか、サーバー管理者にお問い合わせください。
      </p>
      <div className="mx-auto text-center max-w-[200px]">
        <MainButton
          text="ホームへ戻る"
          disabled={false}
          onClick={() => navigate("/")}
        />
      </div>
    </div>
  );
};

export default ServerError;
