import { openModal } from "@/stores/modalSlice";
import type { Card, Flashcard } from "@/types";
import { useDispatch } from "react-redux";
import { MdModeEdit } from "react-icons/md";

type Props = {
  flashcard: Flashcard;
  card: Card;
};
const CardRow = ({ flashcard, card }: Props) => {
  const dispatch = useDispatch();
  return (
    <tr data-testid={`card-${card.id}`}>
      <td className="flex">{card.front}</td>
      <td>{card.back}</td>
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
        <MdModeEdit className="text-lg" />
      </td>
    </tr>
  );
};

export default CardRow;
