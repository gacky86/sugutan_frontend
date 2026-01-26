// images
import Logo from "@/assets/sugutan_logo.svg?react";
import IntroHeader from "@/components/uis/auth/uis/IntroHeader";
import IntroSentence from "@/components/uis/auth/uis/IntroSentence";

const Introduction = () => {
  return (
    <div className=" h-full bg-[#CCF5FF] shadow-2xl">
      <Logo className="w-[150px] h-[150px] mx-auto mb-10" />
      <div className="p-3">
        {/* アプリの概要の説明 */}
        <div className="mb-4">
          <IntroHeader text="What is スグ単?" delay={0} />
          <IntroSentence
            text="わからない単語・表現を「スグ」調べて「スグ」単語帳に登録できる、自分でつくる単語帳です"
            delay={0.2}
          />
        </div>
        {/* 検索機能の紹介 */}
        <div className="mb-4">
          <IntroHeader text="How to use?" delay={0.4} />
          <IntroSentence text="自分の単語帳を作成" delay={0.6} />
          <IntroSentence text="知りたい表現や単語を検索" delay={0.8} />
          <IntroSentence text="単語帳で復習" delay={1} />
        </div>
      </div>
    </div>
  );
};

export default Introduction;
