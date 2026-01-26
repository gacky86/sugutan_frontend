import applyCaseMiddleware from "axios-case-converter";
import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL;

// ヘッダーに関してはケバブケースのままで良いので適用を無視するオプションを追加
const options = {
  ignoreHeaders: true,
};

const client = applyCaseMiddleware(
  axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  }),
  options,
);

// インターセプター(レスポンスを受け取った時に処理を割り込み)
client.interceptors.response.use(
  (response) => {
    // 成功時はそのまま返す
    return response;
  },
  (error) => {
    const status = error.response?.status;

    if (status === 404) {
      window.location.href = "/not-found";
    } else if (status >= 500) {
      window.location.href = "/server-error";
    }

    return Promise.reject(error);
  },
);

export default client;
