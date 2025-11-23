type Props = {
  title: string;
  discription: string;
  totalCards: number;
  learnedAt: number;
  language: string;
};

const FlashcardsCard = ({
  title,
  discription,
  totalCards,
  learnedAt,
  language,
}: Props) => {
  return (
    <div className="rounded-lg border border-gray-300 shadow-md w-[300px] h-[110px] bg-white p-1">
      {/* タイトル */}
      <h1 className="text-xl">{title}</h1>
      {/* カード単語帳詳細 */}
      <div className="text-sm text-gray-500">
        <p>{discription}</p>
        <div className="grid grid-cols-2 grid-rows-2 gap-0 ml-1 mt-1">
          <div>
            <p>登録枚数:{totalCards}枚</p>
          </div>
          <div>
            <p>最終学習日:{learnedAt}日前</p>
          </div>
          <div>
            <p>Language:{language}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardsCard;
