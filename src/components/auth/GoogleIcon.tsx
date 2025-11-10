// import { useEffect } from "react";
import styled from "styled-components";
// import GoogleIconImage from "@/assets/google_icon.png";
// import { useSearchParams } from "react-router-dom";
// import Cookies from "js-cookie";

const Button = styled.button`
  background-color: white;
  border-radius: 20px;
  width: 300px;
  height: 40px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #e1e3e1;
  }
`;

export function GoogleIcon() {
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

  return <Button onClick={handleGoogleLogin}>Google で登録</Button>;
}
