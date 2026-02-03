import { toast } from "react-toastify";

export const handleSpeak = (text: string, lang = "en-US") => {
  // ブラウザが対応しているか確認
  if (!("speechSynthesis" in window)) {
    alert("このブラウザは音声読み上げに対応していません。");
    toast.error("このブラウザは音声読み上げに対応していません。");
    return;
  }

  // 発話インスタンスの作成
  const utterance = new SpeechSynthesisUtterance(text);

  // 言語の設定（英語: en-US, 日本語: ja-JP など）
  utterance.lang = lang;

  // 読み上げの速さ（0.1 〜 10 / 1が標準）
  utterance.rate = 1.0;

  // 再生実行
  window.speechSynthesis.speak(utterance);
};
