// images
import Logo from "@/assets/sugutan_logo.svg?react";

const Introduction = () => {
  return (
    <div className="border border-black h-full ">
      <Logo className="w-[150px] h-[150px] border border-black m-auto" />
      <div className="p-3">
        {/* アプリの概要の説明 */}
        <div>
          <h3 className="text-2xl">スグ単とは？</h3>
          <p>
            わからない単語・表現を「スグ」調べて「スグ」単語帳に登録できる、自分でつくる単語帳です。
          </p>
        </div>
        {/* 検索機能の紹介 */}
        <div>
          <h3 className="text-2xl">AI辞書機能</h3>
          <p>
            「英語で何て言えばいいんだろう？」をAI辞書を使って調べることができます！
          </p>
          <p>また、英語から日本語の意味を調べることもできます。</p>
        </div>
        {/* 検索から登録へ */}
        <div>
          <h3 className="text-2xl">単語帳登録機能</h3>
          <p>調べた単語・表現は、そのまま単語帳に登録できます！</p>
        </div>
        {/* 単語帳学習機能 */}
        <div>
          <h3 className="text-2xl">単語帳学習機能</h3>
          <p>登録した単語・表現は後から繰り返し復習できます！</p>
          <p>復習のタイミングは忘却曲線に基づいて自動で調整されます。</p>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
