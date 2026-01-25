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

export default client;
