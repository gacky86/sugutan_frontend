import type { Card, Flashcard } from "@/types";

import CardRow from "@/components/cards/CardRow";
import { getLanguageName } from "@/utils/langNameMapper";

type Props = {
  flashcard: Flashcard;
  cards: Card[];
};

const CardsTable = ({ flashcard, cards }: Props) => {
  return (
    <div className="m-5">
      <table className="w-full text-base border-separate border-spacing-2">
        <thead className="text-left text-gray-500 ">
          <tr>
            <th className="sticky top-0 bg-[#F7F7F7] w-4/9 font-normal">
              Japanese
            </th>
            <th className="sticky top-0 bg-[#F7F7F7] w-4/9 font-normal">
              {getLanguageName(flashcard.language)}
            </th>
            <th className="sticky top-0 bg-white w-1/9"></th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card, key) => {
            return <CardRow card={card} flashcard={flashcard} key={key} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CardsTable;
