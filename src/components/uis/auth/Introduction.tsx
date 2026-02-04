// images
import Logo from "@/assets/sugutan_logo.svg?react";
import createFlashcardImg from "@/assets/appIntro/Screenshot_20260204-103957.png";
// import flashcardListImg from "@/assets/appIntro/Screenshot_20260204-104032.png";
import dictionaryImg from "@/assets/appIntro/Screenshot_20260204-104801.png";
import learningImg from "@/assets/appIntro/Screenshot_20260204-105059.png";

import IntroHeader from "@/components/uis/auth/uis/IntroHeader";
import IntroSentence from "@/components/uis/auth/uis/IntroSentence";

const Introduction = () => {
  return (
    <div className=" bg-[#CCF5FF] shadow-2xl">
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
          <IntroSentence text="まずは自分の単語帳を作成" delay={0.6} />
          <IntroSentence
            text="用途に応じて単語帳を管理できます！"
            delay={0.6}
            imgSrc={createFlashcardImg}
            imgAlt="自分の単語帳を作成"
          />
          <IntroSentence text="知りたい表現や単語をAI辞書で検索" delay={0.8} />
          <IntroSentence
            text="検索結果はその場で単語帳に登録できます！"
            delay={0.8}
            imgSrc={dictionaryImg}
            imgAlt="AI辞書検索の画面"
          />
          <IntroSentence text="単語帳に登録したカードを復習" delay={1} />
          <IntroSentence
            text="忘却曲線に基づいてカードを自動出題します！"
            delay={1}
            imgSrc={learningImg}
            imgAlt="単語帳学習時の画面"
          />
        </div>
      </div>
    </div>
  );
};

export default Introduction;
