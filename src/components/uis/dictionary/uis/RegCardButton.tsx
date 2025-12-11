import { FaBook } from "react-icons/fa";
// ここにバケツリレーされてきたresultの情報をcardとして登録する
// extranotesとして登録する
// 属するFCはdictionarySlice内のstate.regFlashcardTitleから、FCのidを特定する
// 特定の仕方としては、SelectFlashcardFormでflashcardsをfetchしているので、flashcardSlice内のflashcardsを使える？
// state.flashcardsの中から、指定したtitleを持つFlashcard objectを特定する関数？をflashcardSlice内に新たに定義する
// ここではその関数を使って、regFlashcardTitleから、FCのidを特定する

// 特定したflashcardIdと、resultの情報を使って、cardとextraNotesを作成する。

// functions
import { selectFlashcardByTitle } from "@/utils/selectors";

// redux
import type { RootState } from "@/stores";
import { useSelector } from "react-redux";
import { buildCardParamsDictionary } from "@/utils/buildCardParams";

// type
import type { DictionarySearchResult, RailsErrorResponse } from "@/types/index";
import { buildExtraNotesParamsDictionary } from "@/utils/buildExtraNoteParams";
import { createCard } from "@/api/card";
import { createExtraNote } from "@/api/extraNote";
import type { AxiosError } from "axios";

type Props = {
  result: DictionarySearchResult;
};

const RegCardButton = ({ result }: Props) => {
  // regFlashcardTitleの取得
  const regFlashcardTitle = useSelector(
    (state: RootState) => state.dictionary.regFlashcardTitle
  );
  // 登録先となるFlashcardを取得
  const regFlashcard = useSelector(selectFlashcardByTitle(regFlashcardTitle));

  const regCardToFlashcard = async () => {
    // 登録ボタン押下時に登録先単語帳が見つからない場合は何もしない（エラーメッセージとか必要）
    if (!regFlashcard) return;
    // resultからcardParamsの作成(front, backの値をどうにかしないといけない)
    const cardParams = buildCardParamsDictionary(result);

    // extraNoteParams(補足情報分だけリスト化してみるか)
    const extraNotesParamsList = buildExtraNotesParamsDictionary(result);

    console.log(result);

    try {
      const res = await createCard(regFlashcard.id, cardParams);
      if (res.status === 200) {
        // cardの作成が正常終了した場合、extra_noteの作成を行う
        for (const params of extraNotesParamsList) {
          await createExtraNote(res.data.id, params);
        }
        console.log("問題なく登録されました");
      } else {
        console.log("card create error");
      }
      // エラー処理
    } catch (err) {
      const error = err as AxiosError<RailsErrorResponse>;
      console.log(error);
    }
  };

  return (
    <FaBook
      className="hover:bg-amber-200 rounded-sm duration-300"
      onClick={() => regCardToFlashcard()}
    />
  );
};

export default RegCardButton;
