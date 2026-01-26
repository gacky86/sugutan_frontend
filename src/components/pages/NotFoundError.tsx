import catImg from "@/assets/889.png";

import MainButton from "@/components/uis/common/MainButton";
import { useNavigate } from "react-router-dom";

const NotFoundError = () => {
  const navigate = useNavigate();

  return (
    <div>
      <img src={catImg} alt="猫の画像" className="mx-auto h-[300px]" />
      <h3 className="mx-auto text-xl text-auqa-blue text-center">
        指定されたページが見つかりませんでした
      </h3>
      <div className="mx-auto text-center  max-w-[200px]">
        <MainButton
          text="ホームへ戻る"
          disabled={false}
          onClick={() => navigate("/")}
        />
      </div>
    </div>
  );
};

export default NotFoundError;
