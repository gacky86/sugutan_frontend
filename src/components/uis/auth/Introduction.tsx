// images
import Logo from "@/assets/sugutan_logo.svg?react";

import createFlashcardImg from "@/assets/appIntroImages/Screenshot_20260205-153442.png";
import flashcardsListImg from "@/assets/appIntroImages/Screenshot_20260205-153458.png";
import dictionaryImg from "@/assets/appIntroImages/Screenshot_20260205-153527.png";
import dictionaryResultImg from "@/assets/appIntroImages/Screenshot_20260205-153540.png";
import startLearningImg from "@/assets/appIntroImages/Screenshot_20260205-153618.png";
import learningImg from "@/assets/appIntroImages/Screenshot_20260205-153634.png";

import IntroHeader from "@/components/uis/auth/uis/IntroHeader";
import IntroSentence from "@/components/uis/auth/uis/IntroSentence";
import HowToUse from "./uis/HowToUse";

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
        {/* アプリの使い方 */}
        <div className="mb-4">
          <IntroHeader text="How to use?" delay={0.4} />
          <HowToUse
            header="1. 単語帳の作成"
            content="タイトルと単語帳の説明を入力して単語帳を作成します。用途に合わせて単語帳を管理できます。"
            delay={0.6}
            firstImgSrc={createFlashcardImg}
            secondImgSrc={flashcardsListImg}
          />
          <HowToUse
            header="2. AI辞書で検索&カード登録"
            content="知りたい表現をAI辞書で検索します。日本語と英語の両方で検索が可能です。検索結果が表示されたら、単語カード登録ボタンをタップして単語帳へ登録します。"
            delay={0.8}
            firstImgSrc={dictionaryImg}
            secondImgSrc={dictionaryResultImg}
          />
          <HowToUse
            header="3. 登録したカードを復習"
            content="単語帳一覧から単語帳をタップするとInputモードまたはOutputモードで単語の復習ができます。Inputモードは英→日、Outputモードは日→英の形式で出題します。回答時に選択する難易度によって、次回の出題頻度が変化します。"
            delay={1}
            firstImgSrc={startLearningImg}
            secondImgSrc={learningImg}
          />
        </div>
      </div>
    </div>
  );
};

export default Introduction;
