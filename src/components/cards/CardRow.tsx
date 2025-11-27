import { openModal } from "@/stores/modalSlice";
import type { Card, Flashcard } from "@/types";
import { useDispatch } from "react-redux";
import { MdModeEdit } from "react-icons/md";

type Props = {
  flashcard: Flashcard;
  card: Card;
  key: number;
};
const CardRow = ({ flashcard, card, key }: Props) => {
  const dispatch = useDispatch();
  return (
    <tr
      key={key}
      onClick={() =>
        dispatch(
          openModal({
            modalType: "cardEdit",
            modalProps: { flashcard: flashcard, card: card },
          })
        )
      }
      data-testid={`card-${card.id}`}
    >
      <td className="flex">{card.front}</td>
      <td>{card.back}</td>
      <td>
        <MdModeEdit className="text-lg" />
      </td>
    </tr>
  );
};

export default CardRow;
