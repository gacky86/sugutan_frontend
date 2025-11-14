import applyCaseMiddleware from "axios-case-converter";
import axios from "axios";
// import Cookies from "js-cookie";
// applyCaseMiddleware:
// axiosで受け取ったレスポンスの値をスネークケース→キャメルケースに変換
// または送信するリクエストの値をキャメルケース→スネークケースに変換してくれるライブラリ

// ヘッダーに関してはケバブケースのままで良いので適用を無視するオプションを追加
const options = {
  ignoreHeaders: true,
};

const client = applyCaseMiddleware(
  axios.create({
    baseURL: "http://localhost:3000/api/v1",
    withCredentials: true,
  }),
  options
);
// // インターセプター(リクエストを送る直前に処理を割り込み)
// client.interceptors.request.use(
//   (config) => {
//     const authHeader = getUserAuthHeader();
//     if (authHeader) {
//       config.headers["access-token"] = authHeader["access-token"];
//       config.headers["client"] = authHeader["client"];
//       config.headers["uid"] = authHeader["uid"];
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // インターセプター(レスポンスを受け取った時に処理を割り込み)
// client.interceptors.response.use(
//   (response) => {
//     const newAccessToken = response.headers["access-token"];
//     const newClient = response.headers["client"];
//     const newUid = response.headers["uid"];

//     if (newAccessToken) {
//       Cookies.set("_access_token", newAccessToken);
//       Cookies.set("_client", newClient);
//       Cookies.set("_uid", newUid);

//       // axios に再設定（任意）
//       axios.defaults.headers.common["access-token"] = newAccessToken;
//       axios.defaults.headers.common["client"] = newClient;
//       axios.defaults.headers.common["uid"] = newUid;
//     }

//     // 成功時はそのまま返す
//     return response;
//   },
//   (error) => {
//     const status = error.response?.status;

//     if (status === 401 || status === 403) {
//       window.location.href = "/unauthorized";
//     } else if (status === 404) {
//       window.location.href = "/not-found";
//     } else if (status >= 500) {
//       window.location.href = "/server-error";
//     }

//     return Promise.reject(error);
//   }
// );

// 認証情報をheaderに追加するためのヘルパー関数
// const getUserAuthHeader = () => {
//   console.log("getUserAuthHeader");

//   if (
//     !Cookies.get("_access_token") ||
//     !Cookies.get("_client") ||
//     !Cookies.get("_uid")
//   )
//     return;
//   console.log("tokenは見つかりました");

//   return {
//     "access-token": Cookies.get("_access_token"),
//     client: Cookies.get("_client"),
//     uid: Cookies.get("_uid"),
//   };
// };

export default client;
