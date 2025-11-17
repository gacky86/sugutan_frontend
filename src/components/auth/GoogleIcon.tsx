// DTAとの併用実装がうまくいかず、実装保留中（2025/11/16）

// import { useEffect } from "react";
// import GoogleIconImage from "@/assets/google_icon.png";
// import { useSearchParams } from "react-router-dom";
// import Cookies from "js-cookie";
import { FcGoogle } from "react-icons/fc";
type Props = {
  text: string;
};
export function GoogleIcon({ text }: Props) {
  // const [searchParams] = useSearchParams();
  // const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // googleの認証画面へ遷移して認証を行う
    window.location.href = `${
      import.meta.env.VITE_API_URL
    }/api/v1/auth/google_oauth2`;
  };

  // // useEffectでsearchParamsが変わった時に処理を始動させる
  // useEffect(() => {
  //   // 取得するparamsの中にaccess-tokenが含まれている場合に始動
  //   if (searchParams.has("access-token")) {
  //     // URLのパラメーターからトークン情報を取得
  //     const access_token = searchParams.get("access-token");
  //     const client = searchParams.get("client");
  //     const uid = searchParams.get("uid");

  //     // ローカルストレージにトークン情報を保管
  //     // 修正：Cookieにトークン情報を保管
  //     if (access_token != null && client != null && uid != null) {
  //       // localStorage.setItem("access-token", access_token);
  //       // localStorage.setItem("client", client);
  //       // localStorage.setItem("uid", uid);
  //       Cookies.set("_access_token", access_token);
  //       Cookies.set("_client", client);
  //       Cookies.set("_uid", uid);
  //     }

  //     // ログイン後のメインページへ遷移
  //     // navigate("/main");
  //   }
  // }, [searchParams]);

  return (
    <button
      onClick={handleGoogleLogin}
      className="border border-gray-400 duration-300 text-sm h-10 w-full rounded-full
      hover:border-gray-500 hover:shadow-lg hover:shadow-gray-400/30"
    >
      <div className="flex justify-center">
        <FcGoogle className="text-xl mx-2" />
        <p>{text} with Google</p>
      </div>
    </button>
  );
}
