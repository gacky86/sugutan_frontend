import { openModal } from "@/stores/modalSlice";
import type { Card, Flashcard } from "@/types";
import { useDispatch } from "react-redux";
import { MdModeEdit } from "react-icons/md";
import { limitString } from "@/utils/limitString";

type Props = {
  flashcard: Flashcard;
  card: Card;
};
const CardRow = ({ flashcard, card }: Props) => {
  const dispatch = useDispatch();
  return (
    <tr data-testid={`card-${card.id}`}>
      <td>{card.cardType}</td>
      <td>{limitString(card.front, 15)}</td>
      <td>{limitString(card.back, 15)}</td>
      <td
        onClick={() =>
          dispatch(
            openModal({
              modalContent: "editCard",
              modalProps: {
                flashcard: flashcard, // Flashcard オブジェクト
                card: card, // Card オブジェクト
              },
            })
          )
        }
      >
        <MdModeEdit className="text-lg border border-gray-600 rounded-sm cursor-pointer" />
      </td>
    </tr>
  );
};

export default CardRow;
